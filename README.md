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
| `index.html`   | Hero slideshow, live open/closed status, today's schedule, the three Jina in the gabhara, gallery preview, parva highlights, Navkar japa counter, Google reviews, map |
| `about.html`   | Mulnayak Shri Munisuvrat Swami Bhagwan, how to read the architecture, the other shrines in the complex, the hall and tirth-patas, the Sangh |
| `darshan.html` | Daily timings with live countdown, the pujas performed (prakshal, ashtaprakari, snatra, chaityavandan, aarti, angi), full temple etiquette, Navkar Mantra with japa counter, FAQ |
| `events.html`  | The Jain parva calendar by tithi — Gyan Panchami through Diwali — plus chaturmas, mahotsavs, pathshala and yatra |
| `gallery.html` | All twelve photographs, filterable, with a keyboard-navigable lightbox |
| `seva.html`    | Why daan, eight seva categories, pathshala, anukampa & jeev daya, and a seva enquiry form |
| `visit.html`   | Address, map, plus code, access notes, how to get here, practical notes, other Jain temples nearby |
| `contact.html` | Phone/WhatsApp/address, message form, and a list of the details the Sangh could send in to complete the site |

## Features

- **Live aarti clock** — the schedule row that is next lights up, with a countdown, computed in **IST** regardless of the visitor's own timezone. The header pill says whether the derasar is open right now.
- **Bilingual** — English / ગુજરાતી toggle (`ગુજ` button) switches the navigation and schedule labels; the Sangh's name, deity names and mantras appear in Gujarati throughout regardless. The choice is remembered.
- **Diya mode** — a warm dark theme (the lamp button), the derasar after the evening aarti. Remembered between visits.
- **Navkar Mantra japa counter** — a 108-bead mala with a progress ring, stored only in the visitor's own browser.
- **Gallery lightbox** — click or keyboard (`←` `→` `Esc`), with category filters.
- **Forms without a backend** — the seva and contact forms validate in the browser, then compose a pre-written WhatsApp or e-mail message for the visitor to review and send. Nothing is submitted anywhere and no data is stored.
- Responsive down to small phones, sticky header with a mobile drawer, scroll-reveal animation that degrades safely, `prefers-reduced-motion` respected, skip link, focus rings, print stylesheet, JSON-LD `PlaceOfWorship` structured data, Open Graph tags.

## Structure

```
index.html … contact.html      the eight pages
assets/css/style.css           the whole theme ("Marble & Sandstone")
assets/js/data.js              ALL editable content: details, schedule, gallery, reviews, festivals, sevas
assets/js/site.js              behaviour; no dependencies
assets/img/                    web-sized images (max 1600px) + thumb/ (720×540)
assets/img/favicon.svg         hand-drawn shikhar + ahimsa mark
source-images/                 the original full-resolution downloads — NOT part of the site, do not deploy
.claude/launch.json            local preview config
```

**To change content, edit `assets/js/data.js`.** Timings, gallery captions, the
festival list, the seva categories, the phone number and address all live there
and every page reads from it.

## Running it

Any static host works — GitHub Pages, Netlify, Cloudflare Pages, or plain
shared hosting. Upload everything **except** `source-images/` and `.claude/`.

Locally:

```bash
python -m http.server 8765
```

then open `http://localhost:8765`. (A plain `file://` open also works, apart
from the embedded map.)

---

## What is verified, and what is not

This site was built entirely from what the derasar itself makes public: its
Google Business Profile, and the boards and inscriptions legible in the
photographs posted there. That distinction matters, so here it is plainly.

**Taken directly from the listing — verified:**

- Name, Gujarati name, and the Sangh's name from the gate nameplate:
  શ્રી કારેલીબાગ શ્વેતામ્બર મૂર્તિપૂજક જૈન સંઘ
- Address: Naka Jivan Bharti, Pratapkunj Society Road, opposite Arya Kanya
  Vidyalaya, Karelibagh, Vadodara, Gujarat 390018
- Phone **099674 76524** · plus code **858X+CV** · coordinates 22.3160642, 73.1997035
- Rating **4.6 from 172 reviews**; the quoted reviews are verbatim
- Deities, read from the gabhara wall and the marble plaques: Mulnayak
  **Shri Munisuvrat Swami**, with **Shri Mahavir Swami** and **Shri Naminath**;
  a separate **Shri Simandhar Swami** shrine; a **Shri Ghantakarna Mahavir**
  devalaya; the mantra plaque also naming **Shri Shankheshwar Parshwanath**
- The donor towns on the pratishtha plaques: Kosamba, Vadodara, Dahegam
- The access note (main gate often shut, entry from the side street, ~11 steps)
  — reported by visitors in the Google reviews
- The nearby temples and their ratings, from "People also search for"

**Clearly marked as indicative — please replace:**

- **The daily schedule.** The listing publishes *no hours at all*. The times in
  `data.js` follow the customary Shwetambar Murtipujak routine and every page
  that shows them says so and asks the visitor to phone. Getting the real times
  from the Sangh and editing `schedule` in `data.js` is the single most valuable
  correction you can make.

**Deliberately left blank:**

- Trust name, trustees and office-bearers
- Year of pratishtha and the temple's founding history
- Calendar dates for the current year (the page gives tithis, which never change)
- Pathshala days and timings

`contact.html` asks for exactly these, item by item. Nothing has been invented
to fill the gaps.

**No payment details, on purpose.** The site collects no money and shows no
bank or UPI details, and `seva.html` warns readers not to trust payment details
found on a webpage. Contributions should go to the Sangh's own trust account,
given by the trustees.

## Images

All twelve photographs come from the derasar's public Google Business Profile —
owner-posted and visitor-contributed. They were downloaded at up to 2048px
(kept in `source-images/`) and re-encoded for the web. Copyright remains with
the photographers; one sanctum photograph carries its photographer's own
watermark, which has been left intact. `gallery.html` states this and invites
credit or removal requests.

Before this site goes live publicly, the Sangh should be happy with the images
used and with how they are credited.
