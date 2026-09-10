# Website redesign summary

Product-first Windows software site for PLM AI Services. Nothing has been committed or pushed.

## Files created

- `index.html` (replaced) — product landing page, no redirects
- `products.html` (replaced) — three-product overview and comparison
- `bom-compare.html`
- `docrev-manager.html`
- `erp-migration-validator.html`
- `support.html`
- `privacy.html`
- `terms.html`
- `404.html`
- `robots.txt`
- `sitemap.xml`
- `assets/site.js`
- `assets/img/bom-compare-placeholder.svg`
- `assets/img/docrev-manager-placeholder.svg`
- `assets/img/erp-validator-placeholder.svg`
- `assets/og/home.png`
- `assets/og/bom-compare.png`
- `assets/og/docrev-manager.png`
- `assets/og/erp-migration-validator.png`
- `REDESIGN_SUMMARY.md`

## Files modified

- `assets/config.js` — products, Store URLs, campaign IDs, YouTube, Facebook placeholder, GA, optional Meta Pixel
- `assets/styles.css` — light Windows software aesthetic
- `assets/main.js` — stub; runtime is `site.js`
- `about.html` — company identity, products only
- `contact.html` — product questions only (no Teamcenter/portal intake)

## Services pages removed (not committed)

Deleted from the working tree: `services.html`, `industries.html`, `delivery.html`, `agents.html`, `portal.html`, `trust.html`, `plm-ops.html`, `ios-products.html`. Nav, footer, sitemap, contact topics and portal JS no longer point at them.

## Content moved

- Windows product claims that were on the old homepage are expanded on dedicated product pages. Consulting/services pages are gone, not relocated.

## Missing product facts

- BOM Compare and DocRev: confirmed Excel/CSV/other input formats
- BOM Compare and DocRev: local vs network data processing
- BOM Compare and DocRev: detailed Windows version requirements
- BOM Compare: EBOM/MBOM-specific modes
- DocRev: CAD/PDF integrations
- ERP Validator: paid-edition list price; SAP material-master template (not claimed; built-in profile is fictional Generic Material Catalog)

## Missing Store URLs

- ERP Migration File Validator — no verified Microsoft Store ID. Store CTAs are disabled and show “Microsoft Store link coming soon.” Set `products.erp.storeUrl` and `storeReady: true` in `assets/config.js` when available.

## Missing screenshots

Replace placeholder SVGs and 1200×630 OG PNGs (marked `[ADD SCREENSHOT]`) with approved captures:

- `assets/img/bom-compare-placeholder.svg`
- `assets/img/docrev-manager-placeholder.svg`
- `assets/img/erp-validator-placeholder.svg`
- `assets/og/*.png`

## Missing demo URLs

All three demo cards currently open `https://www.youtube.com/@PLMSAPAISolutions`. Set `products.*.demoUrl` in `assets/config.js` to individual watch URLs when published. Do not autoplay.

## Required analytics IDs

- Google Analytics: `G-77043KQ3MP` (already on pages)
- Meta Pixel: empty `META_PIXEL_ID` in `assets/config.js` — site works without it

## Required Facebook group URL

- Placeholder: `[ADD_DIRECT_FACEBOOK_GROUP_URL]`
- Do not use `https://www.facebook.com/groups/feed/`
- After a direct `facebook.com/groups/{id-or-slug}` URL is set, the site shows “Join PLM SAP Tool Room”

## Recommended next actions

1. Review the local site (homepage, three product pages, comparison table, support).
2. Supply Store URL for ERP Migration File Validator.
3. Supply prices and trial durations for BOM Compare and DocRev.
4. Drop genuine screenshots and per-product YouTube video IDs into `assets/config.js`.
5. Confirm BOM/DocRev formats and local-processing statements.
6. Add the Facebook group URL.
7. Commit only after this review.
