# Aesthetoderm — Website

Animated marketing website for **Aesthetoderm by Dr. Ahmed Ali Furqan**, an injectables, aesthetics and dermatology practice in Karachi (Clifton & Gulistan-e-Jauhar).

Built with React 19, Vite, React Router, GSAP (ScrollTrigger, SplitText) and Lenis smooth scrolling.

## Motion

- Preloader with counter and letter reveal
- Curtain page transitions between routes
- Lenis smooth scroll synced with ScrollTrigger
- Split-line heading reveals, scroll-scrubbed word highlighting
- Clip-path image reveals and parallax
- Pinned horizontal scroll for signature treatments (desktop)
- Velocity-reactive marquee, animated counters
- Custom cursor and magnetic buttons (pointer devices)
- Respects `prefers-reduced-motion`

Animations are declarative: add `data-split`, `data-fade`, `data-clip`, `data-parallax`, `data-words`, `data-count`, `data-stagger`, `data-line` or `data-marquee` to an element. See `src/motion.jsx`.

## Pages

`/` · `/about` · `/treatments` · `/treatments/:slug` · `/journey` · `/faq` · `/contact`

## Development

```bash
npm install
npm run dev
npm run build
```

Content (clinic details, treatments, FAQs, images) lives in `src/data.js`. Replace the placeholder stock images with clinic photography before launch.
