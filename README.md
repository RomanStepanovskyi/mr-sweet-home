# Mr. Sweet Home — Remodeling Website

A full-stack website for **Mr. Sweet Home LLC**, a residential remodeling company in Charlotte, NC
(kitchens, bathrooms, tile & painting, Venetian plaster).

Built with **React** on the front end and a **Node.js / Express** API that receives and validates quote requests.

**🔗 Live demo:** [mr-sweet-home.onrender.com](https://mr-sweet-home.onrender.com)
<sub>Hosted on Render's free tier — the first load after inactivity can take up to a minute.</sub>

![Mr. Sweet Home website](docs/screenshot.png)

## Features

- **Responsive single-page site** — hero, services, project gallery, process, about and contact sections; mobile menu.
- **Project gallery** with filtering by service and an accessible lightbox (keyboard `Esc` to close).
- **Quote request form** with instant client-side validation and matching server-side validation.
- **REST API** (`POST /api/quotes`) that validates input, blocks simple spam with a honeypot field and stores requests.
- **Automated API tests** with Node's built-in test runner and Supertest.
- Accessibility basics: semantic HTML, labelled fields, `aria-invalid` errors, focus styles, reduced-motion support.

## Tech stack

| Layer    | Tools                                              |
| -------- | -------------------------------------------------- |
| Frontend | React 18, Vite, CSS (custom design, no UI library) |
| Backend  | Node.js, Express                                   |
| Testing  | `node:test`, Supertest                             |
| Fonts    | Cormorant Garamond, DM Sans (self-hosted)          |

## Project structure

```
mr-sweet-home/
├── client/            # React app (Vite)
│   └── src/
│       ├── components/  # Header, Hero, Services, Work, Process, About, QuoteForm, Footer
│       ├── data.js      # services, process steps, gallery items
│       └── styles.css
└── server/            # Express API
    ├── src/
    │   ├── app.js       # routes and error handling
    │   ├── validate.js  # quote validation rules
    │   ├── store.js     # JSON-file storage
    │   └── index.js     # server entry point
    └── test/
```

## Getting started

Requires Node.js 18+.

```bash
npm install          # installs client and server (npm workspaces)
npm run dev          # API on :3001, React dev server on :5173 (proxies /api)
npm test             # run API tests
```

Production build — the Express server also serves the built React app:

```bash
npm run build
npm start            # http://localhost:3001
```

## API

| Method | Endpoint       | Description                     |
| ------ | -------------- | ------------------------------- |
| GET    | `/api/health`  | Health check                    |
| POST   | `/api/quotes`  | Submit a quote request          |

Example request:

```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "phone": "(704) 555-0134",
  "service": "kitchen-remodel",
  "message": "Looking to update cabinets and backsplash."
}
```

Returns `201 { "ok": true, "id": "..." }`, or `400` with an `errors` object keyed by field.

## What I'd add next

- Email notification to the business when a new quote arrives
- Admin page to review requests (with authentication)
- Database (PostgreSQL or MongoDB) instead of a JSON file

---

Built by [Roman Stepanovskyi](https://www.linkedin.com/in/roman-stepanovskyi).
