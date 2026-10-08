import { useParams } from 'react-router-dom';
import { STEPS, TREATMENTS, waLink } from '../data';
import { Arrow, Btn, CtaBand, PageHero, TreatmentCard } from '../components/ui';
import NotFound from './NotFound';

export default function TreatmentDetail() {
  const { slug } = useParams();
  const t = TREATMENTS.find((x) => x.slug === slug);
  if (!t) return <NotFound />;

  const idx = TREATMENTS.indexOf(t);
  const next = TREATMENTS[(idx + 1) % TREATMENTS.length];
  const related = TREATMENTS.filter((x) => x.slug !== t.slug && x.category === t.category).concat(TREATMENTS.filter((x) => x.featured && x.slug !== t.slug && x.category !== t.category)).slice(0, 3);

  return (
    <>
      <PageHero
        eyebrow={`${t.category} · ${t.kicker}`}
        title={t.title}
        text={t.short}
        image={t.image}
        crumbs={[{ label: 'Treatments', to: '/treatments' }, { label: t.title }]}
      />

      <section className="detail" id="overview" data-section="Overview">
        <div className="detail__main">
          <p className="eyebrow" data-fade>Overview</p>
          <p className="detail__intro" data-words>{t.intro}</p>

          <h2 className="h3" data-split>Benefits</h2>
          <ul className="benefits" data-stagger>
            {t.benefits.map((b, i) => <li key={b}><span>0{i + 1}</span>{b}</li>)}
          </ul>

          <h2 className="h3" data-split>How it works</h2>
          <ol className="mini-steps" data-stagger>
            {STEPS.slice(0, 5).map((s, i) => (
              <li key={s.title}><span className="mini-steps__num">0{i + 1}</span><div><strong>{s.title}</strong><p>{s.text}</p></div></li>
            ))}
          </ol>
          <div data-fade><Arrow to="/journey">See the full journey</Arrow></div>
        </div>

        <aside className="facts" data-fade>
          <p className="eyebrow">At a glance</p>
          <dl>
            {Object.entries(t.facts).map(([k, v]) => (
              <div key={k}><dt>{k}</dt><dd>{v}</dd></div>
            ))}
            <div><dt>Performed by</dt><dd>Dr. Ahmed Ali Furqan</dd></div>
          </dl>
          <p className="facts__note">Typical guidance only. Your plan, suitability and pricing are confirmed at consultation.</p>
          <Btn href={waLink(`Hello, I'd like to book ${t.title} with Dr. Ahmed Ali Furqan.`)}>Book this treatment</Btn>
          <Btn to="/contact" variant="btn--ghost">Booking form</Btn>
        </aside>
      </section>

      <section className="related" id="related" data-section="Related">
        <div className="section-head">
          <p className="eyebrow" data-fade>You may also like</p>
          <h2 className="h2" data-split>Related treatments</h2>
        </div>
        <div className="grid" data-stagger>
          {related.map((r) => <TreatmentCard key={r.slug} t={r} index={TREATMENTS.indexOf(r)} />)}
        </div>
      </section>

      <section className="next" id="next" data-section="Next">
        <Btn to={`/treatments/${next.slug}`} variant="next__link" cursor="Next">
          Next: {next.title}
        </Btn>
      </section>

      <CtaBand />
    </>
  );
}
