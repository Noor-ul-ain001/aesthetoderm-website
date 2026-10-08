import { IMAGES, ONLINE, STEPS } from '../data';
import { Arrow, CtaBand, PageHero } from '../components/ui';

const AFTERCARE = [
  { title: 'Hands off', text: 'Avoid touching, massaging or pressing treated areas for the period advised.' },
  { title: 'Keep cool', text: 'Skip saunas, steam rooms and intense workouts for 24–48 hours after injectables.' },
  { title: 'Protect', text: 'Wear broad-spectrum SPF daily, especially after skin treatments.' },
  { title: 'Stay in touch', text: 'Questions after your visit? Message us on WhatsApp, directly.' },
];

export default function Journey() {
  return (
    <>
      <PageHero
        eyebrow="Your journey"
        title={<>Six steps, <em>zero guesswork</em></>}
        text="A calm, medical process from your first conversation to your final review."
        image={IMAGES.procedure2}
        crumbs={[{ label: 'Journey' }]}
      />

      <section className="steps" id="steps" data-section="Six steps" data-stack>
        {STEPS.map((s, i) => (
          <article key={s.title} className="step">
            <span className="step__num" data-fade>{String(i + 1).padStart(2, '0')}</span>
            <div className="step__body">
              <span className="step__line" data-line />
              <h2 className="h2" data-split>{s.title}</h2>
              <p className="lead" data-fade>{s.text}</p>
            </div>
          </article>
        ))}
      </section>

      <section className="aftercare" id="aftercare" data-section="Aftercare">
        <div className="section-head">
          <p className="eyebrow" data-fade>After your visit</p>
          <h2 className="h1" data-split>Aftercare <em>essentials</em></h2>
        </div>
        <div className="pillars__grid" data-stagger>
          {AFTERCARE.map((a, i) => (
            <article key={a.title} className="pillar">
              <span className="pillar__num">0{i + 1}</span>
              <h3>{a.title}</h3>
              <p>{a.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="online" id="online" data-section="Online">
        <p className="eyebrow" data-fade>Can’t visit in person?</p>
        <h2 className="h2" data-split>{ONLINE.title}</h2>
        <p className="lead" data-fade>{ONLINE.hours}</p>
        <div data-fade><Arrow to="/contact">Book online</Arrow></div>
      </section>

      <CtaBand title="Start with a consultation" />
    </>
  );
}
