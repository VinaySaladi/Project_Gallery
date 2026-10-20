# Project Gallery

An animated gallery of the websites I've built, with live links, to share with clients.
Built with **React + Vite** (JavaScript), **Tailwind CSS v4**, **framer-motion** and **lucide-react**.

## Quick start

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build in /dist
npm run preview    # preview the production build
```

## Where to edit things

| What | File |
| --- | --- |
| Your name, headline, email, WhatsApp, socials | `src/config/site.js` |
| Projects (title, live link, tags, highlights…) | `src/data/projects.js` |
| Project screenshots | `public/projects/` |
| Colours & fonts | `src/index.css` (`@theme`) |

### Add a project

Add an object to the array in `src/data/projects.js`. Each field is described in the comment at the top of that file.
The filter chips, counters and tech marquee update on their own.

### Screenshots

Save a screenshot (16:10 works best, e.g. 1600×1000) to `public/projects/my-site.jpg` and set
`image: '/projects/my-site.jpg'`. If a project has no image, the gallery draws a preview in the project's `accent` colours.

## Motion

- Hero: animated aurora blobs, a spotlight that follows the cursor, a word-by-word headline reveal, count-up stats and parallax on scroll
- An infinite tech-stack marquee
- Filter chips with a sliding active pill, and a grid that animates as you filter or search
- Cards that tilt in 3D, with a cursor-following glow and border and a zoom on hover
- A spring-animated details modal with staggered content, plus previous/next (← → keys) between projects
- Magnetic contact buttons and a scroll progress bar
- Visitors who turn on "reduce motion" in their OS settings get these effects toned down (`MotionConfig reducedMotion="user"`)

## Deploy

This is a static site, so it runs on Vercel, Netlify or any static host. On Vercel, import the folder; it detects Vite
(build command `npm run build`, output folder `dist`).
