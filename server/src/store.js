import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname } from 'node:path';
import { randomUUID } from 'node:crypto';

/**
 * Tiny JSON-file store for quote requests.
 * Good enough for a demo; swap for a real database in production.
 */
export function createQuoteStore(filePath) {
  let queue = Promise.resolve();

  async function readAll() {
    try {
      return JSON.parse(await readFile(filePath, 'utf8'));
    } catch (err) {
      if (err.code === 'ENOENT') return [];
      throw err;
    }
  }

  async function add(quote) {
    // Serialize writes so concurrent requests don't overwrite each other.
    const run = queue.then(async () => {
      const all = await readAll();
      const record = { id: randomUUID(), createdAt: new Date().toISOString(), ...quote };
      all.push(record);
      await mkdir(dirname(filePath), { recursive: true });
      await writeFile(filePath, JSON.stringify(all, null, 2));
      return record;
    });
    queue = run.catch(() => {});
    return run;
  }

  return { add, readAll };
}
