export default function Hero() {
  return (
    <section className="hero" id="top">
      <div className="plaster" aria-hidden="true" />
      <div className="container hero-grid">
      <div className="hero-inner">
        <p className="eyebrow">Remodeling · Charlotte, NC</p>
        <h1>
          Kitchens, baths <br />
          <em>&amp; Venetian plaster</em>, <br />
          finished right.
        </h1>
        <p className="lead">
          From a full bathroom rebuild to a hand-troweled accent wall, we plan the work clearly,
          keep the site clean and sweat the details you notice every day.
        </p>
        <div className="hero-actions">
          <a href="#quote" className="btn">Get a free quote</a>
          <a href="#work" className="btn btn-ghost">See our work</a>
        </div>
      </div>
      <figure className="hero-photo">
        <img src="/work/plaster-arched-mirror.jpg" alt="Bathroom with curved Venetian plaster wall and arched lit mirror" />
      </figure>
      </div>
    </section>
  );
}
