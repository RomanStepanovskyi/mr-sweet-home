import { useState } from 'react';
import { SERVICES } from '../data.js';

const EMPTY = { name: '', email: '', phone: '', service: '', message: '', website: '' };

// Mirrors the server rules so users get instant feedback.
function validate(v) {
  const e = {};
  if (v.name.trim().length < 2) e.name = 'Please enter your name.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email.trim())) e.email = 'Please enter a valid email address.';
  if (v.phone.trim() && !/^[+()\-.\s\d]{7,20}$/.test(v.phone.trim())) e.phone = 'Please enter a valid phone number.';
  if (!v.service) e.service = 'Please choose a service.';
  if (v.message.trim().length < 10) e.message = 'Tell us a bit about your project (at least 10 characters).';
  return e;
}

export default function QuoteForm() {
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error

  const update = (field) => (e) => {
    setValues((v) => ({ ...v, [field]: e.target.value }));
    if (errors[field]) setErrors((er) => ({ ...er, [field]: undefined }));
  };

  async function onSubmit(e) {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length) return;

    setStatus('sending');
    try {
      const res = await fetch('/api/quotes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok) {
        setStatus('sent');
        setValues(EMPTY);
      } else {
        setErrors(data.errors || {});
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  }

  const field = (name) => ({
    id: `q-${name}`,
    name,
    value: values[name],
    onChange: update(name),
    'aria-invalid': Boolean(errors[name]),
    'aria-describedby': errors[name] ? `q-${name}-err` : undefined,
  });

  const Err = ({ name }) =>
    errors[name] ? (
      <span className="field-error" id={`q-${name}-err`}>
        {errors[name]}
      </span>
    ) : null;

  return (
    <section className="section section-dark" id="quote">
      <div className="container quote">
        <div className="quote-intro">
          <p className="eyebrow">Get a quote</p>
          <h2>Tell us about your project.</h2>
          <p>
            Share a few details and we’ll get back to you to schedule a free on-site consultation
            in the Charlotte area.
          </p>
        </div>

        {status === 'sent' ? (
          <div className="form-success" role="status">
            <h3>Thank you!</h3>
            <p>Your request has been received. We’ll be in touch shortly.</p>
            <button className="btn btn-ghost" onClick={() => setStatus('idle')}>
              Send another request
            </button>
          </div>
        ) : (
          <form className="form" onSubmit={onSubmit} noValidate>
            <div className="form-row">
              <label htmlFor="q-name">
                <span className="label-text">Name</span>
                <input type="text" autoComplete="name" {...field('name')} />
                <Err name="name" />
              </label>
              <label htmlFor="q-email">
                <span className="label-text">Email</span>
                <input type="email" autoComplete="email" {...field('email')} />
                <Err name="email" />
              </label>
            </div>
            <div className="form-row">
              <label htmlFor="q-phone">
                <span className="label-text">Phone <span className="optional">(optional)</span></span>
                <input type="tel" autoComplete="tel" {...field('phone')} />
                <Err name="phone" />
              </label>
              <label htmlFor="q-service">
                <span className="label-text">Service</span>
                <select {...field('service')}>
                  <option value="">Choose a service…</option>
                  {SERVICES.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.title}
                    </option>
                  ))}
                </select>
                <Err name="service" />
              </label>
            </div>
            <label htmlFor="q-message">
              <span className="label-text">Project details</span>
              <textarea rows="5" {...field('message')} placeholder="Room, size, what you’d like to change, timeline…" />
              <Err name="message" />
            </label>

            {/* Honeypot field — hidden from people, catches simple bots */}
            <input className="hp" tabIndex="-1" autoComplete="off" aria-hidden="true" {...field('website')} />

            {status === 'error' && (
              <p className="form-alert" role="alert">
                Something went wrong. Please check the form and try again.
              </p>
            )}
            <button type="submit" className="btn" disabled={status === 'sending'}>
              {status === 'sending' ? 'Sending…' : 'Request a quote'}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
