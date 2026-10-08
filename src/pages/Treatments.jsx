import { useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { CATEGORIES, IMAGES, TREATMENTS } from '../data';
import { CtaBand, PageHero, TreatmentCard } from '../components/ui';
import { prefersReduced } from '../motion';

export default function Treatments() {
  const [params, setParams] = useSearchParams();
  const grid = useRef(null);
  const cat = CATEGORIES.includes(params.get('c')) ? params.get('c') : 'All';
  const list = cat === 'All' ? TREATMENTS : TREATMENTS.filter((t) => t.category === cat);

  useGSAP(() => {
    if (!prefersReduced()) {
      gsap.fromTo(grid.current.children, { y: 40, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.8, stagger: 0.07, ease: 'power3.out' });
    }
    ScrollTrigger.refresh();
  }, { scope: grid, dependencies: [cat] });

  return (
    <>
      <PageHero
        eyebrow="Treatments"
        title={<>Injectables, skin <em>&amp; hair</em></>}
        text="Every treatment is performed by Dr. Ahmed Ali Furqan and planned around your anatomy, skin and goals."
        image={IMAGES.serums}
        crumbs={[{ label: 'Treatments' }]}
      />

      <section className="listing" id="treatments" data-section="Treatments">
        <div className="filters" role="tablist" aria-label="Filter treatments" data-fade>
          {CATEGORIES.map((c) => (
            <button
              key={c}
              role="tab"
              aria-selected={c === cat}
              className={`chip ${c === cat ? 'chip--active' : ''}`}
              onClick={() => setParams(c === 'All' ? {} : { c }, { replace: true, preventScrollReset: true })}
            >
              {c}
              <sup>{c === 'All' ? TREATMENTS.length : TREATMENTS.filter((t) => t.category === c).length}</sup>
            </button>
          ))}
        </div>
        <div className="grid" ref={grid}>
          {list.map((t) => <TreatmentCard key={t.slug} t={t} index={TREATMENTS.indexOf(t)} />)}
        </div>
      </section>

      <CtaBand title="Not sure where to start?" text="Book a consultation and Dr. Furqan will recommend only what you need." />
    </>
  );
}
