PLM Ops Studio – Static HTML Site (No database)

How it works
- These are plain static HTML pages (no Next.js, no Supabase).
- The Client Portal form (portal.html) by default opens an email draft to teamcentersap@gmail.com.
- If you later want true "submit without email client", set assets/config.js FORM_ENDPOINT to Formspree/Netlify.

Run locally
- Double click index.html
OR
- Use a simple server (recommended for fetch):
  python -m http.server 3000
  then open http://localhost:3000

Free publishing options
1) GitHub Pages:
   - Create a repo, upload these files, enable Settings → Pages → Deploy from branch.
2) Cloudflare Pages:
   - Connect repo, build command: none, output folder: / (root).
3) Netlify:
   - Drag-and-drop this folder in Netlify dashboard.

Note on email
- mailto depends on the visitor's email client.
- For reliable email delivery on hosted sites, use a form endpoint (Formspree/Netlify forms) or a small serverless function.
