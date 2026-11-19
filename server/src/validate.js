export const SERVICES = [
  'bathroom-remodel',
  'kitchen-remodel',
  'tile-painting',
  'venetian-plaster',
];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[+()\-.\s\d]{7,20}$/;

/**
 * Validates a quote request body.
 * Returns { value } with cleaned data, or { errors } keyed by field name.
 */
export function validateQuote(body = {}) {
  const errors = {};
  const clean = (v) => (typeof v === 'string' ? v.trim() : '');

  const value = {
    name: clean(body.name),
    email: clean(body.email).toLowerCase(),
    phone: clean(body.phone),
    service: clean(body.service),
    message: clean(body.message),
  };

  if (value.name.length < 2 || value.name.length > 80) {
    errors.name = 'Please enter your name (2–80 characters).';
  }
  if (!EMAIL_RE.test(value.email)) {
    errors.email = 'Please enter a valid email address.';
  }
  if (value.phone && !PHONE_RE.test(value.phone)) {
    errors.phone = 'Please enter a valid phone number.';
  }
  if (!SERVICES.includes(value.service)) {
    errors.service = 'Please choose a service.';
  }
  if (value.message.length < 10 || value.message.length > 2000) {
    errors.message = 'Tell us a bit about your project (10–2000 characters).';
  }

  return Object.keys(errors).length ? { errors } : { value };
}
