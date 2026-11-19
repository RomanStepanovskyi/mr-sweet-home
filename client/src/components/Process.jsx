import { STEPS } from '../data.js';

export default function Process() {
  return (
    <section className="section" id="process">
      <div className="container">
        <div className="section-head">
          <p className="eyebrow">How it works</p>
          <h2>A clear process, no surprises.</h2>
        </div>
        <ol className="steps">
          {STEPS.map((s) => (
            <li key={s.title} className="step">
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
