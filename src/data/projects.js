/**
 * Your projects. Add a new object to the array to add a card to the gallery.
 *
 * id          unique slug (letters, numbers, dashes)
 * title       project name
 * category    used for the filter chips (projects with the same category are grouped)
 * year        shown on the card
 * summary     one or two lines for the card
 * description longer text for the details modal
 * liveUrl     the live website. Leave '' to show "Link coming soon"
 * repoUrl     optional source-code link ('' hides it)
 * image       optional screenshot, e.g. '/projects/lumina-dental.jpg' (put the file in public/projects/).
 *             Without one, a stylish generated preview is drawn using `accent`.
 * accent      two colours for the generated preview and card glow
 * tags        tech stack / keywords (also searchable)
 * highlights  bullet points shown in the details modal
 * featured    true = shown first with a "Featured" badge
 */
export const projects = [
  {
    id: 'lumina-dental',
    title: 'Dental Hospital - Web Design 1',
    category: 'Healthcare',
    year: 2026,
    summary:
      'A premium multi-page website for a dental hospital with service pages, online booking and smooth motion.',
    description:
      'A fully static, premium dental-hospital website. Every service has its own shareable, SEO-friendly page, patients can book appointments from a dedicated booking page, and the home page tells the full story in a single, animated scroll.',
    liveUrl: 'https://dentalp1.netlify.app/',
    repoUrl: '',
    image: '',
    accent: ['#06b6d4', '#6366f1'],
    tags: ['React', 'Vite', 'Tailwind CSS', 'Framer Motion', 'React Router'],
    highlights: [
      'Dedicated page for every service',
      'Appointment booking flow',
      'Lazy-loaded routes for fast first load',
      'Fully responsive with smooth scroll animations',
    ],
    featured: true,
  },
  {
    id: 'visiona-opticals',
    title: 'Opticals Shop - Web Design 1',
    category: 'Retail',
    year: 2026,
    summary:
      'A fashion-forward showcase for an eyewear store: browse frames, save favourites and enquire on WhatsApp.',
    description:
      'A showcase website for a physical eyeglasses and sunglasses store. Visitors browse frames with prices and offers, save favourites to a wishlist, use quick view, then enquire on WhatsApp, call, or visit the store. No checkout needed, just more walk-ins.',
    liveUrl: 'https://opticsproject.netlify.app/', 
    repoUrl: '',
    image: '',
    accent: ['#f59e0b', '#ec4899'],
    tags: ['React', 'Vite', 'Tailwind CSS', 'Framer Motion', 'WhatsApp'],
    highlights: [
      'Product catalogue with filters and quick view',
      'Wishlist saved in the browser',
      'One-tap WhatsApp enquiries',
      'Offers, lookbook, testimonials and FAQs',
    ],
    featured: true,
  },
  {
    id: 'aurelia-estates',
    title: 'Real Estate - Web Design 1',
    category: 'Real Estate',
    year: 2026,
    summary:
      'A luxury real estate marketplace with Buy / Rent / Sell search, smart filters, saved homes and rich property pages.',
    description:
      'A premium real estate website for a luxury brokerage. Visitors search by location, type, price and bedrooms, filter and sort listings, save favourites, and explore each home through a full-screen photo gallery, amenities and an agent contact form. Smooth page transitions and scroll animations give it a high-end marketplace feel.',
    liveUrl: 'https://realestatep1.netlify.app/',
    repoUrl: '',
    image: '',
    accent: ['#c5a059', '#0c1220'],
    tags: ['React', 'Vite', 'Tailwind CSS', 'Framer Motion', 'React Router'],
    highlights: [
      'Buy / Rent / Sell search with filters',
      'Listings with sorting, filter chips and load more',
      'Property gallery with full-screen lightbox',
      'Saved homes wishlist',
      'Agent contact and enquiry forms with validation',
      'Fully responsive with page transitions',
    ],
    featured: true,
  },
  {
    id: 'lior-hale-photography',
    title: 'photography Portfolio Website',
    category: 'Portfolio',
    year: 2026,
    summary:
      'A modern, animated single-page photography portfolio with a shared-layout lightbox.',
    description:
      'An elegant single-page portfolio for a photographer. Images reveal as you scroll, headlines animate in word by word, and opening a photo expands it seamlessly into a full-screen lightbox.',
    liveUrl: 'https://photographyp1.netlify.app/',
    repoUrl: '',
    image: '',
    accent: ['#a855f7', '#0ea5e9'],
    tags: ['React', 'Vite', 'Tailwind CSS', 'Framer Motion'],
    highlights: [
      'Animated gallery with lightbox',
      'Scroll-triggered reveals and staggered text',
      'Single page with smooth section navigation',
    ],
    featured: false,
  },
]
