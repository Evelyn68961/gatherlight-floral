# 拾光花室 Gather Light Floral Studio

A brand site for a fictional Taipei floral studio — built as a front-end demo.
Hand-coded vanilla **HTML / CSS / JS**, no framework, no build step.
Open `index.html` and it runs.

**🔗 Live demo: [gatherlight-floral.vercel.app](https://gatherlight-floral.vercel.app)**

![Gather Light Floral Studio — homepage](assets/preview.png)

> **Note:** This is a portfolio demo. The studio, services, products, prices and
> testimonials are all fictional placeholder content.

## Why this exists

I read four real florist sites before designing this one. Taipei studios like
[PM FLOWERS](https://www.pm-flowers.com/) publish **no prices at all** and take enquiries
only by direct contact; [植香藝室](https://www.y-flora.com/) has no enquiry form on the
site whatsoever. The strongest local example, [花意空間](https://www.flowerpc.com.tw/),
prices its products but not its services, and filters by product type only.

Meanwhile [Bloom & Wild](https://www.bloomandwild.com/) navigates by *occasion* —
Birthdays, Sympathy, Anniversary, Gifts under £30 — because nobody wakes up wanting
"a potted arrangement". They want something for a friend in hospital.

So this demo publishes three price tiers for every service, and filters products by
**occasion first, product type second**.

## Two kinds of visitor

A small florist gets two completely different kinds of visitor, and one page has to
serve both without annoying either:

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
- **Occasion + type filtering** — two independent dimensions ANDed together, occasion
  first, because that is how flowers are actually bought. Products carry several
  occasions, so matching is a membership test rather than equality.
- **A catalogue deep enough to filter** — 21 products across five categories. Every
  category returns at least three and every occasion at least five, so the two-dimension
  filter has something to actually do. Of the 36 possible combinations only five come
  back empty, and those are the honest ones — a subscription is not a birthday gift.
- **Delivery-date filter and 最快可送達 sort** — for flowers *when* matters as much as
  *what*. Every product shows its earliest arrival date, computed from two rules the
  page already states elsewhere: the studio is shut Sunday and Monday (per its own
  opening hours) and same-day orders stop at 15:00. Pick a date and anything that can't
  make it drops out; pick a Sunday and the empty state says why.
- **Reviews that match their own markup** — 4.9 / 186 with a star distribution that sums
  to the stated count and averages to the stated score, and the same figures in the
  `Florist` `aggregateRating`. A rating in markup that a visitor can't see on the page
  is a structured-data policy violation, not a shortcut.
- **Structured data** — `Florist` with `makesOffer`, `Service` with an
  `OfferCatalog`, and opening hours as JSON-LD. No competitor site reviewed has any.
- **LINE as a first-class channel** — persistent CTA plus an inline button in the
  contact block, because that is where Taiwanese enquiries actually arrive.
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
  delivery.js         earliest-arrival dates, date filter, 最快可送達 sort
assets/               placeholder SVG illustrations & icons
```

## Tech notes

- Font: Noto Sans TC via Google Fonts — one family for the whole site, weights 400/500/600/700.
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
