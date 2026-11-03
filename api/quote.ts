import type { IncomingMessage, ServerResponse } from 'http';
import nodemailer from 'nodemailer';

/**
 * POST /api/quote
 *
 * Receives a quote request (optionally with the customer's artwork as base64) and emails it to the
 * business inbox over SMTP. Used by both the Vercel serverless function and the Vite dev server.
 *
 * Required environment variables (never prefix these with VITE_ - that would expose them to browsers):
 *   SMTP_USER  Gmail address that sends the mail, e.g. businessgroupikasle@gmail.com
 *   SMTP_PASS  A Gmail "App Password" (Google Account > Security > 2-Step Verification > App passwords)
 * Optional:
 *   MAIL_TO    Where quotes are delivered (default: businessgroupikasle@gmail.com)
 *   SMTP_HOST / SMTP_PORT  For a provider other than Gmail (default: smtp.gmail.com / 465)
 */

const DEFAULT_RECIPIENT = 'businessgroupikasle@gmail.com';

// Vercel rejects request bodies over 4.5 MB, and base64 inflates a file by ~33%.
// Keep this in sync with MAX_EMAIL_ATTACHMENT_BYTES in src/utils/emailService.ts.
const MAX_ATTACHMENT_BYTES = 3 * 1024 * 1024;
const MAX_BODY_BYTES = 5 * 1024 * 1024;

const ALLOWED_EXTENSIONS: Record<string, string> = {
  pdf: 'application/pdf',
  ai: 'application/postscript',
  psd: 'image/vnd.adobe.photoshop',
  png: 'image/png',
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
};

class HttpError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

const sendJson = (res: ServerResponse, status: number, body: Record<string, unknown>) => {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(body));
};

// Strips control characters (blocks header/line injection) and caps the length.
// oxlint-disable-next-line no-control-regex
const CONTROL_CHARS = /[\u0000-\u001f\u007f]+/g;
const clean = (value: unknown, max = 200): string =>
  typeof value === 'string' ? value.replace(CONTROL_CHARS, ' ').trim().slice(0, max) : '';

const escapeHtml = (value: string): string =>
  value.replace(/[&<>"']/g, (ch) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[ch] as string);

const formatSize = (bytes: number): string =>
  bytes < 1024 * 1024 ? `${Math.max(1, Math.round(bytes / 1024))} KB` : `${(bytes / (1024 * 1024)).toFixed(1)} MB`;

async function readJsonBody(req: IncomingMessage & { body?: unknown }): Promise<Record<string, unknown>> {
  // Vercel pre-parses JSON bodies into req.body; the Vite dev server leaves the raw stream.
  let parsed: unknown = req.body;
  if (parsed === undefined || parsed === null) {
    const chunks: Buffer[] = [];
    let size = 0;
    for await (const chunk of req) {
      const buf = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk);
      size += buf.length;
      if (size > MAX_BODY_BYTES) throw new HttpError(413, 'Request is too large.');
      chunks.push(buf);
    }
    parsed = Buffer.concat(chunks).toString('utf8') || '{}';
  }
  if (Buffer.isBuffer(parsed)) parsed = parsed.toString('utf8');
  if (typeof parsed === 'string') {
    try {
      parsed = JSON.parse(parsed);
    } catch {
      throw new HttpError(400, 'Invalid request.');
    }
  }
  if (typeof parsed !== 'object' || parsed === null || Array.isArray(parsed)) throw new HttpError(400, 'Invalid request.');
  return parsed as Record<string, unknown>;
}

interface Attachment {
  filename: string;
  content: Buffer;
  contentType: string;
}

function readAttachment(raw: unknown): Attachment | null {
  if (raw === undefined || raw === null) return null;
  if (typeof raw !== 'object') throw new HttpError(400, 'Invalid artwork file.');
  const { filename, contentBase64 } = raw as Record<string, unknown>;
  if (typeof filename !== 'string' || typeof contentBase64 !== 'string' || !contentBase64) {
    throw new HttpError(400, 'Invalid artwork file.');
  }

  const safeName = clean(filename.split(/[\\/]/).pop() ?? '', 120) || 'artwork';
  const dot = safeName.lastIndexOf('.');
  const extension = dot > 0 ? safeName.slice(dot + 1).toLowerCase() : '';
  if (!(extension in ALLOWED_EXTENSIONS)) {
    throw new HttpError(400, 'Unsupported artwork format. Please upload a PDF, AI, PSD, PNG or JPG file.');
  }

  const content = Buffer.from(contentBase64, 'base64');
  if (content.length === 0) throw new HttpError(400, 'The artwork file is empty.');
  if (content.length > MAX_ATTACHMENT_BYTES) throw new HttpError(413, 'The artwork file is too large to email.');

  return { filename: safeName, content, contentType: ALLOWED_EXTENSIONS[extension] };
}

type Env = Record<string, string | undefined>;

function createTransport(env: Env) {
  const user = clean(env.SMTP_USER, 200);
  const pass = (env.SMTP_PASS ?? '').replace(/\s+/g, ''); // Google shows app passwords in 4 groups
  if (!user || !pass) {
    throw new HttpError(503, 'Email service is not configured.');
  }
  const port = Number(env.SMTP_PORT) || 465;
  return {
    user,
    transporter: nodemailer.createTransport({
      host: env.SMTP_HOST || 'smtp.gmail.com',
      port,
      secure: port === 465,
      auth: { user, pass },
      connectionTimeout: 10_000,
      greetingTimeout: 10_000,
      socketTimeout: 25_000,
    }),
  };
}

// `env` is only passed by the Vite dev server (values from .env.local); on Vercel it defaults to process.env.
export default async function handler(
  req: IncomingMessage & { body?: unknown },
  res: ServerResponse,
  env: Env = process.env,
) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    sendJson(res, 405, { success: false, message: 'Method Not Allowed' });
    return;
  }

  try {
    const body = await readJsonBody(req);

    const quoteReference = clean(body.quoteReference, 30);
    const customerName = clean(body.customerName, 100);
    const customerEmail = clean(body.customerEmail, 150);
    const customerPhone = clean(body.customerPhone, 30);
    const selectedService = clean(body.selectedService, 100);
    const material = clean(body.material, 100);
    const finish = clean(body.finish, 100);
    const turnaround = clean(body.turnaround, 100);
    const quantity = Number(body.quantity);

    if (!customerName || !customerPhone || !selectedService || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customerEmail)) {
      throw new HttpError(400, 'Please check your name, email and phone number.');
    }

    const attachment = readAttachment(body.artwork);
    const artworkName = attachment?.filename ?? clean(body.artworkFile, 120);
    const artworkSize = attachment ? attachment.content.length : Number(body.artworkFileSize) || 0;

    const rows: Array<[string, string]> = [
      ['Reference', quoteReference || '-'],
      ['Category', selectedService],
      ['Quantity', Number.isFinite(quantity) ? `${quantity.toLocaleString('en-IN')} units` : '-'],
      ['Paper / Material', material || '-'],
      ['Finish', finish || '-'],
      ['Turnaround', turnaround || '-'],
      ['Customer name', customerName],
      ['Customer email', customerEmail],
      ['Customer phone', customerPhone],
      [
        'Artwork',
        attachment
          ? `${artworkName} (${formatSize(artworkSize)}) - attached to this email`
          : artworkName
            ? `${artworkName} (${formatSize(artworkSize)}) - NOT attached (too large). Customer was asked to send it via WhatsApp.`
            : 'No file uploaded',
      ],
    ];

    const text = `New print quote request\n\n${rows.map(([k, v]) => `${k}: ${v}`).join('\n')}\n\nReply to this email to reach the customer directly.`;
    const html = `
      <div style="font-family:Arial,Helvetica,sans-serif;color:#05264D;max-width:560px">
        <h2 style="margin:0 0 12px">New print quote request</h2>
        <table style="border-collapse:collapse;width:100%;font-size:14px">
          ${rows
            .map(
              ([k, v]) =>
                `<tr><td style="padding:6px 10px;border:1px solid #E2E8F0;background:#F5F8FC;font-weight:700;white-space:nowrap">${escapeHtml(k)}</td><td style="padding:6px 10px;border:1px solid #E2E8F0">${escapeHtml(v)}</td></tr>`,
            )
            .join('')}
        </table>
        <p style="font-size:13px;color:#64748B">Reply to this email to reach the customer directly.</p>
      </div>`;

    const { user, transporter } = createTransport(env);
    try {
      await transporter.sendMail({
        from: { name: 'Ikasle PrintHub Quotes', address: user },
        to: clean(env.MAIL_TO, 200) || DEFAULT_RECIPIENT,
        replyTo: { name: customerName, address: customerEmail },
        subject: `Quote Request [${quoteReference || 'NEW'}] - ${selectedService} (${customerName})`,
        text,
        html,
        attachments: attachment ? [attachment] : [],
      });
    } catch (err) {
      const code = (err as { code?: string }).code;
      console.error(
        code === 'EAUTH'
          ? '[api/quote] SMTP login rejected - check SMTP_USER and that SMTP_PASS is a Gmail App Password.'
          : '[api/quote] Failed to send email:',
        err,
      );
      throw new HttpError(502, 'We could not send your request right now.');
    }

    sendJson(res, 200, {
      success: true,
      message: 'Quote request sent to our print team.',
      artworkAttached: Boolean(attachment),
    });
  } catch (err) {
    if (err instanceof HttpError) {
      if (err.status === 503) console.error('[api/quote] SMTP_USER / SMTP_PASS are not set - no email was sent.');
      sendJson(res, err.status, { success: false, message: err.message });
      return;
    }
    console.error('[api/quote] Unexpected error:', err);
    sendJson(res, 500, { success: false, message: 'Something went wrong. Please try again.' });
  }
}
