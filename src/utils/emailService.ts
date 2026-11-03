/**
 * Email Service Dispatcher for Ikasle PrintHub
 * Handles observable form submission to the configured email service endpoint.
 *
 * Supports:
 * - VITE_EMAIL_SERVICE_URL / VITE_CONTACT_API_URL / VITE_QUOTE_API_URL environment variables
 * - First-class /api/contact and /api/quote endpoints (handled via Vite middleware & Vercel serverless)
 * - Contact inquiries fall back to the public formsubmit.co forwarder; quote requests (with artwork) use /api/quote only
 */

export const DEFAULT_BUSINESS_EMAIL = 'businessgroupikasle@gmail.com';

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export interface QuoteFormData {
  quoteReference: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  selectedService: string;
  quantity: number;
  material: string;
  finish: string;
  turnaround: string;
  artwork?: File | null;
}

export interface SubmissionResponse {
  success: boolean;
  message: string;
  /** Quote requests only: true when the artwork file was attached to the email we received. */
  artworkAttached?: boolean;
}

// Largest file we attach to the quote email. Vercel limits request bodies to 4.5 MB and base64 adds ~33%.
// Keep this in sync with MAX_ATTACHMENT_BYTES in api/quote.ts. Larger files are still accepted by the
// form, but are not attached - the customer is asked to send them via WhatsApp instead.
export const MAX_EMAIL_ATTACHMENT_BYTES = 3 * 1024 * 1024;

const readFileAsBase64 = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = String(reader.result);
      resolve(result.slice(result.indexOf(',') + 1)); // drop the "data:<mime>;base64," prefix
    };
    reader.onerror = () => reject(reader.error ?? new Error('Could not read the artwork file.'));
    reader.readAsDataURL(file);
  });

const getEndpoint = (type: 'contact' | 'quote'): string => {
  if (type === 'contact') {
    return (
      import.meta.env.VITE_CONTACT_API_URL ||
      import.meta.env.VITE_EMAIL_SERVICE_URL ||
      '/api/contact'
    );
  }
  return (
    import.meta.env.VITE_QUOTE_API_URL ||
    import.meta.env.VITE_EMAIL_SERVICE_URL ||
    '/api/quote'
  );
};

/**
 * Submits contact inquiry to the configured email service endpoint.
 * Generates an observable HTTP network request and awaits confirmation.
 */
export async function sendContactInquiry(payload: ContactFormData): Promise<SubmissionResponse> {
  const primaryEndpoint = getEndpoint('contact');
  const body = JSON.stringify({
    ...payload,
    _subject: `New Print Inquiry from ${payload.name} (${payload.email})`,
    _replyto: payload.email,
    recipient: DEFAULT_BUSINESS_EMAIL,
    timestamp: new Date().toISOString(),
    source: 'Ikasle PrintHub - Contact Modal',
  });

  try {
    const res = await fetch(primaryEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body,
    });

    if (res.ok) {
      const data = await res.json().catch(() => ({}));
      return {
        success: true,
        message: data.message || 'Inquiry successfully dispatched.',
      };
    }

    // If primary endpoint returned non-200 (e.g. 404 on static hosting without serverless)
    // fallback to public form email forwarder
    if (primaryEndpoint.startsWith('/api/')) {
      const fallbackUrl = `https://formsubmit.co/ajax/${DEFAULT_BUSINESS_EMAIL}`;
      const fallbackRes = await fetch(fallbackUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body,
      });

      if (fallbackRes.ok) {
        return {
          success: true,
          message: 'Inquiry successfully dispatched to print specialist.',
        };
      }
    }

    return {
      success: false,
      message: 'Failed to send inquiry. Please try again or message us directly on WhatsApp.',
    };
  } catch (err) {
    // If primary fetch threw network error and was local endpoint, try public fallback
    if (primaryEndpoint.startsWith('/api/')) {
      try {
        const fallbackUrl = `https://formsubmit.co/ajax/${DEFAULT_BUSINESS_EMAIL}`;
        const fallbackRes = await fetch(fallbackUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body,
        });
        if (fallbackRes.ok) {
          return {
            success: true,
            message: 'Inquiry successfully dispatched to print specialist.',
          };
        }
      } catch {
        // Fallback also failed
      }
    }

    return {
      success: false,
      message: err instanceof Error ? err.message : 'Network error. Please check your connection and retry.',
    };
  }
}

/**
 * Emails a custom quote request (with the customer's artwork attached when it is small enough)
 * through the site's own /api/quote endpoint, which sends it to the business inbox over SMTP.
 */
export async function sendQuoteRequest(payload: QuoteFormData): Promise<SubmissionResponse> {
  const { artwork, ...fields } = payload;

  let artworkPayload: { filename: string; contentBase64: string } | undefined;
  if (artwork && artwork.size <= MAX_EMAIL_ATTACHMENT_BYTES) {
    try {
      artworkPayload = { filename: artwork.name, contentBase64: await readFileAsBase64(artwork) };
    } catch {
      return { success: false, message: 'We could not read your artwork file. Please re-select it and try again.' };
    }
  }

  try {
    const res = await fetch(getEndpoint('quote'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        ...fields,
        artworkFile: artwork ? artwork.name : null,
        artworkFileSize: artwork ? artwork.size : null,
        artwork: artworkPayload,
      }),
    });

    const data = await res.json().catch(() => ({}));

    if (res.ok && data.success !== false) {
      return {
        success: true,
        message: data.message || 'Quote request sent to our print team.',
        artworkAttached: Boolean(data.artworkAttached),
      };
    }

    // Validation / size problems carry a message meant for the customer; server faults get a generic one.
    if (res.status >= 400 && res.status < 500 && typeof data.message === 'string') {
      return { success: false, message: data.message };
    }
    // Only while developing locally: tell the site owner what to fix (visitors never see this).
    if (import.meta.env.DEV && res.status === 503) {
      return {
        success: false,
        message: 'DEV: email is not set up. Put your Gmail App Password in SMTP_PASS inside .env.local, then restart `npm run dev`.',
      };
    }
    if (import.meta.env.DEV && res.status === 502) {
      return {
        success: false,
        message: 'DEV: Gmail rejected the login. Check SMTP_USER / SMTP_PASS in .env.local (it must be an App Password). Details are in the `npm run dev` terminal.',
      };
    }
    return {
      success: false,
      message: 'We could not send your request right now. Please try again, or message us on WhatsApp at +91 78451 32962.',
    };
  } catch {
    return {
      success: false,
      message: 'Network error. Please check your connection and try again.',
    };
  }
}
