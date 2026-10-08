import { IMAGES } from '../data';
import { Btn, PageHero } from '../components/ui';

export default function NotFound() {
  return (
    <>
      <PageHero eyebrow="404" title={<>Page <em>not found</em></>} text="The page you are looking for has moved or no longer exists." image={IMAGES.dark} crumbs={[{ label: '404' }]} />
      <section className="cta cta--plain">
        <div className="cta__actions">
          <Btn to="/">Back to home</Btn>
          <Btn to="/treatments" variant="btn--ghost">View treatments</Btn>
        </div>
      </section>
    </>
  );
}
