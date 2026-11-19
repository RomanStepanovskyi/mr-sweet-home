import { SERVICES } from '../data.js';

export default function Services() {
  return (
    <section className="section" id="services">
      <div className="container">
        <div className="section-head">
          <p className="eyebrow">What we do</p>
          <h2>Four trades, one crew.</h2>
        </div>
        <ul className="services">
          {SERVICES.map((s, i) => (
            <li key={s.id} className="service">
              <span className="service-num">0{i + 1}</span>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
              <ul className="service-points">
                {s.points.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
