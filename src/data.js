// Clinic details sourced from Instagram (@drahmedalifurqan), Facebook (Aesthetoderm by Dr. Ahmed Ali Furqan)
// and the doctor's public oladoc.com profile.

export const BRAND = {
  name: 'Aesthetoderm',
  full: 'Aesthetoderm by Dr. Ahmed Ali Furqan',
  doctor: 'Dr. Ahmed Ali Furqan',
  tagline: 'Injectables Expert · Aesthetic Consultant',
  phoneDisplay: '+92 305 2131466',
  phoneTel: '+923052131466',
  landlineDisplay: '021 3814 0600',
  landlineTel: '+922138140600',
  whatsapp: '923052131466',
  instagram: 'https://www.instagram.com/drahmedalifurqan',
  instagramHandle: '@drahmedalifurqan',
  facebook: 'https://www.facebook.com/aesthetoderm',
  mapsShare: 'https://maps.app.goo.gl/6jPM1SRQLthFwzWz8',
  oladoc: 'https://oladoc.com/pakistan/karachi/dr/aesthetic-physician/ahmed-ali-furqan/6610',
};

export const waLink = (text) => `https://wa.me/${BRAND.whatsapp}?text=${encodeURIComponent(text)}`;
export const BOOK_TEXT = 'Hello Aesthetoderm, I would like to book a consultation with Dr. Ahmed Ali Furqan.';

export const CREDENTIALS = [
  { title: 'MBBS', text: 'Hamdard University, Karachi' },
  { title: 'PGD Dermatology', text: 'University of South Wales, UK' },
  { title: 'AAAM Certified', text: 'American Academy of Aesthetic Medicine' },
  { title: 'Injectables Expert', text: 'Fillers, anti-wrinkle & body contouring' },
];

export const LOCATIONS = [
  {
    name: 'Clifton',
    address: 'Bungalow C-58, Block 2, Clifton, Karachi',
    hours: 'By appointment',
    query: 'C-58 Block 2 Clifton Karachi',
  },
  {
    name: 'Gulistan-e-Jauhar',
    address: 'House C-123/1, Block 15, Gulistan-e-Jauhar, Karachi (next to Body Complex Gym)',
    hours: 'Mon–Sat · 12:00 pm – 9:00 pm',
    query: 'C-123/1 Block 15 Gulistan-e-Jauhar Karachi',
  },
].map((l) => ({
  ...l,
  map: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(l.query)}`,
  embed: `https://maps.google.com/maps?q=${encodeURIComponent(l.query)}&z=15&output=embed`,
}));

export const ONLINE = { title: 'Online video consultation', hours: 'Thu–Sat · 4:00 pm – 6:00 pm' };

const px = (id, w = 1600) => `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}`;

// Free-to-use Pexels photography (placeholders until clinic photography is available)
export const IMAGES = {
  hero: px(9519443, 2200),
  portrait: px(1459920),
  injectable: px(4586711),
  procedure: px(7581590),
  procedure2: px(34220536),
  peel: px(19682556),
  mask: px(7582123),
  serums: px(8102129),
  dropper: px(18708753),
  dark: px(3973709, 2000),
  bottles: px(11753638),
  products: px(8789616),
  hair: px(16892463),
  clinic: px(34220328),
  spa: px(21849239),
  body: px(30797177),
  antiage: px(6651650),
  vial: px(30822276),
};

export const GALLERY = [17200372, 1459920, 7582123, 9519443, 21849239, 3973709, 19682556, 6651650, 34220536, 14530622].map((id) => px(id, 900));

export const STATS = [
  { value: 22, suffix: 'K', label: 'Instagram community' },
  { value: 5, suffix: '.0', label: 'Rating on oladoc (38 verified reviews)' },
  { value: 5, suffix: '+', label: 'Years in aesthetic medicine' },
  { value: 2, suffix: '', label: 'Clinics in Karachi + online' },
];

export const PILLARS = [
  {
    title: 'Science-led aesthetics',
    text: 'A dermatology foundation (MBBS, PGD Dermatology) means every injectable and skin treatment is planned around anatomy, safety and skin health.',
  },
  {
    title: 'Natural, balanced results',
    text: 'Subtle refinement over dramatic change. Treatments are dosed and placed to enhance your proportions, so you look rested, not “done”.',
  },
  {
    title: 'Personally treated',
    text: 'You are consulted, treated and followed up by Dr. Ahmed Ali Furqan, with clear advice on what you need and what you do not.',
  },
];

export const CATEGORIES = ['All', 'Injectables', 'Skin', 'Hair', 'Dermatology'];

// Quick facts are typical guidance; every plan is confirmed at consultation.
export const TREATMENTS = [
  {
    slug: 'anti-wrinkle-injectables',
    title: 'Anti-Wrinkle Injectables',
    kicker: 'Signature',
    category: 'Injectables',
    featured: true,
    image: IMAGES.injectable,
    short: 'Soften forehead lines, frown lines and crow’s feet for a fresh, rested look.',
    intro: 'Precisely placed micro-doses relax the muscles that cause expression lines. The result is smoother skin that still moves naturally, so you look like yourself, just well rested.',
    benefits: ['Forehead, frown & crow’s feet lines', 'Quick, lunchtime appointment', 'Natural expression preserved', 'Preventative for early lines'],
    facts: { Duration: 'Around 20–30 minutes', Downtime: 'Minimal, resume your day', Results: 'Develop over 1–2 weeks' },
  },
  {
    slug: 'dermal-fillers',
    title: 'Dermal Fillers',
    kicker: 'Lips · Cheeks · Jawline',
    category: 'Injectables',
    featured: true,
    image: IMAGES.portrait,
    short: 'Restore volume and sculpt lips, cheeks, chin and jawline with hyaluronic acid fillers.',
    intro: 'Hyaluronic acid fillers restore lost volume and define structure. From soft lip hydration to cheek lift and jawline contour, every plan is built on facial balance and proportion.',
    benefits: ['Lip enhancement & hydration', 'Cheek & under-eye volume', 'Chin & jawline definition', 'Dissolvable hyaluronic acid'],
    facts: { Duration: 'Around 30–45 minutes', Downtime: 'Mild swelling for a few days', Results: 'Visible immediately' },
  },
  {
    slug: 'breast-fillers',
    title: 'Non-Surgical Breast Fillers',
    kicker: 'Body contouring',
    category: 'Injectables',
    featured: true,
    image: IMAGES.body,
    short: 'Subtle, non-surgical enhancement of shape and volume, without implants or general anaesthesia.',
    intro: 'An injectable alternative for those seeking a subtle improvement in volume and shape without surgery. Suitability, product choice and realistic outcomes are discussed in detail during a private consultation.',
    benefits: ['No surgery or implants', 'Private, discreet consultation', 'Subtle, natural enhancement', 'Tailored to your proportions'],
    facts: { Duration: 'Discussed at consultation', Downtime: 'Short; advice given', Results: 'Visible after treatment' },
  },
  {
    slug: 'exosome-therapy',
    title: 'Exosome Therapy',
    kicker: 'Regenerative',
    category: 'Skin',
    featured: true,
    image: IMAGES.dropper,
    short: 'Next-generation regenerative treatment for glow, repair, scarring and hair revival.',
    intro: 'Exosomes deliver growth factors and signalling molecules that support cellular repair. Used for skin rejuvenation, post-acne recovery and hair thinning, often combined with microneedling.',
    benefits: ['Glow & skin renewal', 'Supports scar & acne recovery', 'Hair thinning support', 'Pairs with microneedling'],
    facts: { Duration: 'Around 45 minutes', Downtime: 'Minimal redness', Results: 'Build over a course' },
  },
  {
    slug: 'acne-scar-revision',
    title: 'Acne & Scar Revision',
    kicker: 'Clear skin',
    category: 'Skin',
    image: IMAGES.peel,
    short: 'Medical treatment for active acne and resurfacing for the scars it leaves behind.',
    intro: 'Acne is treated medically first: calming active breakouts and their cause. Then scars and marks are addressed with resurfacing, peels and regenerative treatments.',
    benefits: ['Active acne management', 'Atrophic scar improvement', 'Post-acne marks fade', 'Prescription home-care'],
    facts: { Duration: 'Varies by protocol', Downtime: 'Depends on treatment', Results: 'Progressive over a course' },
  },
  {
    slug: 'pigmentation',
    title: 'Pigmentation & Melasma',
    kicker: 'Even tone',
    category: 'Skin',
    image: IMAGES.mask,
    short: 'Targeted plans for melasma, sun spots, uneven tone and dullness.',
    intro: 'Pigmentation has many triggers, from hormones and sun to inflammation. A dermatology-led diagnosis guides a plan of peels, actives and in-clinic treatments to even and brighten tone.',
    benefits: ['Melasma management', 'Sun spots & freckles', 'Post-inflammatory marks', 'Brighter, even tone'],
    facts: { Duration: 'Varies by protocol', Downtime: 'Little to none', Results: 'Gradual over weeks' },
  },
  {
    slug: 'anti-ageing',
    title: 'Anti-Ageing & Rejuvenation',
    kicker: 'Skin quality',
    category: 'Skin',
    image: IMAGES.antiage,
    short: 'Collagen-boosting treatments to firm, hydrate and refine texture.',
    intro: 'A layered approach to ageing skin, combining skin boosters, regenerative treatments and medical-grade skincare to improve firmness, fine lines, texture and radiance.',
    benefits: ['Fine lines & texture', 'Hydration & glow', 'Firmer-looking skin', 'Personalised skincare plan'],
    facts: { Duration: 'Varies by treatment', Downtime: 'Minimal', Results: 'Build over a course' },
  },
  {
    slug: 'hair-fall-alopecia',
    title: 'Hair Fall & Alopecia',
    kicker: 'Hair restoration',
    category: 'Hair',
    image: IMAGES.hair,
    short: 'Diagnosis-led treatment for hair fall, thinning and alopecia.',
    intro: 'Hair loss can be hormonal, nutritional, stress-related or autoimmune. After assessing the cause, your plan may include medical therapy and regenerative scalp treatments.',
    benefits: ['Root-cause assessment', 'Thinning & hair fall', 'Alopecia management', 'Regenerative scalp therapy'],
    facts: { Duration: 'Varies by treatment', Downtime: 'None', Results: 'Over several months' },
  },
  {
    slug: 'medical-dermatology',
    title: 'Medical Dermatology',
    kicker: 'Skin conditions',
    category: 'Dermatology',
    image: IMAGES.products,
    short: 'Eczema, psoriasis, dermatitis, urticaria and skin infections, diagnosed and treated.',
    intro: 'Healthy skin comes first. Dr. Furqan diagnoses and manages common skin conditions including eczema, psoriasis, dermatitis, urticaria and bacterial or fungal infections.',
    benefits: ['Eczema & dermatitis', 'Psoriasis', 'Urticaria (hives)', 'Bacterial & fungal infections'],
    facts: { Duration: 'Consultation-based', Downtime: 'None', Results: 'Depends on condition' },
  },
];

export const STEPS = [
  { title: 'Consultation', text: 'An honest conversation about your concerns and goals, with a medical history and skin or facial assessment.' },
  { title: 'Facial Mapping', text: 'Your proportions, skin quality and anatomy are mapped so treatment is planned, not guessed.' },
  { title: 'Your Plan', text: 'A clear recommendation: which treatments, how much product, expected results and cost. No pressure, no upselling.' },
  { title: 'Treatment', text: 'Performed by Dr. Furqan with medical-grade products, with comfort measures such as numbing where appropriate.' },
  { title: 'Aftercare', text: 'Written aftercare and a direct line on WhatsApp for any questions in the days after treatment.' },
  { title: 'Review', text: 'A follow-up to assess results and fine-tune if needed, because the details matter.' },
];

export const FAQ_GROUPS = [
  {
    group: 'Booking',
    items: [
      { q: 'How do I book an appointment?', a: 'Message us on WhatsApp at +92 305 2131466, call the Clifton clinic on 021 3814 0600, or use the booking form on our contact page.' },
      { q: 'Which clinic should I visit?', a: 'We have clinics in Clifton (Block 2) and Gulistan-e-Jauhar (Block 15). Choose whichever suits you. Online video consultations are also available.' },
      { q: 'Do you offer online consultations?', a: 'Yes. Video consultations are available Thursday to Saturday, 4:00 pm to 6:00 pm. Book via WhatsApp.' },
      { q: 'What does a consultation cost?', a: 'Consultation fees vary by clinic and type (in-person or online). Message us for the current fee and any running offers.' },
    ],
  },
  {
    group: 'Injectables',
    items: [
      { q: 'Will I still look natural?', a: 'That is the goal. Dosing and placement are planned around your proportions so results look refreshed, never overdone.' },
      { q: 'Do injections hurt?', a: 'Most people find them very tolerable. Fine needles and numbing are used where appropriate to keep you comfortable.' },
      { q: 'How long do results last?', a: 'Anti-wrinkle results typically last a few months; fillers usually last longer depending on area and product. We will advise at your consultation.' },
      { q: 'Are fillers reversible?', a: 'Hyaluronic acid fillers can be dissolved if needed, which is one reason we use them.' },
    ],
  },
  {
    group: 'Skin & hair',
    items: [
      { q: 'What are exosomes?', a: 'Exosomes are tiny vesicles that carry growth factors and signals that support repair. They are used for skin rejuvenation, scarring and hair thinning.' },
      { q: 'Can you treat skin conditions like eczema or psoriasis?', a: 'Yes. Dr. Furqan holds a PGD in Dermatology and treats eczema, psoriasis, dermatitis, urticaria and skin infections.' },
    ],
  },
];

export const FAQ = FAQ_GROUPS.flatMap((g) => g.items);

export const MARQUEE = ['Anti-Wrinkle', 'Lip Fillers', 'Jawline Contour', 'Exosomes', 'Breast Fillers', 'Scar Revision', 'Pigmentation', 'Hair Restoration'];

export const NAV = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Treatments', to: '/treatments' },
  { label: 'Journey', to: '/journey' },
  { label: 'FAQ', to: '/faq' },
  { label: 'Contact', to: '/contact' },
];
