import { fileURLToPath } from 'node:url';
import { createApp } from './app.js';
import { createQuoteStore } from './store.js';

const root = (p) => fileURLToPath(new URL(p, import.meta.url));

const PORT = process.env.PORT || 3001;
const store = createQuoteStore(process.env.QUOTES_FILE || root('../data/quotes.json'));
const app = createApp({ store, clientDist: root('../../client/dist') });

app.listen(PORT, () => {
  console.log(`Mr. Sweet Home API running on http://localhost:${PORT}`);
});
