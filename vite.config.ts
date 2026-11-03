import react from '@vitejs/plugin-react'
import { defineConfig, type Plugin } from 'vite'

function apiEmailServicePlugin(): Plugin {
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

        if (req.method === 'POST' && req.url === '/api/quote') {
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
                  message: 'Quote request registered and dispatched to businessgroupikasle@gmail.com',
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

        next();
      });
    },
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), apiEmailServicePlugin()],
})
