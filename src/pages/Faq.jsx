import { FAQ_GROUPS, IMAGES } from '../data';
import { Accordion, CtaBand, PageHero } from '../components/ui';

export default function Faq() {
  return (
    <>
      <PageHero
        eyebrow="Questions"
        title={<>Good <em>to know</em></>}
        text="Answers to common questions about booking, injectables and skin treatments."
        image={IMAGES.bottles}
        crumbs={[{ label: 'FAQ' }]}
      />

      <section className="faq faq--page">
        {FAQ_GROUPS.map((g, i) => (
          <div key={g.group} className="faq__group" id={g.group.toLowerCase().replace(/[^a-z]+/g, '-')} data-section={g.group}>
            <div className="faq__label">
              <span className="pillar__num" data-fade>0{i + 1}</span>
              <h2 className="h2" data-split>{g.group}</h2>
            </div>
            <Accordion items={g.items} />
          </div>
        ))}
      </section>

      <CtaBand title="Still curious?" text="Message us on WhatsApp and we will reply shortly." />
    </>
  );
}
