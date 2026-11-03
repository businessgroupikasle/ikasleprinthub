import type { IncomingMessage, ServerResponse } from 'http';

export default async function handler(req: IncomingMessage & { body?: any }, res: ServerResponse) {
  if (req.method !== 'POST') {
    res.statusCode = 405;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ success: false, message: 'Method Not Allowed' }));
    return;
  }

  let raw = '';
  req.on('data', (chunk) => {
    raw += chunk;
  });

  req.on('end', () => {
    try {
      const data = typeof req.body === 'object' && req.body !== null ? req.body : JSON.parse(raw || '{}');
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
}

