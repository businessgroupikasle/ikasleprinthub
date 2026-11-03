import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv, type Plugin } from 'vite'
import quoteHandler from './api/quote.ts'

function apiEmailServicePlugin(fileEnv: Record<string, string>): Plugin {
  return {
    name: 'api-email-service-plugin',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.method === 'POST' && req.url === '/api/contact') {
          let body = '';
          req.on('data', (chunk) => {
            body += chunk;
          });
          req.on('end', () => {
            try {
              const data = JSON.parse(body || '{}');
              res.statusCode = 200;
              res.setHeader('Content-Type', 'application/json');
              res.end(
                JSON.stringify({
                  success: true,
                  message: 'Inquiry received and dispatched to businessgroupikasle@gmail.com',
                  timestamp: new Date().toISOString(),
                  data,
                })
              );
            } catch {
              res.statusCode = 400;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ success: false, message: 'Invalid payload' }));
            }
          });
          return;
        }

        // Same handler the Vercel serverless function uses - sends a real email over SMTP.
        if (req.url === '/api/quote') {
          // Real environment variables win over .env.local, like on Vercel.
          void quoteHandler(req, res, { ...fileEnv, ...process.env });
          return;
        }

        next();
      });
    },
  };
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // SMTP_USER / SMTP_PASS / MAIL_TO from .env.local, for the dev-server /api/quote handler only.
  // Only SMTP_* and MAIL_* are read, and none carry the VITE_ prefix, so they never reach the browser.
  const fileEnv = loadEnv(mode, process.cwd(), ['SMTP_', 'MAIL_']);
  return {
    plugins: [react(), apiEmailServicePlugin(fileEnv)],
  };
})
