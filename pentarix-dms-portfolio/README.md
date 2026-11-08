# Pentarix DMS portfolio

React and Vite marketing website for Pentarix DMS. The Home page uses a dark navy and orange theme, a 3D network hero, a bilingual promotional banner, an animated order journey, a screenshot carousel, customer information and one-time license pricing.

## Development

```sh
npm install
npm run dev
```

```sh
npm run lint
npm run check
npm run build
npm run preview
```

`lint` checks application source. `check` verifies public asset references, renders all six routes, checks the shared layout and protects the approved Home content and screenshot mappings. `build` creates the production output in `dist/`.

## Structure

```text
src/
  app/                 Application component and route definitions
  layouts/             Shared navigation, route outlet and footer
  pages/               Composition for the six public routes
  components/
    icons/             Reusable module icons
    layout/            Navigation, footer and route scrolling
    ui/                Button, phone link, container and reveal primitives
  sections/
    home/
      hero/            Network hero and overlay
      problem-fix/     English/Sinhala promotional carousel and scoped CSS
      why-dms/         Distributor problems and solutions
      how-it-works/    Embedded order journey
      features/        Main feature grid
      screens/         Four-screen carousel
      customers/       Thilina Distributors profile
      pricing/         Home pricing composition
    about/             About page sections
    contact/           Contact page sections
    features/          Full Features page sections and visual components
    pricing/           Shared pricing sections and plan card
    solutions/         Solutions page sections
  data/
    home/              Editable Home content and screenshot paths
    pricing.js         License plans, add-ons, notes and pricing FAQs
    phone.js           Shared call number and telephone URL
  hooks/               Carousel, visibility, media-query and iframe messaging
  styles/              Theme tokens, global styles and Features page styles
public/
  animations/
    network/           Hero document, network.js and network.css
    order-story/       Order journey document, story.js and story.css
    customer-route/    Customer network, sales-rep bike, delivery vehicle and SVG fallback
  images/              Referenced website images, including lossless WebP screens
  icons/               Referenced SVG assets
  logo/                Brand logo
  vendor/              Original Three.js runtime and its license header
scripts/
  check-project.mjs    Asset and route regression checks
```

## Editing content

- Home navigation targets are defined in `src/data/navigation.js`; the section order is composed in `src/pages/Home.jsx`.
- Edit screenshots in `src/data/home/screens.js`. Items uses `screen-3.webp`, Branches uses `screen-2.webp`, and the fourth slide is Live Tracking.
- Customer metrics are in `src/data/home/customers.js`. The current customer is Thilina Distributors: 1 branch, 12 routes, 865 shops, 247 items, 1 sales rep and 1 delivery person.
- Pricing is shared by Home and `/pricing`; update it in `src/data/pricing.js`. Enterprise is displayed as `Rs. 1M`.
- The banner's English and Sinhala copy is in `src/data/home/banner.js`. Only this banner switches language; there is no site-wide language switch or banner pause button.

The shared navy/orange palette lives in `src/styles/theme.css` and is used through `dms-*` Tailwind utilities. Isolated animation documents keep their own local styles.

## Shared behavior

`SiteLayout` owns one navbar and footer across all routes. Each page owns its `main` content and sections. `useCarousel` handles autoplay, manual selection, interaction pauses, viewport visibility, hidden browser tabs and reduced-motion preferences. Screens rotate every five seconds; banner languages rotate every ten seconds.

Animation documents stay isolated from React. `useFrameMessage` verifies both the origin and source frame before accepting messages. The hero publishes example network counts; the order story publishes its content height. The story supports five clickable or keyboard-selectable steps and playback controls.

Demo and contact actions use `CallLink` and open the dialer for 075 135 2570. The number is configured once in `src/data/phone.js`. About and Contact show a direct call section; email forms and the EmailJS adapter have been removed.

## Formatting and deployment

Formatting conventions are recorded in `.prettierrc.json`. Vendored libraries and the lockfile are excluded from formatting. Vite configuration is in `vite.config.js`; `vercel.json` preserves the SPA fallback for direct links to application routes. Secrets belong in ignored `.env` files, never in source or public animation assets.
