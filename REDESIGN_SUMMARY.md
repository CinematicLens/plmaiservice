# India SME website redesign — implementation notes

Static HTML site retargeted to manufacturing SMEs worldwide (20–200 employees).

## Framework
Static HTML/CSS/JS on GitHub Pages (`CNAME` = plmaiservice.com). No build toolchain.

## Links preserved
- DocRev Microsoft Store: `https://apps.microsoft.com/detail/9mxr3wlmq0g7?hl=en-US&gl=IN`
- LeanConsult App Store: `https://apps.apple.com/us/app/leanconsult-factory/id6794219819`
- YouTube: `https://www.youtube.com/@PLMSAPAISolutions`
- Sales: `sanjay@plmaiservice.com`
- Support: `teamcentersap@gmail.com`
- GA: `G-77043KQ3MP`

## Placeholders you must set
- `WHATSAPP_URL` in `assets/config.js` (e.g. `https://wa.me/91XXXXXXXXXX`) — WhatsApp CTAs stay hidden until set
- `FORM_ENDPOINT` — optional Formspree URL; until set, form uses mailto fallback
- `GST_INVOICE_AVAILABLE` — confirm before keeping GST claims on site
- Registered company / GSTIN / office address — intentionally not invented; ask sales for invoices

## Product status labels used
- BOM Compare / ERP Validator: B2B · Available for demo
- DocRev: Microsoft Store
- BAPI Guard / OrderRelease Guard: Pilot enquiries open
- LeanConsult: App Store
