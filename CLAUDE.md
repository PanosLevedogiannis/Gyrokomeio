# Gyrokomeio: website for Γυροκομείο Grill, Nafplio

You are continuing a build started in claude.ai. Read this whole file first.
This file is committed to the PRIVATE repo so the user's partner (a collaborator) can read it.
If the repo is ever made public, take this file out of git first (add it back to .gitignore).
Talk to the user in whatever language he writes (Greek or English), casual and short.
He likes hands-on iteration and dislikes over-engineering: small steps, show results.

## The job

A professional bilingual website (Greek default, English switch) for Γυροκομείο Grill,
a souvlaki and grill house (ψητοπωλείο) in Nafplio. Mobile and desktop.
Plain HTML/CSS/JS, no framework, no build step. Then push it to a new GitHub repo
named `Gyrokomeio` and host it on GitHub Pages.

User's choices: extras = Wolt & efood order buttons, Google reviews section,
daily dishes/offers, contact form. Menu WITHOUT prices. Design: "you pick" (plan below).
New photos are being taken in a few days, so every photo spot is a slot that fills
itself when the file appears in /images.

## Facts (checked, with sources)

- Address: Σιδηράς Μεραρχίας 5, Ναύπλιο 211 00 (confirmed by the user 2026-09-24; Google agrees;
  the old site said 11 & Πολυζωίδου). Near
  Πλατεία Καποδίστρια; in summer the tables go out on the square across the street.
  Sources: https://gyrokomeio.gr/en/ , https://www.discovernafplio.gr/en/listings/fast-food/gyro-komeio
- Phone +30 27520 23600.
- Email: the old site links gyrokomeio.grill@gmail.com but displays gyrokomeiogrill2011@gmail.com. Using the first until confirmed.
- Hours: every day 12:00 to 01:00 (their own site; some listings say 11:00 to 02:00). Open all year.
- Opened July 2011. In the first week they gave souvlaki away free so customers could
  pick the meat supplier. The name is a pun: γύρος + γηροκομείο (retirement home).
- Delivery in and outside Nafplio with a minimum order, take away, dine-in.
- Links: Wolt https://wolt.com/el/grc/nafplio/restaurant/gyrokomio-pol ,
  efood https://www.e-food.gr/delivery/nauplio/gyrokomeio ,
  Facebook https://www.facebook.com/GyrokomeioGrill/ ,
  Google Maps https://maps.app.goo.gl/kaYg6ebHEtypM1dn9 ,
  Google profile (from the user) https://share.google/NvQU7HK44YbP8tMDU
- Menu: their PDF https://gyrokomeio.gr/wp-content/uploads/2024/03/gyrokomeio-menu.pdf ,
  already transcribed into js/menu.js. Quality notes from it: local extra virgin olive oil,
  PDO feta, starters made daily, fresh potatoes peeled in the shop daily, handmade 110 g skewers.
- The current site gyrokomeio.gr is WordPress/Elementor by Kinisis Web. Don't touch it.
  Don't link Tripadvisor.
- Logo: images/logo.webp (multicolour letters on a white circle, from their old site).

Confirm with the owner before launch: the email, the hours, any mobile number, the
'veg' tags, the pita types (Wolt lists traditional/corn/whole wheat, the PDF rye/corn),
and whether they like the "golden years" pun line in the story.

## Status

Done:
- index.html: all markup, Greek text, data-i18n keys, SVG icon sprite, dialogs, JSON-LD.
- js/config.js: contact info, hours, links, photo slots, specials[], reviews[], showPlaceholders.
- js/menu.js: 13 categories, 107 items, Greek + English, tags.
- js/i18n.js: all English text (every data-i18n key in index.html is covered) and the
  strings main.js builds, in both languages.
- fonts/ + css/_fonts.css: self-hosted Sofia Sans and Sofia Sans Extra Condensed, Greek + Latin.
  No request to Google Fonts ever (GDPR).
- images/: logo.webp, logo.png, favicons, README.md (shot list, in Greek).

Also done (2026-09-24, Claude Code): css/style.css (fonts pasted in, _fonts.css deleted),
js/main.js (all 10 points of the spec), images/og-image.png, README.md (Greek, with the
go-live checklist), .nojekyll. QA passed at 390x844 and 1440x900, el/en, light/dark:
no sideways scroll, no JS errors (only 404s for photos not taken yet), Lighthouse
a11y 100, SEO 100, perf 95-100. Gallery uses HEAD requests to see which photos exist.

GitHub: repo https://github.com/PanosLevedogiannis/Gyrokomeio is PRIVATE (user's choice),
so NO GitHub Pages yet. gh CLI is not installed; the repo was created in Chrome, and git
push over HTTPS works with the macOS keychain. og:image is relative (no live domain yet).
Next: when the user wants it online, make the repo public and enable Pages (or other hosting),
then set og:image to the absolute URL.

## Design plan

Concept: «Με όλα;» ("with everything?"), the question every Greek souvlaki counter asks.
The logo's multicoloured letters read like ingredients, so those colours carry meaning
on a clean white wrap-paper base.

UPDATE 2026-09-24: the user picked the OLIVE palette (cream #F8F5EC, dark olive ink #26301A,
terracotta buttons #B5452B, olive hero panel #5B6E2F, deep olive bands #2F3B1F). The live values
are the tokens at the top of css/style.css (--fill, --accent, --deep, --hero-panel, --story-*, ...).
The ingredient colours below (tomato, onion, teal, gold, mint) still come from the logo.
The user disliked the blurred colour blobs; the hero now has a "wrap paper" doodle pattern.
Order band = dark tiles in Wolt (#00C2E8, text #00384A) and efood (#E02424) colours.
Google profile: 4,1 stars from 5.248 reviews (Sept 2026); it lists the address as
Σιδηράς Μεραρχίας 5: the user confirmed 5, now used everywhere. The map is now always shown
(user's request), lazy-loaded; the privacy text says Google may receive data when it loads.

REDESIGN 2026-09-24 ("Ο πάγκος", the counter), on the user's request, following the
artifact-design skill: hero = wrap paper + counter dialogue («— Μια πίτα γύρο, παρακαλώ.» then
«Με όλα;»); the marquee is now a dot-matrix LED sign (amber #F2B632); the menu is the lit menu
board (dark olive --board #1F2714, amber selected tab); order section back on paper (--soft) with
the platform tiles; the story "2011" panel is lit like the LED sign; reviews are order tickets
(torn bottom edge, slight tilt). Terracotta only on the primary buttons; accents are olive.
Radii 8/10/6. Scroll motion never hides content (transform-only "settle").

TASTE PASS 2026-09-24: the user asked to apply taste-skill + redesign-skill
(github.com/Leonxlnx/taste-skill, read from GitHub, not installed). Applied: zero em/en dashes
anywhere (the skill bans them), Phosphor icons 2.1 (MIT) replaced the hand-drawn sprite,
olive-tinted neutrals (paper #F2F2EA, soft #E6E8DA) instead of AI-cream, one brick accent #A93A28,
no glows / floats / flicker, doodle pattern removed (paper grain + a soft block behind the hero
photo instead), live status replaces the hero kicker (brand kept visually hidden in the H1),
hero = one filled CTA (Παράγγειλε) + text link, one label per intent ("Παράγγειλε" everywhere),
the LED sign sits on top of the menu board (one dark block), phone tile leads the order grid,
reviews are ≤3-line excerpts in a masonry wall of tickets with "Κριτική στο Google, <month>",
menu tags are square text labels (no coloured dots), header uses an IntersectionObserver
(no scroll listener), nav marks the current section, 404.html added.

ILLUSTRATIONS 2026-09-24: the user sent a stock-style "Greek Pita Gyros" vector as a reference and
asked for similar things as background. Original flat illustrations were drawn for the site
(SVG symbols il-gyros, il-skewer, il-tomato, il-onion, il-fries, il-lemon, il-pepper, il-leaf in
index.html), placed behind the hero (.hero-deco) and in the order section (.order-deco), with a
short pop-in after the ingredients. The reference image itself was NOT used (unknown licence).

INTERACTIVE FOOD 2026-09-24: illustrations redrawn with gradients/shine/grain (defs g-*, f-grain,
extra symbol il-fry). Markup: .deco > .deco-inner > svg, data-depth per piece. main.js setupFood():
fly-in from «Με όλα;» (WAAPI, composite add), CSS bob float, pointer parallax + spring physics
(rAF only while moving), mouse/pen drag-and-throw with spring return, tap/click = hop, click on
«Με όλα;» = burst of 24 ingredient sparks with gravity. All off under prefers-reduced-motion.

CACHE: css/js links carry ?v=<version> (index.html + 404.html). Bump it whenever css/ or js/
changes: the preview browser once served a stale config.js (showed the old address 11).

Original palette (light / dark):
- paper #FFFFFF / #1B1012, soft #F4F3F3 / #251719, line #E6E0E0 / #3A2729
- ink #2B1316 (logo oxblood) / #F6EEEC, ink-soft #6D5A5C / #C2B1B2
- tomato #D0151C / #FF4A50, onion #4E0A5C / #C58AE6, teal #007C7B / #3CC2BD
- gold #A87A00 for text, #E2B21C for fills / #F2C230, mint #4F7A2E / #86B95E
Theme follows prefers-color-scheme; also honour :root[data-theme="dark"|"light"].

Type: 'Sofia Sans Extra Condensed' 800 to 900 for display (hero phrase, section titles),
'Sofia Sans' 400 to 700 for everything else. Paste css/_fonts.css at the top of style.css,
then delete it. Headings in sentence case.

Hero, the one bold moment:
- H1 = small kicker + huge «Με όλα;». The phrase stays Greek in both languages (lang="el"),
  clamp(5rem, 22vw, 12rem), line-height about .85.
- Under it the ingredient list, inline, "+" between items via ::before, each word in its
  colour: tomato, onion, teal (tzatziki), gold (fries); condensed 800, about clamp(1.6rem, 5vw, 2.6rem).
- The only page-load animation on the site: the ingredients pop in (fade + 0.3em rise),
  staggered by var(--i) × 110 ms after 250 ms. Replay on language switch.
  No animation with prefers-reduced-motion.
- Right column (≥960px, grid 7fr/5fr): photo frame 4:5 (1:1 on mobile), radius 18px,
  hard offset shadow 10px 10px 0 teal; the round logo as a sticker, 120px, rotated −8°,
  overlapping the bottom-left corner with a soft drop shadow.
  No photo yet: tomato panel with the big logo centred, sticker hidden.

Everything else stays quiet: left-aligned, generous whitespace, few cards.
- Quick strip: 4 cells (hours + live status, address + Directions, phone, delivery + Order),
  icons, thin dividers, 2×2 on mobile.
- Specials: grid of cards, minmax(260px, 1fr): optional 4:3 photo, tag, title, text, "until".
  Empty: a soft panel with specials.empty and a call button.
- Menu: chip tabs (radius 999px), horizontally scrollable, sticky under the header.
  Panel in 2 columns ≥900px; rows with a dotted bottom border; name 1.125rem/700;
  description in ink-soft; tags as small text with a coloured dot (veg mint, home teal,
  share onion, house tomato). In English, show the Greek name small under the English one
  (lang="el") so tourists can order. The 'extras' category (compact: true) renders as
  inline chips. Category note above the items; legend and allergens line under the panel.
- Order band: full-bleed tomato, white text, display title, light buttons (call, Wolt, efood).
- Story: photo slot 4:3 + text; the kitchen facts as a list with small mint square bullets.
- Photos: grid, 4 columns desktop / 2 mobile, auto-rows about 180px; 'tall' spans 2 rows,
  'wide' spans 2 columns; lightbox.
- Reviews: cards in 3 columns, gold stars, name, date; the two buttons below.
- Contact: map box 16:10 (soft background, subtle dot pattern, pin, address,
  Directions + Show map) with the details list under it; the form on the right.
- Footer: ink background, white text, 4 columns, stacked on mobile.
- Header: sticky, white, hairline border once scrolled, desktop nav. Under 960px: the menu
  button toggles #mobile-nav, and a fixed bottom action bar (Call, Directions, Order) with
  safe-area padding. Give body bottom padding so the bar never covers content.
- Radii: buttons 12px, chips 999px, cards 16px, photos 18px.
  Focus: 3px teal outline, offset 2px.
- Avoid: ALL-CAPS eyebrow labels, "A · B · C" strings, "→" in buttons, stats bands,
  fade-in on every section, the same grey shadow on everything.

CSS also needs: .sprite (hidden SVG sprite), .skip (skip link), .hp (honeypot, hidden),
.i18n-pending [data-i18n] { visibility: hidden }, .icon (1.25em, stroke currentColor,
fill none, stroke-width 2, round caps and joins; paths with class "fill" are filled),
and safe areas (the viewport meta already has viewport-fit=cover).

## main.js spec

1. i18n: on load, cache the Greek innerHTML of every [data-i18n] and the Greek attributes of
   every [data-i18n-attr] (format "attr=key;attr2=key2"). setLang(l) swaps to I18N.en or back
   to the cache; sets html lang and data-lang, aria-pressed on [data-set-lang], document.title
   and meta description (I18N.js 'meta.*'), the menu button label; updates the URL
   (?lang=en, nothing for Greek) with history.replaceState; saves 'gk-lang' in localStorage
   inside try/catch; re-renders the dynamic parts; replays the ingredient animation;
   removes .i18n-pending. The <head> script already picks the first language.
2. Fill from SITE: [data-tel] href and [data-tel-text], [data-email], [data-address],
   [data-directions], [data-wolt] (by language), [data-efood], [data-google-reviews],
   [data-google-write] (hide when empty), [data-social] (Facebook/Instagram text links,
   hide [data-social-row] when none), [data-phones] (all phones with labels), [data-year].
3. Hours and status in Europe/Athens time (Intl.DateTimeFormat formatToParts), including
   closing after midnight (check yesterday's window too). [data-hours-short] uses
   hours.everyDay when all days match, otherwise a short per-day list. Status goes to
   [data-status] (hero; .is-open green dot / .is-closed grey) and [data-status-text];
   texts are status.*, and "soon" means the last 30 minutes. Refresh every 60 s.
4. Photo slots ([data-photo] and the gallery): create the <img>; onload adds .is-loaded,
   onerror adds .is-missing. With SITE.showPlaceholders: show a placeholder (camera icon,
   photo.slot and photo.file). Without: hide missing gallery items, and if none are left hide
   #photos and its nav links. Hero and story fall back to the designed panel. Loaded gallery
   photos are buttons that open the lightbox (prev/next, arrow keys, caption = alt).
5. Menu: tabs and panels from MENU with real tab semantics (roving tabindex, arrows,
   Home/End). Keep the active tab across language switches.
6. Specials: skip items whose `until` is before today (Athens date), render cards. Empty:
   the empty-state panel, plus 2 ghost cards when showPlaceholders.
7. Reviews: cards with 5 star icons (filled/empty) and aria-label from reviews.stars.
   Empty + showPlaceholders: 3 ghost cards. Empty otherwise: only the buttons.
8. Map: [data-load-map] swaps .map-cover for an iframe (SITE.map.embed, a title,
   loading=lazy). Nothing from Google loads before that click.
9. Dialogs: [data-open-order] opens #order-sheet with showModal(), [data-open-privacy]
   opens #privacy, [data-close] closes, a click on the backdrop closes. The mobile nav closes
   on link click, Esc, or resize to ≥960px. The header gets .is-scrolled after 8px.
10. Form: novalidate; name, contact and message required, with the inline [data-error-for]
    messages and aria-invalid. A filled honeypot pretends success. With
    SITE.contactForm.endpoint: POST JSON (name, contact, topic label, message, _subject from
    form.subject, _template 'table', _captcha 'false') with Accept: application/json.
    Success: form.sent and reset. Failure: form.failed plus a mailto link (form.mailtoLink)
    with the message prefilled. No endpoint: open mailto and show form.mailto.

## QA

Serve it (python3 -m http.server) and check with Playwright at 390×844 and 1440×900,
Greek and English, light and dark: no sideways scroll, no console errors, the action bar
never covers content, visible keyboard focus, reduced motion respected, Lighthouse
accessibility 95+. Show the user screenshots.

## GitHub

- git init -b main, commit, then
  `gh repo create Gyrokomeio --public --source=. --remote=origin --push`
- Enable Pages from main / root:
  `gh api -X POST repos/{owner}/Gyrokomeio/pages -f "source[branch]=main" -f "source[path]=/"`
- Pages on a free plan needs a public repo. Ask the user if he'd rather keep it private.
- Do NOT add a CNAME yet: gyrokomeio.gr still serves the old site, and a CNAME would
  redirect the github.io address there. Keep all asset paths relative (the site lives
  under /Gyrokomeio/).

## Before going live (put this checklist in README.md)

- showPlaceholders: false
- photos in /images (see images/README.md)
- 3 to 6 real Google reviews in js/config.js
- send one test message through the form and click FormSubmit's activation email
- og-image.png 1200×630 (tomato background, logo, «Με όλα;», "Γυροκομείο Grill, Ναύπλιο"),
  and make og:image an absolute URL once the final domain is known
- switch gyrokomeio.gr (CNAME + DNS) only when the owner decides
