import { test, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import request from 'supertest';
import { createApp } from '../src/app.js';
import { createQuoteStore } from '../src/store.js';

let app;
let store;

beforeEach(async () => {
  const dir = await mkdtemp(join(tmpdir(), 'quotes-'));
  store = createQuoteStore(join(dir, 'quotes.json'));
  app = createApp({ store });
});

const valid = {
  name: 'Jane Doe',
  email: 'Jane@Example.com',
  phone: '(704) 555-0134',
  service: 'kitchen-remodel',
  message: 'Looking to update cabinets and backsplash.',
};

test('GET /api/health returns ok', async () => {
  const res = await request(app).get('/api/health');
  assert.equal(res.status, 200);
  assert.deepEqual(res.body, { status: 'ok' });
});

test('POST /api/quotes saves a valid request', async () => {
  const res = await request(app).post('/api/quotes').send(valid);
  assert.equal(res.status, 201);
  assert.equal(res.body.ok, true);

  const all = await store.readAll();
  assert.equal(all.length, 1);
  assert.equal(all[0].email, 'jane@example.com');
  assert.ok(all[0].createdAt);
});

test('POST /api/quotes rejects invalid fields with messages', async () => {
  const res = await request(app)
    .post('/api/quotes')
    .send({ name: 'J', email: 'nope', service: 'roofing', message: 'hi' });
  assert.equal(res.status, 400);
  assert.deepEqual(Object.keys(res.body.errors).sort(), ['email', 'message', 'name', 'service']);
  assert.equal((await store.readAll()).length, 0);
});

test('POST /api/quotes silently drops honeypot spam', async () => {
  const res = await request(app).post('/api/quotes').send({ ...valid, website: 'spam.biz' });
  assert.equal(res.status, 201);
  assert.equal((await store.readAll()).length, 0);
});

test('POST /api/quotes handles malformed JSON', async () => {
  const res = await request(app)
    .post('/api/quotes')
    .set('Content-Type', 'application/json')
    .send('{"name":');
  assert.equal(res.status, 400);
});

test('concurrent requests are all saved', async () => {
  await Promise.all(Array.from({ length: 5 }, () => request(app).post('/api/quotes').send(valid)));
  assert.equal((await store.readAll()).length, 5);
});
