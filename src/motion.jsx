import { createContext, useCallback, useContext, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { useGSAP } from '@gsap/react';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);
gsap.defaults({ ease: 'power3.out' });

const MOTION_KEY = 'aesthetoderm-motion';

export function motionOff() {
  try { return localStorage.getItem(MOTION_KEY) === 'off'; } catch { return false; }
}

export function setMotion(on) {
  try { localStorage.setItem(MOTION_KEY, on ? 'on' : 'off'); } catch { /* storage unavailable */ }
  window.location.reload();
}

if (typeof document !== 'undefined') document.documentElement.classList.toggle('reduce-motion', motionOff());

export const prefersReduced = () => document.documentElement.classList.contains('reduce-motion');

/* ---------------- smooth scroll ---------------- */

let lenis = null;

export function useSmoothScroll() {
  useEffect(() => {
    if (prefersReduced()) return undefined;
    lenis = new Lenis({ duration: 1.15, smoothWheel: true });
    lenis.on('scroll', ScrollTrigger.update);
    const tick = (t) => lenis.raf(t * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      lenis = null;
    };
  }, []);
}

export function scrollToTop(immediate = true) {
  if (lenis) lenis.scrollTo(0, { immediate, force: true });
  else window.scrollTo({ top: 0, behavior: immediate ? 'instant' : 'smooth' });
}

export function scrollToId(id, immediate = false) {
  const el = id && document.getElementById(id);
  if (!el) return false;
  if (lenis) lenis.scrollTo(el, { offset: -72, immediate, duration: 1.6 });
  else el.scrollIntoView({ behavior: immediate || prefersReduced() ? 'instant' : 'smooth' });
  return true;
}

export function lockScroll(on) {
  if (lenis) {
    if (on) lenis.stop();
    else lenis.start();
  }
  document.documentElement.classList.toggle('no-scroll', on);
}

/* ---------------- page transitions ---------------- */

const TransitionCtx = createContext({ go: () => {}, transitioning: { current: false } });

export function TransitionProvider({ children }) {
  const navigate = useNavigate();
  const { pathname, search } = useLocation();
  const curtain = useRef(null);
  const transitioning = useRef(false);

  const go = useCallback((to) => {
    if (transitioning.current) return;
    const [path, hash] = to.split('#');
    if (path === pathname || to === pathname + search) {
      if (hash) {
        scrollToId(hash);
        window.history.replaceState(null, '', `#${hash}`);
      } else scrollToTop(false);
      return;
    }
    if (prefersReduced()) {
      navigate(to);
      return;
    }
    transitioning.current = true;
    lockScroll(true);
    gsap.timeline()
      .set(curtain.current, { display: 'flex', clipPath: 'inset(100% 0% 0% 0%)' })
      .to(curtain.current, { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.75, ease: 'power4.inOut' })
      .fromTo(curtain.current.querySelector('span'), { yPercent: 100 }, { yPercent: 0, duration: 0.5 }, '-=0.35')
      .add(() => navigate(to));
  }, [navigate, pathname, search]);

  useEffect(() => {
    if (!transitioning.current) return;
    scrollToTop();
    lockScroll(false);
    const hash = window.location.hash.slice(1);
    if (hash) setTimeout(() => scrollToId(hash), 1300);
    gsap.timeline({
      delay: 0.1,
      onComplete: () => {
        gsap.set(curtain.current, { display: 'none' });
        transitioning.current = false;
      },
    })
      .to(curtain.current.querySelector('span'), { yPercent: -100, duration: 0.4, ease: 'power3.in' })
      .to(curtain.current, { clipPath: 'inset(0% 0% 100% 0%)', duration: 0.85, ease: 'power4.inOut' }, '-=0.1');
  }, [pathname]);

  return (
    <TransitionCtx.Provider value={{ go, transitioning }}>
      {children}
      <div className="curtain" ref={curtain} aria-hidden="true"><span>Aesthetoderm</span></div>
    </TransitionCtx.Provider>
  );
}

export const useTransition = () => useContext(TransitionCtx);

export function TLink({ to, onClick, className = '', activeClassName, end, children, ...rest }) {
  const { go } = useTransition();
  const { pathname } = useLocation();
  const active = activeClassName && !to.includes('#') && (end || to === '/' ? pathname === to : pathname.startsWith(to));
  return (
    <Link
      to={to}
      className={`${className} ${active ? activeClassName : ''}`.trim()}
      aria-current={active ? 'page' : undefined}
      onClick={(e) => {
        onClick?.(e);
        if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
        e.preventDefault();
        go(to);
      }}
      {...rest}
    >
      {children}
    </Link>
  );
}

/* ---------------- preloader ---------------- */

export function Preloader({ onReveal, onDone }) {
  const root = useRef(null);

  useGSAP(() => {
    if (prefersReduced()) {
      onReveal();
      onDone();
      return;
    }
    lockScroll(true);
    const counter = { v: 0 };
    const num = root.current.querySelector('.pre__num');
    const tl = gsap.timeline({
      onComplete: () => {
        lockScroll(false);
        onDone();
      },
    });
    tl.from('.pre__word span', { yPercent: 110, stagger: 0.045, duration: 1, ease: 'power4.out' })
      .from('.pre__tag', { autoAlpha: 0, y: 12, duration: 0.8 }, 0.4)
      .to(counter, { v: 100, duration: 1.8, ease: 'power2.inOut', onUpdate: () => { num.textContent = String(Math.round(counter.v)).padStart(3, '0'); } }, 0)
      .to('.pre__bar i', { scaleX: 1, duration: 1.8, ease: 'power2.inOut' }, 0)
      .to('.pre__word span', { yPercent: -110, stagger: 0.025, duration: 0.6, ease: 'power3.in' })
      .to('.pre__tag, .pre__meta', { autoAlpha: 0, duration: 0.4 }, '<')
      .to(root.current, { clipPath: 'inset(0% 0% 100% 0%)', duration: 1.1, ease: 'power4.inOut' })
      .add(onReveal, '<0.25');
  }, { scope: root });

  return (
    <div className="pre" ref={root} aria-hidden="true">
      <div className="pre__word">{'Aesthetoderm'.split('').map((c, i) => <span key={i}>{c}</span>)}</div>
      <p className="pre__tag">by Dr. Ahmed Ali Furqan</p>
      <div className="pre__meta">
        <span className="pre__num">000</span>
        <div className="pre__bar"><i /></div>
      </div>
    </div>
  );
}

/* ---------------- custom cursor ----------------
   - ring trails the pointer and stretches along its direction of travel
   - snaps around buttons / chips / burger (morphs to their shape)
   - shows a label over [data-cursor] targets, becomes an I-beam over text fields
   - click ripple + fading gold trail
*/

const STICK = '.btn, .burger, .chip, .badge, .arrow__icon, .acc__icon, .to-top, .logo__mark';
const TRAIL = 6;

export function Cursor() {
  const ring = useRef(null);
  const dot = useRef(null);
  const label = useRef(null);
  const trail = useRef([]);
  const ripple = useRef(null);

  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches || prefersReduced()) return undefined;
    const html = document.documentElement;
    html.classList.add('has-cursor');

    const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const pos = { x: mouse.x, y: mouse.y };
    const dotPos = { x: mouse.x, y: mouse.y };
    const trailPos = Array.from({ length: TRAIL }, () => ({ x: mouse.x, y: mouse.y }));
    let stuck = null;
    let mode = '';
    let shown = false;

    const setMode = (next, text = '') => {
      if (next === mode && label.current.textContent === text) return;
      mode = next;
      label.current.textContent = text;
      ring.current.dataset.mode = next;
      const size = { '': 38, link: 64, label: 96, text: 4 }[next] ?? 38;
      if (next !== 'stick') {
        gsap.to(ring.current, {
          width: size, height: next === 'text' ? 30 : size, borderRadius: next === 'text' ? 2 : '50%',
          duration: 0.45, ease: 'power3.out', overwrite: 'auto',
        });
      }
      gsap.to(dot.current, { scale: next === '' ? 1 : 0, duration: 0.3, overwrite: 'auto' });
      gsap.to(label.current, { autoAlpha: next === 'label' ? 1 : 0, scale: next === 'label' ? 1 : 0.6, duration: 0.35, overwrite: 'auto' });
    };

    const onMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      if (!shown) {
        shown = true;
        Object.assign(pos, mouse); Object.assign(dotPos, mouse);
        trailPos.forEach((p) => Object.assign(p, mouse));
        gsap.to([ring.current, dot.current, ...trail.current], { autoAlpha: 1, duration: 0.4 });
      }
    };

    const onOver = (e) => {
      const el = e.target;
      const stick = el.closest(STICK);
      const labelled = el.closest('[data-cursor]');
      if (labelled && !stick) {
        stuck = null;
        setMode('label', labelled.getAttribute('data-cursor'));
      } else if (stick) {
        stuck = stick;
        const r = stick.getBoundingClientRect();
        const radius = getComputedStyle(stick).borderRadius;
        mode = 'stick';
        ring.current.dataset.mode = 'stick';
        label.current.textContent = '';
        gsap.to(ring.current, { width: r.width + 14, height: r.height + 14, borderRadius: radius === '0px' ? 8 : radius, duration: 0.45, ease: 'power3.out', overwrite: 'auto' });
        gsap.to(dot.current, { scale: 0, duration: 0.25 });
        gsap.to(label.current, { autoAlpha: 0, duration: 0.2 });
      } else if (el.closest('input, textarea, select')) {
        stuck = null;
        setMode('text');
      } else if (el.closest('a, button, label, [role="tab"]')) {
        stuck = null;
        setMode('link');
      } else {
        stuck = null;
        setMode('');
      }
    };

    const onDown = (e) => {
      gsap.to(ring.current, { scale: 0.82, duration: 0.18 });
      gsap.fromTo(ripple.current, { x: e.clientX, y: e.clientY, scale: 0, autoAlpha: 0.6 }, { scale: 1, autoAlpha: 0, duration: 0.7, ease: 'power2.out' });
    };
    const onUp = () => gsap.to(ring.current, { scale: 1, duration: 0.5, ease: 'elastic.out(1, 0.45)' });
    const onLeave = () => { shown = false; gsap.to([ring.current, dot.current, ...trail.current], { autoAlpha: 0, duration: 0.3 }); };

    const setRing = { x: gsap.quickSetter(ring.current, 'x', 'px'), y: gsap.quickSetter(ring.current, 'y', 'px'), r: gsap.quickSetter(ring.current, 'rotation', 'deg'), sx: gsap.quickSetter(ring.current, 'scaleX'), sy: gsap.quickSetter(ring.current, 'scaleY') };
    const setDot = { x: gsap.quickSetter(dot.current, 'x', 'px'), y: gsap.quickSetter(dot.current, 'y', 'px') };
    const setTrail = trail.current.map((t) => ({ x: gsap.quickSetter(t, 'x', 'px'), y: gsap.quickSetter(t, 'y', 'px') }));

    const tick = () => {
      const dt = 1 - Math.pow(1 - 0.2, gsap.ticker.deltaRatio());
      let tx = mouse.x;
      let ty = mouse.y;
      if (stuck && document.contains(stuck)) {
        const r = stuck.getBoundingClientRect();
        tx = r.left + r.width / 2 + (mouse.x - (r.left + r.width / 2)) * 0.15;
        ty = r.top + r.height / 2 + (mouse.y - (r.top + r.height / 2)) * 0.15;
      } else if (stuck) {
        stuck = null;
        setMode('');
      }
      const vx = tx - pos.x;
      const vy = ty - pos.y;
      pos.x += vx * dt;
      pos.y += vy * dt;
      setRing.x(pos.x);
      setRing.y(pos.y);

      // stretch along direction of travel (only for the free-floating ring)
      if (mode === '' || mode === 'link') {
        const speed = Math.min(Math.hypot(vx, vy) / 60, 0.45);
        setRing.r((Math.atan2(vy, vx) * 180) / Math.PI);
        setRing.sx(1 + speed);
        setRing.sy(1 - speed * 0.55);
      } else {
        setRing.r(0); setRing.sx(1); setRing.sy(1);
      }

      dotPos.x += (mouse.x - dotPos.x) * 0.6;
      dotPos.y += (mouse.y - dotPos.y) * 0.6;
      setDot.x(dotPos.x);
      setDot.y(dotPos.y);

      let lead = dotPos;
      trailPos.forEach((p, i) => {
        p.x += (lead.x - p.x) * 0.45;
        p.y += (lead.y - p.y) * 0.45;
        setTrail[i].x(p.x);
        setTrail[i].y(p.y);
        lead = p;
      });
    };

    gsap.set([ring.current, dot.current, ...trail.current], { xPercent: -50, yPercent: -50, autoAlpha: 0 });
    gsap.set(label.current, { autoAlpha: 0 });
    gsap.set(ripple.current, { xPercent: -50, yPercent: -50, autoAlpha: 0 });
    gsap.ticker.add(tick);
    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerover', onOver);
    window.addEventListener('pointerdown', onDown);
    window.addEventListener('pointerup', onUp);
    html.addEventListener('pointerleave', onLeave);

    return () => {
      html.classList.remove('has-cursor');
      gsap.ticker.remove(tick);
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerover', onOver);
      window.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointerup', onUp);
      html.removeEventListener('pointerleave', onLeave);
    };
  }, []);

  return (
    <div className="cursor" aria-hidden="true">
      {Array.from({ length: TRAIL }, (_, i) => (
        <span key={i} className="cursor-trail" ref={(el) => { trail.current[i] = el; }} style={{ '--i': i }} />
      ))}
      <div className="cursor-ring" ref={ring}><span ref={label} /></div>
      <div className="cursor-dot" ref={dot} />
      <div className="cursor-ripple" ref={ripple} />
    </div>
  );
}

/* ---------------- declarative page animations ----------------
   data-split            heading line reveal on scroll ("intro" = plays on page load)
   data-fade             fade + rise on scroll ("intro" = on load)
   data-stagger          children rise in sequence
   data-clip             image wrapper wipes open, inner img settles from zoom
   data-parallax="0.15"  inner img drifts on scroll
   data-count            animated number (data-count="22")
   data-words            paragraph words brighten as you scroll
   data-line             hairline draws across
   data-hscroll          desktop: pinned horizontal scroll of [data-track]
   data-marquee          infinite marquee that speeds up with scroll velocity
   .magnetic             element follows pointer slightly
*/

export function usePageMotion(scope, { key, ready, introDelay }) {
  useGSAP((_context, contextSafe) => {
    if (!ready) return;
    const root = scope.current;
    const q = (sel) => Array.from(root.querySelectorAll(sel));
    const delay = introDelay();

    const refresh = gsap.delayedCall(0.2, () => ScrollTrigger.refresh()).pause();
    q('img').forEach((img) => {
      if (!img.complete) img.addEventListener('load', () => refresh.restart(true), { once: true });
    });

    const run = contextSafe(() => {
      const mm = gsap.matchMedia();
      mm.add({ any: 'all', desk: '(min-width: 1025px)' }, ({ conditions }) => {
        if (prefersReduced()) return undefined;
        const cleanups = [];

        q('[data-split]').forEach((el) => {
          const mode = el.dataset.split;
          const intro = mode.startsWith('intro');
          if (mode === 'intro-chars') {
            const chars = SplitText.create(el, { type: 'lines,chars', mask: 'lines', linesClass: 'line' });
            gsap.from(chars.chars, { yPercent: 120, rotate: 8, duration: 1.3, stagger: 0.028, ease: 'power4.out', delay });
            return;
          }
          const split = SplitText.create(el, { type: 'lines', mask: 'lines', linesClass: 'line' });
          gsap.from(split.lines, {
            yPercent: 110,
            duration: 1.25,
            stagger: 0.09,
            ease: 'power4.out',
            delay: intro ? delay : 0,
            scrollTrigger: intro ? undefined : { trigger: el, start: 'top 88%' },
          });
        });

        // scramble-in for plain-text eyebrows
        const glyphs = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        q('.eyebrow').filter((el) => el.children.length === 0 && el.textContent.trim()).forEach((el) => {
          const final = el.textContent;
          const inHero = !!el.closest('.phero, .hero');
          const o = { p: 0 };
          gsap.to(o, {
            p: 1, duration: 1.1, ease: 'none', delay: inHero ? delay : 0,
            scrollTrigger: inHero ? undefined : { trigger: el, start: 'top 92%' },
            onUpdate: () => {
              const n = Math.floor(o.p * final.length);
              el.textContent = final.slice(0, n) + final.slice(n).replace(/[^\s·&,.]/g, () => glyphs[(Math.random() * glyphs.length) | 0]);
            },
            onComplete: () => { el.textContent = final; },
          });
          cleanups.push(() => { el.textContent = final; });
        });

        // reading progress
        q('.progress i').forEach((bar) => {
          gsap.to(bar, { scaleX: 1, ease: 'none', scrollTrigger: { start: 0, end: 'max', scrub: 0.3 } });
        });

        // image strips: 3D tilt of the whole stage + rows drifting opposite ways
        q('[data-strip-stage]').forEach((stage) => {
          gsap.fromTo(stage, { rotateX: 24, scale: 0.88, transformPerspective: 1100, transformOrigin: '50% 50%' }, {
            rotateX: -12, scale: 1, ease: 'none',
            scrollTrigger: { trigger: stage, start: 'top bottom', end: 'bottom top', scrub: true },
          });
        });
        q('[data-strip]').forEach((row) => {
          const dir = parseFloat(row.dataset.strip);
          gsap.fromTo(row, { xPercent: dir > 0 ? -42 : 0 }, {
            xPercent: dir > 0 ? 0 : -42, ease: 'none',
            scrollTrigger: { trigger: row, start: 'top bottom', end: 'bottom top', scrub: 0.8 },
          });
        });

        // focus: the image nearest the viewport centre is largest and in full colour
        q('.strip').forEach((strip) => {
          const items = Array.from(strip.querySelectorAll('.strip__item')).map((it) => {
            const img = it.querySelector('img');
            return { it, img, scale: gsap.quickSetter(it, 'scale'), shift: gsap.quickSetter(img, 'xPercent') };
          });
          const update = () => {
            const vw = window.innerWidth;
            const vh = window.innerHeight;
            items.forEach(({ it, img, scale, shift }) => {
              const r = it.getBoundingClientRect();
              if (r.bottom < -100 || r.top > vh + 100) return;
              const d = (r.left + r.width / 2 - vw / 2) / vw;
              const ad = Math.min(Math.abs(d), 0.75);
              scale(1 - ad * 0.3);
              shift(-d * 16);
              img.style.filter = `grayscale(${Math.min(ad * 1.5, 1).toFixed(2)}) brightness(${(1 - ad * 0.4).toFixed(2)})`;
            });
          };
          ScrollTrigger.create({ trigger: strip, start: 'top bottom', end: 'bottom top', onUpdate: update, onRefresh: update, onEnter: update });
          cleanups.push(() => items.forEach(({ img }) => { img.style.filter = ''; }));
        });

        // zoom collage: pinned, centre image grows to full-bleed, satellites fly out
        q('[data-zoom]').forEach((sec) => {
          const frame = sec.querySelector('.zoom__center');
          const img = frame.querySelector('img');
          const sats = Array.from(sec.querySelectorAll('.zoom__sat'));
          const text = sec.querySelector('.zoom__text');
          gsap.set(sats, { autoAlpha: 1 });
          const tl = gsap.timeline({
            defaults: { ease: 'power2.inOut' },
            scrollTrigger: { trigger: sec, start: 'top top', end: '+=200%', pin: true, scrub: 1, anticipatePin: 1, invalidateOnRefresh: true },
          });
          tl.fromTo(frame, { clipPath: 'inset(31% 37% 31% 37% round 8px)' }, { clipPath: 'inset(0% 0% 0% 0% round 0px)', duration: 1 })
            .fromTo(img, { scale: 1.6, filter: 'brightness(.9)' }, { scale: 1, filter: 'brightness(.42)', duration: 1 }, 0)
            .to(sats, {
              x: (_i, el) => parseFloat(el.dataset.x) * window.innerWidth * 0.7,
              y: (_i, el) => parseFloat(el.dataset.y) * window.innerHeight * 0.7,
              scale: 1.5, rotate: (_i, el) => parseFloat(el.dataset.x) * 8, autoAlpha: 0,
              duration: 0.9, ease: 'power2.in', stagger: 0.03,
            }, 0)
            .from(text.children, { yPercent: 80, autoAlpha: 0, duration: 0.45, stagger: 0.12, ease: 'power3.out' }, 0.75)
            .to({}, { duration: 0.35 });
        });

        // stacking cards: earlier cards recede as the next one arrives
        if (window.matchMedia('(min-width: 721px)').matches) {
          q('[data-stack]').forEach((wrap) => {
            const cards = Array.from(wrap.children);
            cards.slice(0, -1).forEach((card, i) => {
              gsap.to(card, {
                scale: 0.92, autoAlpha: 0.35, ease: 'none',
                scrollTrigger: { trigger: cards[i + 1], start: 'top bottom', end: 'top 140px', scrub: true },
              });
            });
          });
        }

        // skew images with scroll velocity
        const skewEls = q('.tcard__img, .hcard__img, .strip__item');
        if (skewEls.length) {
          const skewTo = gsap.quickTo(skewEls, 'skewY', { duration: 0.6, ease: 'power3' });
          const settle = () => skewTo(0);
          ScrollTrigger.create({
            start: 0, end: 'max',
            onUpdate: (self) => skewTo(gsap.utils.clamp(-5, 5, self.getVelocity() / -450)),
          });
          ScrollTrigger.addEventListener('scrollEnd', settle);
          cleanups.push(() => ScrollTrigger.removeEventListener('scrollEnd', settle));
        }

        q('[data-fade="intro"]').forEach((el, i) => {
          gsap.from(el, { y: 40, autoAlpha: 0, duration: 1.2, delay: delay + 0.35 + i * 0.08 });
        });
        const fades = q('[data-fade]:not([data-fade="intro"])');
        gsap.set(fades, { y: 50, autoAlpha: 0 });
        ScrollTrigger.batch(fades, {
          start: 'top 90%',
          onEnter: (els) => gsap.to(els, { y: 0, autoAlpha: 1, duration: 1.1, stagger: 0.1, overwrite: true }),
        });

        q('[data-stagger]').forEach((el) => {
          gsap.from(el.children, {
            y: 60, autoAlpha: 0, duration: 1.1, stagger: 0.1,
            scrollTrigger: { trigger: el, start: 'top 85%' },
          });
        });

        q('[data-clip]').forEach((el) => {
          const intro = el.dataset.clip === 'intro';
          const img = el.querySelector('img');
          const tl = gsap.timeline({
            delay: intro ? delay : 0,
            scrollTrigger: intro ? undefined : { trigger: el, start: 'top 85%' },
          });
          tl.set(el, { '--wipe': '0%' })
            .from(el, { clipPath: 'inset(100% 0% 0% 0%)', duration: 1.1, ease: 'power4.inOut' })
            .to(el, { '--wipe': '-101%', duration: 1, ease: 'power4.inOut' }, '-=0.25');
          if (img) tl.from(img, { scale: 1.35, duration: 2, ease: 'power3.out' }, 0.5);
        });

        q('[data-parallax]').forEach((el) => {
          const img = el.querySelector('img') || el;
          const s = parseFloat(el.dataset.parallax) || 0.15;
          gsap.fromTo(img, { yPercent: -s * 50 }, {
            yPercent: s * 50, ease: 'none',
            scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true },
          });
        });

        q('[data-words]').forEach((el) => {
          const split = SplitText.create(el, { type: 'words' });
          gsap.fromTo(split.words, { opacity: 0.18 }, {
            opacity: 1, stagger: 0.1, ease: 'none',
            scrollTrigger: { trigger: el, start: 'top 80%', end: 'bottom 45%', scrub: true },
          });
        });

        q('[data-line]').forEach((el) => {
          gsap.from(el, { scaleX: 0, transformOrigin: 'left center', duration: 1.4, ease: 'power3.inOut', scrollTrigger: { trigger: el, start: 'top 92%' } });
        });

        q('.hero').forEach((hero) => {
          const media = hero.querySelector('.hero__media img');
          gsap.from(media, { scale: 1.3, duration: 2.6, ease: 'power3.out', delay: delay - 0.3 });
          gsap.to(hero.querySelector('.hero__media'), { yPercent: 25, ease: 'none', scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true } });
          gsap.to(hero.querySelector('.hero__content'), { yPercent: -30, autoAlpha: 0, ease: 'none', scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom 20%', scrub: true } });
        });

        if (conditions.desk) {
          q('[data-hscroll]').forEach((section) => {
            // created after later-in-page pins, so refresh it first
            const track = section.querySelector('[data-track]');
            const dist = () => track.scrollWidth - window.innerWidth;
            gsap.to(track, {
              x: () => -dist(),
              ease: 'none',
              scrollTrigger: { trigger: section, pin: true, scrub: 1, end: () => `+=${dist()}`, invalidateOnRefresh: true, anticipatePin: 1, refreshPriority: 1 },
            });
          });

          q('.hero').forEach((hero) => {
            const img = hero.querySelector('.hero__media img');
            const title = hero.querySelector('.hero__title');
            const ix = gsap.quickTo(img, 'x', { duration: 1.2, ease: 'power3' });
            const iy = gsap.quickTo(img, 'y', { duration: 1.2, ease: 'power3' });
            const tx = gsap.quickTo(title, 'x', { duration: 1.2, ease: 'power3' });
            const move = (e) => {
              const nx = e.clientX / window.innerWidth - 0.5;
              const ny = e.clientY / window.innerHeight - 0.5;
              ix(nx * -40); iy(ny * -30); tx(nx * 30);
            };
            hero.addEventListener('pointermove', move);
            cleanups.push(() => hero.removeEventListener('pointermove', move));
          });

          q('.tcard, .hcard').forEach((card) => {
            gsap.set(card, { transformPerspective: 900 });
            const rx = gsap.quickTo(card, 'rotationX', { duration: 0.6, ease: 'power3' });
            const ry = gsap.quickTo(card, 'rotationY', { duration: 0.6, ease: 'power3' });
            const move = (e) => {
              const r = card.getBoundingClientRect();
              ry(((e.clientX - r.left) / r.width - 0.5) * 10);
              rx(((e.clientY - r.top) / r.height - 0.5) * -10);
            };
            const leave = () => { rx(0); ry(0); };
            card.addEventListener('pointermove', move);
            card.addEventListener('pointerleave', leave);
            cleanups.push(() => {
              card.removeEventListener('pointermove', move);
              card.removeEventListener('pointerleave', leave);
            });
          });

          q('.magnetic').forEach((el) => {
            const xTo = gsap.quickTo(el, 'x', { duration: 0.6, ease: 'elastic.out(1, 0.4)' });
            const yTo = gsap.quickTo(el, 'y', { duration: 0.6, ease: 'elastic.out(1, 0.4)' });
            const move = (e) => {
              const r = el.getBoundingClientRect();
              xTo((e.clientX - r.left - r.width / 2) * 0.3);
              yTo((e.clientY - r.top - r.height / 2) * 0.3);
            };
            const leave = () => { xTo(0); yTo(0); };
            el.addEventListener('pointermove', move);
            el.addEventListener('pointerleave', leave);
            cleanups.push(() => {
              el.removeEventListener('pointermove', move);
              el.removeEventListener('pointerleave', leave);
            });
          });
        }
        return () => cleanups.forEach((fn) => fn());
      });

      // counters & marquee also run (simplified) for reduced motion
      q('[data-count]').forEach((el) => {
        const end = parseFloat(el.dataset.count);
        if (prefersReduced()) { el.textContent = end; return; }
        const o = { v: 0 };
        gsap.to(o, {
          v: end, duration: 2, ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 90%' },
          onUpdate: () => { el.textContent = Math.round(o.v); },
        });
      });

      q('[data-marquee]').forEach((el) => {
        if (prefersReduced()) return;
        const loop = gsap.to(el.querySelector('.marquee__inner'), { xPercent: -50, duration: 28, ease: 'none', repeat: -1 });
        ScrollTrigger.create({
          trigger: el, start: 'top bottom', end: 'bottom top',
          onUpdate: (self) => {
            const v = gsap.utils.clamp(-6, 6, self.getVelocity() / 250);
            gsap.to(loop, { timeScale: v >= 0 ? 1 + v : -1 + v, duration: 0.3, overwrite: true });
            gsap.to(loop, { timeScale: v >= 0 ? 1 : -1, duration: 1.2, delay: 0.3 });
          },
        });
      });

      ScrollTrigger.sort();
      ScrollTrigger.refresh();
    });

    document.fonts.ready.then(run);
    return () => refresh.kill();
  }, { scope, dependencies: [key, ready], revertOnUpdate: true });
}
