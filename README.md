# Shree Munisuvrat Swami Jain Derasar — website

A complete, self-contained static website for **Shree Munisuvrat Swami Jain Derasar**
(શ્રી મુનિસુવ્રત સ્વામી જૈન દેરાસર), Karelibaug, Vadodara — the derasar of
**Shri Karelibaug Shwetambar Murtipujak Jain Sangh**.

No build step, no framework, no backend. Plain HTML, one CSS file, two JS files.
Open `index.html` and it works.

---

## Pages

| File | What it covers |
|---|---|
| `index.html`   | Hero slideshow with kinetic headline, live open/closed status, animated stat counters, today's schedule, the three Jina, a bento overview of the complex, gallery preview, parva highlights, Navkar japa counter, reviews, map |
| `about.html`   | Mulnayak Shri Munisuvrat Swami Bhagwan, the architecture in a tabbed walk-through, the other shrines, the hall and tirth-patas, the Sangh |
| `darshan.html` | Timings with live countdown, the vidhi split across Morning / Any time / Evening / Parva tabs, full temple etiquette, the Navkar Mantra with japa counter, an FAQ accordion |
| `events.html`  | The parva calendar as a scroll-tracking timeline, plus chaturmas, mahotsavs, pathshala and yatra in a bento grid |
| `gallery.html` | All twelve photographs, filterable, with a lightbox that has a thumbnail strip, keyboard nav and swipe |
| `seva.html`    | Why daan, eight seva cards, pathshala, anukampa & jeev daya, and a seva enquiry form |
| `visit.html`   | Address, map, plus code, how to get here, practical notes, nearby derasars and the great tirths |
| `contact.html` | Phone / WhatsApp / address, a message form with two send routes, and an accordion of quick answers |

## Design system

Theme name: **Torana**. Ivory marble, rose sandstone and temple gold, taken from
the building itself — white marble shikhar above, terracotta compound wall below,
gold on the parikar and kalash.

- CSS is organised with `@layer tokens, base, layout, ornament, components, effects, utilities, responsive`
- A drifting **aurora** gradient and a fine paper grain sit behind everything, so
  flat colour never reads as plastic
- **Diya mode** — a warm dark theme (the lamp button in the header), remembered
  between visits
- Type: Cormorant Garamond for display, Mukta for text, Noto Sans Gujarati for
  Gujarati, with `text-wrap: balance` on headings

## Interaction & motion

- **Live aarti clock** — the next row in the schedule lights up with a countdown, computed in **IST** whatever timezone the visitor is in; the header pill says whether the derasar is open right now
- **Kinetic headlines** — each `h1` is split into words that rise into place
- **Scroll reveals** in four directions (up, left, right, scale) with stagger, plus a clip-wipe variant for images
- **Parallax** on framed photographs; Ken Burns drift on the hero
- **Cursor spotlight and 3D tilt** on cards, disabled on touch devices
- **Sliding pill** that follows the nav item you are on or hovering
- **Segmented tabs** with a gliding indicator and full arrow-key support
- **Accordion** with a smooth `grid-template-rows` open/close
- **Animated counters** that count up when scrolled into view
- **Marquee tickers** for the Bhagwan names and the great tirths, pausing on hover
- **Toasts** for form submissions, language and theme changes, and completing a mala
- **Ripples** on buttons, a **scroll-progress bar** (native CSS scroll-timeline where supported, JS otherwise), and a **mobile action dock** for call / directions / darshan / seva
- **Lightbox** with thumbnail strip, keyboard arrows, swipe and Escape
- **Navkar japa counter** — a 108-bead mala with a progress ring, stored only in the visitor's own browser
- **Bilingual** — EN / ગુજરાતી toggle switches the navigation and schedule labels; deity names, mantras and the Sangh's name stay in Gujarati throughout
- **View Transitions** between pages where the browser supports them

Everything degrades. Reveals and kinetic text only hide themselves once JS has
confirmed it can bring them back, `prefers-reduced-motion` is respected
throughout, and with JS off the pages are complete — just static.

## Structure

```
index.html … contact.html      the eight pages
assets/css/style.css           the whole design system
assets/js/data.js              ALL editable content: details, schedule, gallery,
                               reviews, festivals, sevas, tickers
assets/js/site.js              behaviour + shared chrome; no dependencies
assets/img/                    web-sized images (max 1600px) + thumb/ (720×540)
assets/img/favicon.svg         hand-drawn shikhar + ahimsa mark
source-images/                 original full-resolution downloads — NOT part of
                               the site, do not deploy
.claude/launch.json            local preview config
```

**To change content, edit `assets/js/data.js`.** Timings, gallery captions, the
festival list, seva categories, the phone number and address all live there and
every page reads from it.

The progress bar, mobile dock, lightbox and toast host are injected by
`site.js` — they are not in the page source, so you never have to keep eight
copies of them in sync. The header, nav and footer *are* in each page, for
crawlability.

## Running it

Any static host works — GitHub Pages, Netlify, Cloudflare Pages, or plain shared
hosting. Upload everything **except** `source-images/` and `.claude/`.

Locally:

```bash
python -m http.server 8765
```

then open `http://localhost:8765`. (A plain `file://` open also works, apart
from the embedded map.)

---

## One thing the maintainer needs to know

**The daily schedule in `data.js` is not official.** No opening hours are
published anywhere for this derasar, so the times follow the customary
Shwetambar Murtipujak routine. The pages simply present them as the schedule and
invite a phone call to confirm the day — which is normal for a temple site — but
they have not been confirmed by the Sangh.

Getting the real times and editing `schedule` in `assets/js/data.js` is the
single most valuable change you can make to this site. The same goes for the
current year's parva dates: the calendar gives tithis, which never change, but
the English dates and the Sangh's own mahotsav programme are set locally.

Other details deliberately not invented anywhere on the site: the trust's
registered name and office-bearers, and the year of pratishtha.

**No payment details, on purpose.** The site collects no money and shows no bank
or UPI details. Contributions are arranged directly with the Sangh's trustees.

## Images

The twelve photographs are the derasar's own — the exterior, the gabhara, the
silver doors, the mandap and the hall behind. They were downloaded at up to
2048px (kept in `source-images/`) and re-encoded for the web. Copyright remains
with the photographers; one sanctum photograph carries its photographer's own
watermark, which has been left intact, and `gallery.html` carries a credit line
inviting correction or removal requests.

Before the site goes public, the Sangh should be happy with the images used and
with how they are credited.
