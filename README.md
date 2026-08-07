# 拾光花室 Gather Light Floral Studio

A brand site for a fictional Taipei floral studio — built as a front-end demo.
Hand-coded vanilla **HTML / CSS / JS**, no framework, no build step.
Open `index.html` and it runs.

![Gather Light Floral Studio — homepage](assets/preview.png)

> **Note:** This is a portfolio demo. The studio, services, products, prices and
> testimonials are all fictional placeholder content.

## The problem this site solves

A small florist gets two completely different kinds of visitor, and a single page has
to serve both without annoying either:

- Someone who **knows what they want** — "a bouquet, today, about NT$1,500" — and needs
  to get to a price fast.
- Someone with a **project** — a wedding, or weekly flowers for their café — who needs
  to understand how the whole thing works before they'll enquire.

So the site answers both readings of "help people find the right service". A
**quick-find band** under the hero jumps the first visitor straight to what they came
for, **category filters** narrow the product grid, and a **quick-view modal** gives
size, stems, care and delivery without leaving the page. For the second visitor, each
service has a **full detail page** — what's included, how it runs, three price tiers,
and the awkward questions answered up front.

## Highlights

- **One template, three services** — `service.html?s=1…3` renders entirely from the
  `SERVICES` object in `scripts/services.js`. Adding a fourth service is a new key, not
  a new page.
- **Product quick-view** — modal reads name, price and image from the card that's
  already on screen and only stores the extra detail in the catalog, so the two can't
  disagree about a price. Scrim, Esc and focus return all wired.
- **Category filtering** — chips filter the product grid with a real empty state; the
  grid is static HTML, so it degrades to a plain list without JS.
- **Token-first CSS** — every colour, type step, spacing unit and radius lives in
  `styles/tokens.css` as custom properties; the whole site re-themes from one file.
- **Fully responsive** — 375 / 768 / 1440, hamburger nav, reflowing grids, and a
  scroll-snap carousel for the quick-find band on narrow screens.
- **Progressive enhancement** — the quick-view button is *injected* by JS rather than
  authored into the HTML, so a visitor with scripting off never sees a dead control.
- **Accessibility** — semantic landmarks, keyboard-operable nav and modal with focus
  return, visible focus rings, `aria-pressed` filter chips, labelled form errors,
  `prefers-reduced-motion` honoured throughout.

## Structure

```
index.html            一頁式官網 — hero, quick-find, about, services, products,
                      process, workshop, testimonials, contact form
service.html          服務內容 — one template, ?s=1…3 (reads scripts/services.js)
styles/
  tokens.css          design tokens (colour, type, spacing, radius, motion)
  base.css            reset + typography
  layout.css          containers, section rhythm, grids
  components.css      every component
scripts/
  main.js             nav, smooth scroll + scrollspy, product filter, reveal, form
  services.js         service data (single source of truth) + detail rendering
  quickview.js        product quick-view modal
assets/               placeholder SVG illustrations & icons
```

## Tech notes

- Fonts: Noto Sans TC + Noto Serif TC via Google Fonts.
- No dependencies, no bundler — deploy by uploading the folder (see `DEPLOYMENT.md`).
- The contact form validates on the front end only; nothing is sent anywhere.
- Measures are set in `em`, not `ch` — `ch` is the width of "0", roughly half a CJK
  glyph, so `ch`-based line lengths come out half as wide as intended on Chinese text.

## Run

Open `index.html` in a browser, or serve the folder:

```bash
npx serve .
```

Serving over HTTP (rather than `file://`) is worth it — `service.html?s=2` and the other
query-string routes behave properly.
