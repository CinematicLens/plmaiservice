PLM AI Services – static product website (GitHub Pages)

Primary audience: manufacturing SMEs worldwide (approx. 20–200 employees)
Primary message: Affordable BOM and ERP Data Tools for Manufacturers Worldwide

Products (priority)
1. BOM Compare Tool — B2B demo
2. ERP Migration File Validator — B2B demo
3. DocRev Manager — Microsoft Store
4. BAPILoad Guard — Pilot enquiries
Also: OrderRelease Guard (pilot), LeanConsult Factory (App Store)

Run locally
- python -m http.server 3000
- open http://localhost:3000

Configuration (assets/config.js)
- FORM_ENDPOINT — optional Formspree URL for the contact form
- WHATSAPP_URL — optional https://wa.me/91XXXXXXXXXX (hidden until set)
- GST_INVOICE_AVAILABLE — set true only if you can issue GST invoices
- B2B_EMAIL / SUPPORT_EMAIL / store URLs / YouTube channel

Contact form
- With FORM_ENDPOINT empty, submit opens mailto to B2B_EMAIL with validated fields.
