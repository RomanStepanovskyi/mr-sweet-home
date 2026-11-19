export default function About() {
  return (
    <section className="section section-plaster" id="about">
      <div className="container about">
        <div>
          <p className="eyebrow">About us</p>
          <h2>Built by an engineer, run like a small business should be.</h2>
        </div>
        <div className="about-text">
          <p>
            Mr. Sweet Home LLC is a residential remodeling company based in Charlotte, North
            Carolina. Our founder comes from a civil engineering background, so every job starts
            with careful measuring, a clear scope and a realistic schedule.
          </p>
          <p>
            We work with homeowners and general contractors, running a trusted team of
            subcontractors for each trade — so you have one point of contact from the first visit
            to the final walkthrough.
          </p>
          <dl className="facts">
            <div>
              <dt>Since</dt>
              <dd>2023</dd>
            </div>
            <div>
              <dt>Based in</dt>
              <dd>Charlotte, NC</dd>
            </div>
            <div>
              <dt>We work with</dt>
              <dd>Homeowners &amp; GCs</dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}
