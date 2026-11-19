import { useEffect, useMemo, useState } from 'react';
import { SERVICES, WORK } from '../data.js';

// Only show filters for services that have photos.
const FILTERS = [{ id: 'all', title: 'All' }, ...SERVICES.filter((s) => WORK.some((w) => w.service === s.id))];
const titleOf = (id) => SERVICES.find((s) => s.id === id)?.title ?? '';

export default function Work() {
  const [filter, setFilter] = useState('all');
  const [active, setActive] = useState(null);

  const items = useMemo(
    () => (filter === 'all' ? WORK : WORK.filter((w) => w.service === filter)),
    [filter],
  );

  useEffect(() => {
    if (!active) return;
    const onKey = (e) => e.key === 'Escape' && setActive(null);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [active]);

  return (
    <section className="section section-dark" id="work">
      <div className="container">
        <div className="section-head">
          <p className="eyebrow">Our work</p>
          <h2>Recent projects</h2>
        </div>

        <div className="filters" role="group" aria-label="Filter projects by service">
          {FILTERS.map((f) => (
            <button
              key={f.id}
              className={`filter ${filter === f.id ? 'is-active' : ''}`}
              aria-pressed={filter === f.id}
              onClick={() => setFilter(f.id)}
            >
              {f.title}
            </button>
          ))}
        </div>

        <ul className="gallery">
          {items.map((w) => (
            <li key={w.id}>
              <button className="tile" onClick={() => setActive(w)}>
                {w.src ? (
                  <img src={w.src} alt={w.title} loading="lazy" />
                ) : (
                  <span className={`tile-placeholder ph-${w.service}`} aria-hidden="true" />
                )}
                <span className="tile-caption">
                  <strong>{w.title}</strong>
                  <span>{titleOf(w.service)}</span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      {active && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label={active.title} onClick={() => setActive(null)}>
          <figure onClick={(e) => e.stopPropagation()}>
            {active.src ? (
              <img src={active.src} alt={active.title} />
            ) : (
              <span className={`tile-placeholder ph-${active.service} lightbox-ph`} aria-hidden="true" />
            )}
            <figcaption>
              {active.title} · {titleOf(active.service)}
            </figcaption>
            <button className="lightbox-close" onClick={() => setActive(null)} aria-label="Close">
              ×
            </button>
          </figure>
        </div>
      )}
    </section>
  );
}
