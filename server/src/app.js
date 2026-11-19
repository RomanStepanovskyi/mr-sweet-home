import express from 'express';
import cors from 'cors';
import { existsSync } from 'node:fs';
import { validateQuote } from './validate.js';

export function createApp({ store, clientDist } = {}) {
  const app = express();

  app.use(cors());
  app.use(express.json({ limit: '20kb' }));

  app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok' });
  });

  app.post('/api/quotes', async (req, res, next) => {
    // Honeypot: real users never fill the hidden "website" field.
    if (req.body?.website) {
      return res.status(201).json({ ok: true });
    }

    const { value, errors } = validateQuote(req.body);
    if (errors) {
      return res.status(400).json({ ok: false, errors });
    }

    try {
      const saved = await store.add(value);
      res.status(201).json({ ok: true, id: saved.id });
    } catch (err) {
      next(err);
    }
  });

  // In production the API also serves the built React app.
  if (clientDist && existsSync(clientDist)) {
    app.use(express.static(clientDist));
    app.get(/^(?!\/api\/).*/, (_req, res) => res.sendFile('index.html', { root: clientDist }));
  }

  app.use('/api', (_req, res) => res.status(404).json({ ok: false, error: 'Not found' }));

  // eslint-disable-next-line no-unused-vars
  app.use((err, _req, res, _next) => {
    if (err.type === 'entity.parse.failed') {
      return res.status(400).json({ ok: false, error: 'Invalid JSON' });
    }
    console.error(err);
    res.status(500).json({ ok: false, error: 'Something went wrong. Please try again.' });
  });

  return app;
}
