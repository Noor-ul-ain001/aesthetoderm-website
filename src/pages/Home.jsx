import { BRAND, CREDENTIALS, FAQ, IMAGES, PILLARS, STATS, STEPS, TREATMENTS } from '../data';
import { Accordion, Arrow, Badge, Btn, CtaBand, Marquee, Strip, TreatmentCard, ZoomGallery } from '../components/ui';
import { TLink } from '../motion';

export function Stats() {
  return (
    <div className="stats">
      {STATS.map((s) => (
        <div key={s.label} className="stat" data-fade>
          <span className="stat__value"><span data-count={s.value}>{s.value}</span>{s.suffix}</span>
          <span className="stat__label">{s.label}</span>
        </div>
      ))}
    </div>
  );
}

export function Doctor() {
  return (
    <section className="doctor" id="doctor" data-section="The doctor">
      <div className="doctor__media" data-clip>
        <div className="doctor__img" data-parallax="0.2"><img src={IMAGES.procedure} alt="" loading="lazy" /></div>
        <span className="doctor__badge">AAAM<br />Certified</span>
      </div>
      <div className="doctor__body">
        <p className="eyebrow" data-fade>Meet your doctor</p>
        <h2 className="h2" data-split>Dr. Ahmed Ali Furqan</h2>
        <p className="lead" data-fade>Aesthetic physician and injectables expert with a dermatology foundation. Dr. Furqan personally consults and treats every patient at Aesthetoderm.</p>
        <ul className="creds">
          {CREDENTIALS.map((c) => (
            <li key={c.title} data-fade>
              <span className="creds__line" data-line />
              <strong>{c.title}</strong>
              <span>{c.text}</span>
            </li>
          ))}
        </ul>
        <div data-fade><Arrow to="/about">About the doctor</Arrow></div>
      </div>
    </section>
  );
}

export function Reviews() {
  return (
    <section className="reviews" id="reviews" data-section="Reviews">
      <div className="reviews__score" data-fade>
        <span className="reviews__num"><span data-count="5">5</span>.0</span>
        <span className="reviews__stars" aria-label="5 out of 5 stars">★★★★★</span>
        <span className="muted">38 verified patient reviews on oladoc</span>
      </div>
      <div className="reviews__body">
        <p className="eyebrow" data-fade>Patient reviews</p>
        <h2 className="h2" data-split>Trusted by patients across Karachi</h2>
        <p className="lead" data-fade>Read verified reviews on oladoc, and see real results, reviews and signature treatments in the highlights on Instagram.</p>
        <div className="row-actions" data-fade>
          <Btn href={BRAND.oladoc}>Read reviews</Btn>
          <Btn href={BRAND.instagram} variant="btn--ghost">See results on Instagram</Btn>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const featured = TREATMENTS.filter((t) => t.featured);
  const rest = TREATMENTS.filter((t) => !t.featured);

  return (
    <>
      <section className="hero" id="intro" data-section="Intro">
        <div className="hero__media"><img src={IMAGES.hero} alt="" /></div>
        <div className="hero__shade" />
        <div className="hero__content">
          <p className="eyebrow" data-fade="intro">{BRAND.tagline}</p>
          <h1 className="hero__title" data-split="intro-chars">Beauty, <em>refined</em><br />by science</h1>
          <div className="hero__foot">
            <p className="hero__text" data-fade="intro">Injectables, regenerative skin and dermatology by Dr. Ahmed Ali Furqan. Natural results in Clifton &amp; Gulistan-e-Jauhar, Karachi.</p>
            <div className="row-actions" data-fade="intro">
              <Btn to="/contact">Book consultation</Btn>
              <Btn to="/treatments" variant="btn--ghost btn--light">Treatments</Btn>
            </div>
          </div>
        </div>
        <div className="hero__badge"><Badge /></div>
        <div className="hero__scroll" aria-hidden="true"><span>Scroll</span><i /></div>
      </section>

      <Marquee />

      <section className="statement" id="belief" data-section="Our belief">
        <p className="eyebrow" data-fade>Aesthetoderm</p>
        <p className="statement__text" data-words>
          We believe the best aesthetic work is the kind nobody notices, only that you look rested, confident and unmistakably yourself. Every treatment begins with medicine, and ends with artistry.
        </p>
      </section>

      <Doctor />

      <section className="stats-wrap" id="numbers" data-section="In numbers"><Stats /></section>

      <section className="hscroll" id="signature" data-section="Signature" data-hscroll>
        <div className="hscroll__track" data-track>
          <div className="hscroll__intro">
            <p className="eyebrow" data-fade>Signature treatments</p>
            <h2 className="h1" data-split>What we <em>do best</em></h2>
            <p className="lead" data-fade>Expert injectables and regenerative treatments, planned around your anatomy.</p>
            <div data-fade><Arrow to="/treatments">All treatments</Arrow></div>
          </div>
          {featured.map((t, i) => (
            <TLink key={t.slug} to={`/treatments/${t.slug}`} className="hcard" data-cursor="View">
              <div className="hcard__img"><img src={t.image} alt="" loading="lazy" /></div>
              <div className="hcard__info">
                <span className="hcard__num">0{i + 1}</span>
                <span className="eyebrow">{t.kicker}</span>
                <h3>{t.title}</h3>
                <p>{t.short}</p>
              </div>
            </TLink>
          ))}
        </div>
      </section>

      <section className="pillars" id="philosophy" data-section="Philosophy">
        <div className="section-head">
          <p className="eyebrow" data-fade>Our philosophy</p>
          <h2 className="h1" data-split>Medicine first.<br /><em>Artistry always.</em></h2>
        </div>
        <div className="pillars__grid" data-stagger>
          {PILLARS.map((p, i) => (
            <article key={p.title} className="pillar">
              <span className="pillar__num">0{i + 1}</span>
              <h3>{p.title}</h3>
              <p>{p.text}</p>
            </article>
          ))}
        </div>
      </section>

      <Strip />

      <ZoomGallery image={IMAGES.dark} eyebrow="The Aesthetoderm philosophy">
        Never a different you. <em>Only your best.</em>
      </ZoomGallery>

      <section className="more" id="skin" data-section="Skin & hair">
        <div className="section-head section-head--row">
          <div>
            <p className="eyebrow" data-fade>Skin · Hair · Dermatology</p>
            <h2 className="h1" data-split>Complete <em>skin care</em></h2>
          </div>
          <div data-fade><Arrow to="/treatments">View all</Arrow></div>
        </div>
        <div className="grid" data-stagger>
          {rest.map((t, i) => <TreatmentCard key={t.slug} t={t} index={i + featured.length} />)}
        </div>
      </section>

      <section className="journey" id="journey" data-section="Journey">
        <div className="journey__aside">
          <p className="eyebrow" data-fade>Your journey</p>
          <h2 className="h1" data-split>Six steps,<br /><em>zero guesswork</em></h2>
          <p className="lead" data-fade>A calm, medical process from first conversation to final review.</p>
          <div data-fade><Arrow to="/journey">The full journey</Arrow></div>
        </div>
        <Accordion items={STEPS} numbered />
      </section>

      <Reviews />

      <section className="faq" id="faq" data-section="FAQ">
        <div className="section-head section-head--row">
          <div>
            <p className="eyebrow" data-fade>Questions</p>
            <h2 className="h1" data-split>Good to know</h2>
          </div>
          <div data-fade><Arrow to="/faq">All questions</Arrow></div>
        </div>
        <Accordion items={FAQ.slice(0, 5)} />
      </section>

      <CtaBand />
    </>
  );
}
