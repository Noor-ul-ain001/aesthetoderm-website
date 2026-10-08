import { CREDENTIALS, IMAGES, PILLARS } from '../data';
import { Arrow, CtaBand, Marquee, PageHero, Strip } from '../components/ui';
import { Doctor, Reviews, Stats } from './Home';

export default function About() {
  return (
    <>
      <PageHero
        eyebrow="About Aesthetoderm"
        title={<>Medicine meets <em>artistry</em></>}
        text="Aesthetoderm is the practice of Dr. Ahmed Ali Furqan: aesthetic physician, injectables expert and dermatology-trained doctor, with clinics in Clifton and Gulistan-e-Jauhar."
        image={IMAGES.spa}
        crumbs={[{ label: 'About' }]}
      />

      <section className="statement" id="story" data-section="Our story">
        <p className="eyebrow" data-fade>Our story</p>
        <p className="statement__text" data-words>
          Aesthetoderm was founded on one idea: aesthetic treatments deserve the same rigour as medicine. That means honest consultations, anatomy-led planning and natural results that age gracefully with you.
        </p>
      </section>

      <Doctor />

      <section className="timeline-creds" id="credentials" data-section="Credentials">
        <div className="section-head">
          <p className="eyebrow" data-fade>Training &amp; credentials</p>
          <h2 className="h1" data-split>Qualified <em>to care</em></h2>
        </div>
        <ol className="ctl">
          {CREDENTIALS.map((c, i) => (
            <li key={c.title} className="ctl__item" data-fade>
              <span className="ctl__num">0{i + 1}</span>
              <h3>{c.title}</h3>
              <p>{c.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="stats-wrap" id="numbers" data-section="In numbers"><Stats /></section>

      <Marquee />

      <Strip eyebrow="Our aesthetic" />

      <section className="pillars" id="promise" data-section="Promise">
        <div className="section-head">
          <p className="eyebrow" data-fade>What we stand for</p>
          <h2 className="h1" data-split>Our promise</h2>
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
        <div className="center" data-fade><Arrow to="/treatments">Explore treatments</Arrow></div>
      </section>

      <Reviews />
      <CtaBand />
    </>
  );
}
