import { useEffect, useId, useRef, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { BRAND, GALLERY, LOCATIONS, MARQUEE, NAV, TREATMENTS, waLink, BOOK_TEXT } from '../data';
import { Cursor, Preloader, TLink, lockScroll, motionOff, prefersReduced, scrollToId, scrollToTop, setMotion, usePageMotion, useSmoothScroll, useTransition } from '../motion';

export function Ext({ href, children, ...rest }) {
  return <a href={href} target="_blank" rel="noreferrer" {...rest}>{children}</a>;
}

function Label({ children }) {
  return <span className="roll" data-text={children}><span>{children}</span></span>;
}

export function Btn({ to, href, variant = '', children, cursor, ...rest }) {
  const cls = `btn magnetic ${variant}`.trim();
  const inner = <><Label>{children}</Label><i className="btn__dot" aria-hidden="true" /></>;
  if (to) return <TLink to={to} className={cls} data-cursor={cursor} {...rest}>{inner}</TLink>;
  if (href) return <Ext href={href} className={cls} data-cursor={cursor} {...rest}>{inner}</Ext>;
  return <button className={cls} {...rest}>{inner}</button>;
}

export function Arrow({ to, href, children, ...rest }) {
  const inner = <><Label>{children}</Label><span className="arrow__icon" aria-hidden="true">→</span></>;
  if (to) return <TLink to={to} className="arrow" {...rest}>{inner}</TLink>;
  return <Ext href={href} className="arrow" {...rest}>{inner}</Ext>;
}

export function Socials() {
  return (
    <div className="socials">
      <Ext href={BRAND.instagram}><Label>Instagram</Label></Ext>
      <Ext href={BRAND.facebook}><Label>Facebook</Label></Ext>
      <Ext href={waLink(BOOK_TEXT)}><Label>WhatsApp</Label></Ext>
    </div>
  );
}

function Logo({ onClick }) {
  return (
    <TLink to="/" className="logo" onClick={onClick} aria-label="Aesthetoderm home">
      <span className="logo__mark">A</span>
      <span className="logo__text">
        <span className="logo__name">Aesthetoderm</span>
        <span className="logo__sub">Dr. Ahmed Ali Furqan</span>
      </span>
    </TLink>
  );
}

function Header() {
  const header = useRef(null);
  const menu = useRef(null);
  const tl = useRef(null);
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);

  useGSAP(() => {
    ScrollTrigger.create({
      start: 0,
      end: 'max',
      onUpdate: (self) => {
        const y = self.scroll();
        setSolid(y > 40);
        if (prefersReduced()) return;
        const hide = self.direction === 1 && y > 300;
        gsap.to(header.current, { yPercent: hide ? -100 : 0, duration: 0.5, ease: 'power3.out', overwrite: 'auto' });
      },
    });

    tl.current = gsap.timeline({ paused: true })
      .set(menu.current, { display: 'grid' })
      .fromTo(menu.current, { clipPath: 'circle(0% at 100% 0%)' }, { clipPath: 'circle(150% at 100% 0%)', duration: 1, ease: 'power4.inOut' })
      .from('.menu__nav a', { yPercent: 120, autoAlpha: 0, rotate: 4, stagger: 0.06, duration: 0.9, ease: 'power4.out' }, '-=0.5')
      .from('.menu__aside > *', { y: 30, autoAlpha: 0, stagger: 0.06, duration: 0.7 }, '-=0.7');
  }, []);

  const toggle = (next) => {
    setOpen(next);
    lockScroll(next);
    if (next) {
      gsap.to(header.current, { yPercent: 0, duration: 0.3 });
      tl.current.timeScale(1).play();
    } else {
      tl.current.timeScale(1.6).reverse();
    }
  };

  return (
    <>
      <header ref={header} className={`header ${solid ? 'header--solid' : ''} ${open ? 'header--open' : ''}`}>
        <Logo onClick={() => open && toggle(false)} />
        <nav className="header__nav" aria-label="Primary">
          {NAV.slice(1, 5).map((n) => (
            <TLink key={n.to} to={n.to} activeClassName="is-active"><Label>{n.label}</Label></TLink>
          ))}
        </nav>
        <div className="header__actions">
          <Btn to="/contact" variant="btn--small">Book now</Btn>
          <button className={`burger ${open ? 'burger--open' : ''}`} aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} onClick={() => toggle(!open)}>
            <span /><span />
          </button>
        </div>
      </header>

      <div ref={menu} className="menu" aria-hidden={!open} inert={!open}>
        <nav className="menu__nav">
          {NAV.map((n, i) => (
            <div key={n.to} className="menu__row">
              <TLink to={n.to} end activeClassName="is-active" onClick={() => toggle(false)}>
                <small>0{i + 1}</small><Label>{n.label}</Label>
              </TLink>
            </div>
          ))}
        </nav>
        <div className="menu__aside">
          <p className="eyebrow">Book a consultation</p>
          <a href={`tel:${BRAND.phoneTel}`} className="menu__phone">{BRAND.phoneDisplay}</a>
          {LOCATIONS.map((l) => <p key={l.name} className="muted">{l.address}</p>)}
          <Socials />
        </div>
      </div>
    </>
  );
}

export function Marquee({ items = MARQUEE, dark }) {
  const row = items.map((m) => <span key={m}>{m}<i aria-hidden="true">✦</i></span>);
  return (
    <div className={`marquee ${dark ? 'marquee--dark' : ''}`} data-marquee aria-hidden="true">
      <div className="marquee__inner">{row}{row}</div>
    </div>
  );
}

export const JUMP_LINKS = [
  { label: 'Meet the doctor', to: '/#doctor' },
  { label: 'Signature treatments', to: '/#signature' },
  { label: 'Gallery', to: '/#gallery' },
  { label: 'Patient journey', to: '/#journey' },
  { label: 'Reviews', to: '/#reviews' },
  { label: 'Credentials', to: '/about#credentials' },
  { label: 'Clinics & map', to: '/contact#map' },
];

export function Badge({ to = '/contact', text = 'Book a consultation · Aesthetoderm · ' }) {
  const id = useId().replace(/:/g, '');
  return (
    <TLink to={to} className="badge" data-cursor="Book" aria-label="Book a consultation">
      <svg viewBox="0 0 200 200" aria-hidden="true">
        <defs><path id={`c${id}`} d="M100,100 m-80,0 a80,80 0 1,1 160,0 a80,80 0 1,1 -160,0" /></defs>
        <text><textPath href={`#c${id}`}>{text.repeat(2)}</textPath></text>
      </svg>
      <span className="badge__arrow" aria-hidden="true">↗</span>
    </TLink>
  );
}

export function Strip({ title = <>Natural, <em>never overdone</em></>, eyebrow = 'The Aesthetoderm look' }) {
  const rows = [GALLERY.slice(0, 5), GALLERY.slice(5)];
  return (
    <section className="strip" id="gallery" data-section="Gallery">
      <div className="section-head section-head--row">
        <div>
          <p className="eyebrow" data-fade>{eyebrow}</p>
          <h2 className="h1" data-split>{title}</h2>
        </div>
        <div data-fade><Arrow href={BRAND.instagram}>Results on Instagram</Arrow></div>
      </div>
      <div className="strip__stage" data-strip-stage>
        {rows.map((r, i) => (
          <div key={i} className="strip__row" data-strip={i % 2 ? '1' : '-1'} aria-hidden="true">
            {[...r, ...r].map((src, j) => (
              <div className="strip__item" key={j}><img src={src} alt="" loading="lazy" /></div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}

// Pinned collage: the centre image expands to full screen while the others fly outward.
const SATELLITES = [
  { x: -1, y: -1, pos: 'tl' }, { x: 0.15, y: -1, pos: 'tc' }, { x: 1, y: -1, pos: 'tr' },
  { x: -1, y: 0.2, pos: 'ml' }, { x: 1, y: 0.3, pos: 'mr' },
  { x: -0.6, y: 1, pos: 'bl' }, { x: 0.7, y: 1, pos: 'br' },
];

export function ZoomGallery({ image, images = GALLERY, eyebrow, children }) {
  return (
    <section className="zoom" id="promise" data-section="Promise" data-zoom>
      <div className="zoom__stage">
        {SATELLITES.map((s, i) => (
          <div key={s.pos} className={`zoom__sat zoom__sat--${s.pos}`} data-x={s.x} data-y={s.y} aria-hidden="true">
            <img src={images[i % images.length]} alt="" loading="lazy" />
          </div>
        ))}
        <div className="zoom__center">
          <img src={image} alt="" loading="lazy" />
        </div>
        <div className="zoom__text">
          <p className="zoom__quote">{children}</p>
          <span className="eyebrow">{eyebrow}</span>
        </div>
      </div>
    </section>
  );
}

const pad = (n) => String(n).padStart(2, '0');

function SectionNav({ scope, routeKey, ready }) {
  const [items, setItems] = useState([]);
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);

  useGSAP(() => {
    if (!ready) return;
    const els = Array.from(scope.current.querySelectorAll('main [data-section]'));
    setItems(els.map((el) => ({ id: el.id, label: el.dataset.section })));
    setActive(0);
    els.forEach((el, i) => {
      ScrollTrigger.create({
        trigger: el, start: 'top 55%', end: 'bottom 55%',
        onToggle: (self) => { if (self.isActive) setActive(i); },
      });
    });
    ScrollTrigger.create({ start: 200, end: 'max', onToggle: (self) => setVisible(self.isActive) });
  }, { dependencies: [routeKey, ready], revertOnUpdate: true });

  if (items.length < 2) return null;

  const jump = (e, id) => {
    e.preventDefault();
    setOpen(false);
    scrollToId(id);
    window.history.replaceState(null, '', `#${id}`);
  };

  return (
    <nav className={`snav ${open ? 'snav--open' : ''} ${visible ? 'snav--visible' : ''}`} aria-label="Sections on this page">
      <button className="snav__toggle" aria-expanded={open} onClick={() => setOpen(!open)}>
        <span className="snav__count"><b key={active}>{pad(active + 1)}</b> / {pad(items.length)}</span>
        <span className="snav__current" key={`l${active}`}>{items[active]?.label}</span>
      </button>
      <ol className="snav__list">
        {items.map((it, i) => (
          <li key={it.id}>
            <a href={`#${it.id}`} className={i === active ? 'is-active' : ''} onClick={(e) => jump(e, it.id)}>
              <span className="snav__num">{pad(i + 1)}</span>
              <span className="snav__label">{it.label}</span>
              <i aria-hidden="true" />
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__cta">
        <p className="eyebrow" data-fade>Begin your journey</p>
        <TLink to="/contact" className="footer__big" data-cursor="Book">
          <span data-split>Let’s refine</span>
          <span data-split><em>your look</em></span>
        </TLink>
      </div>
      <div className="footer__line" data-line />
      <div className="footer__cols">
        <div data-fade>
          <p className="eyebrow">Treatments</p>
          {TREATMENTS.map((t) => <TLink key={t.slug} to={`/treatments/${t.slug}`}><Label>{t.title}</Label></TLink>)}
        </div>
        <div data-fade>
          <p className="eyebrow">Explore</p>
          {NAV.map((n) => <TLink key={n.to} to={n.to}><Label>{n.label}</Label></TLink>)}
        </div>
        <div data-fade>
          <p className="eyebrow">Clinics</p>
          {LOCATIONS.map((l) => <Ext key={l.name} href={l.map}><Label>{l.name}</Label></Ext>)}
          <a href={`tel:${BRAND.phoneTel}`}><Label>{BRAND.phoneDisplay}</Label></a>
          <a href={`tel:${BRAND.landlineTel}`}><Label>{BRAND.landlineDisplay}</Label></a>
        </div>
        <div data-fade>
          <p className="eyebrow">Jump to</p>
          {JUMP_LINKS.map((j) => <TLink key={j.to} to={j.to}><Label>{j.label}</Label></TLink>)}
        </div>
      </div>
      <div className="footer__word" aria-hidden="true">Aesthetoderm</div>
      <div className="footer__bottom">
        <span>© {new Date().getFullYear()} {BRAND.full}. Karachi.</span>
        <Socials />
        <div className="footer__tools">
          <button className="to-top" onClick={() => setMotion(motionOff())} aria-pressed={!motionOff()}>
            <Label>{motionOff() ? 'Motion: off' : 'Motion: on'}</Label>
          </button>
          <button className="to-top" onClick={() => scrollToTop(false)}><Label>Back to top ↑</Label></button>
        </div>
      </div>
    </footer>
  );
}

export function Layout() {
  const { pathname } = useLocation();
  const main = useRef(null);
  const [ready, setReady] = useState(false);
  const [preloading, setPreloading] = useState(true);
  const { transitioning } = useTransition();

  useSmoothScroll();
  useEffect(() => { if (!transitioning.current) scrollToTop(); }, [pathname, transitioning]);
  usePageMotion(main, { key: pathname, ready, introDelay: () => (transitioning.current ? 0.6 : 0.15) });

  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (!ready || !hash || transitioning.current) return undefined;
    const t = setTimeout(() => scrollToId(hash), 700);
    return () => clearTimeout(t);
  }, [ready, transitioning]);

  return (
    <>
      {preloading && <Preloader onReveal={() => setReady(true)} onDone={() => setPreloading(false)} />}
      <Cursor />
      <div ref={main}>
        <div className="progress" aria-hidden="true"><i /></div>
        <Header />
        <main key={pathname}><Outlet /></main>
        <Footer />
        <SectionNav scope={main} routeKey={pathname} ready={ready} />
      </div>
      <Ext className="wa-float" href={waLink(BOOK_TEXT)} aria-label="Chat on WhatsApp" data-cursor="Chat">
        <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.3-.4.7-1.4.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.4.8 3.2.6.5-.1 1.5-.6 1.8-1.2.2-.6.2-1.1.1-1.2l-.5-.3Z"/></svg>
      </Ext>
    </>
  );
}

export function PageHero({ eyebrow, title, text, image, crumbs = [] }) {
  return (
    <section className="phero" id="intro" data-section="Intro">
      <div className="phero__content">
        <nav className="crumbs" aria-label="Breadcrumb" data-fade="intro">
          <TLink to="/">Home</TLink>
          {crumbs.map((c) => (c.to ? <TLink key={c.label} to={c.to}>{c.label}</TLink> : <span key={c.label}>{c.label}</span>))}
        </nav>
        {eyebrow && <p className="eyebrow" data-fade="intro">{eyebrow}</p>}
        <h1 className="phero__title" data-split="intro">{title}</h1>
        {text && <p className="phero__text" data-fade="intro">{text}</p>}
      </div>
      <div className="phero__media" data-clip="intro">
        <div className="phero__img" data-parallax="0.2"><img src={image} alt="" /></div>
      </div>
    </section>
  );
}

export function Accordion({ items, numbered }) {
  const [open, setOpen] = useState(0);
  return (
    <div className="accordion" data-stagger>
      {items.map((it, i) => {
        const isOpen = open === i;
        return (
          <div key={it.title || it.q} className={`acc ${isOpen ? 'acc--open' : ''}`}>
            <button className="acc__head" aria-expanded={isOpen} onClick={() => setOpen(isOpen ? -1 : i)}>
              {numbered && <span className="acc__num">{String(i + 1).padStart(2, '0')}</span>}
              <span className="acc__title">{it.title || it.q}</span>
              <span className="acc__icon" aria-hidden="true" />
            </button>
            <div className="acc__panel"><div><p>{it.text || it.a}</p></div></div>
          </div>
        );
      })}
    </div>
  );
}

export function TreatmentCard({ t, index }) {
  return (
    <TLink to={`/treatments/${t.slug}`} className="tcard" data-cursor="View">
      <div className="tcard__img">
        <img src={t.image.replace(/w=\d+/, 'w=800')} alt="" loading="lazy" />
      </div>
      <div className="tcard__meta">
        <span>{index != null ? String(index + 1).padStart(2, '0') : t.category}</span>
        <span>{t.kicker}</span>
      </div>
      <h3>{t.title}</h3>
      <p>{t.short}</p>
    </TLink>
  );
}

export function CtaBand({ title = 'Ready when you are', text = 'Book a consultation in Clifton, Gulistan-e-Jauhar or online.' }) {
  return (
    <section className="cta" id="book" data-section="Book">
      <Marquee dark />
      <Badge />
      <div className="cta__inner">
        <h2 className="h1" data-split>{title}</h2>
        <p className="lead" data-fade>{text}</p>
        <div className="cta__actions" data-fade>
          <Btn to="/contact">Book an appointment</Btn>
          <Btn href={waLink(BOOK_TEXT)} variant="btn--ghost">WhatsApp us</Btn>
        </div>
      </div>
    </section>
  );
}
