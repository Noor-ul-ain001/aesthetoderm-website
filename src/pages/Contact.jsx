import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { BRAND, IMAGES, LOCATIONS, ONLINE, TREATMENTS, waLink } from '../data';
import { Arrow, Btn, PageHero, Socials } from '../components/ui';

const BRANCHES = [...LOCATIONS.map((l) => l.name), 'Online consultation'];

export default function Contact() {
  const [params] = useSearchParams();
  const pre = TREATMENTS.find((t) => t.slug === params.get('t'))?.title || '';
  const [form, setForm] = useState({ name: '', phone: '', treatment: pre, branch: BRANCHES[0], agree: false });
  const [sent, setSent] = useState(false);
  const [mapIdx, setMapIdx] = useState(0);
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.type === 'checkbox' ? e.target.checked : e.target.value });

  const submit = (e) => {
    e.preventDefault();
    const msg = `Hello Aesthetoderm, I'd like to book an appointment with Dr. Ahmed Ali Furqan.\nName: ${form.name}\nPhone: ${form.phone}\nTreatment: ${form.treatment || 'Consultation'}\nClinic: ${form.branch}`;
    window.open(waLink(msg), '_blank', 'noopener');
    setSent(true);
  };

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title={<>Book your <em>consultation</em></>}
        text="Clifton, Gulistan-e-Jauhar or online. Choose what suits you."
        image={IMAGES.clinic}
        crumbs={[{ label: 'Contact' }]}
      />

      <section className="contact" id="appointment" data-section="Appointment">
        <form className="form" onSubmit={submit} data-fade>
          {sent ? (
            <div className="form__done">
              <h2 className="h2">Thank you, {form.name.split(' ')[0]}.</h2>
              <p className="lead">Your request opened in WhatsApp. Send the message and our team will confirm your appointment.</p>
              <button type="button" className="arrow" onClick={() => setSent(false)}>Send another request →</button>
            </div>
          ) : (
            <>
              <h2 className="h2">Request an appointment</h2>
              <div className="form__grid">
                <label className="field"><input required placeholder=" " value={form.name} onChange={set('name')} autoComplete="name" /><span>Your name</span></label>
                <label className="field"><input required type="tel" placeholder=" " value={form.phone} onChange={set('phone')} autoComplete="tel" /><span>Phone number</span></label>
                <label className="field field--select"><select value={form.treatment} onChange={set('treatment')}>
                  <option value="">Consultation</option>
                  {TREATMENTS.map((t) => <option key={t.slug}>{t.title}</option>)}
                </select><span>Treatment</span></label>
                <label className="field field--select"><select value={form.branch} onChange={set('branch')}>
                  {BRANCHES.map((b) => <option key={b}>{b}</option>)}
                </select><span>Clinic</span></label>
              </div>
              <label className="check">
                <input type="checkbox" required checked={form.agree} onChange={set('agree')} />
                <span>I agree to be contacted about my appointment request.</span>
              </label>
              <Btn type="submit">Send via WhatsApp</Btn>
            </>
          )}
        </form>

        <div className="contact__info">
          <div className="loc" data-fade>
            <p className="eyebrow">WhatsApp &amp; mobile</p>
            <a href={`tel:${BRAND.phoneTel}`} className="contact__phone">{BRAND.phoneDisplay}</a>
            <p className="muted">Clifton clinic: <a href={`tel:${BRAND.landlineTel}`}>{BRAND.landlineDisplay}</a></p>
          </div>
          {LOCATIONS.map((l) => (
            <div key={l.name} className="loc" data-fade>
              <p className="eyebrow">{l.name}</p>
              <p>{l.address}</p>
              <p className="muted">{l.hours}</p>
              <Arrow href={l.map}>Directions</Arrow>
            </div>
          ))}
          <div className="loc" data-fade>
            <p className="eyebrow">{ONLINE.title}</p>
            <p>{ONLINE.hours}</p>
          </div>
          <div className="loc" data-fade>
            <p className="eyebrow">Follow</p>
            <Socials />
          </div>
        </div>
      </section>

      <section className="map" id="map" data-section="Map" data-fade>
        <div className="filters">
          {LOCATIONS.map((l, i) => (
            <button key={l.name} className={`chip ${i === mapIdx ? 'chip--active' : ''}`} onClick={() => setMapIdx(i)}>{l.name}</button>
          ))}
        </div>
        <div className="map__frame" data-cursor="Drag">
          <iframe key={mapIdx} title={`Map of ${LOCATIONS[mapIdx].name} clinic`} src={LOCATIONS[mapIdx].embed} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
        </div>
      </section>
    </>
  );
}
