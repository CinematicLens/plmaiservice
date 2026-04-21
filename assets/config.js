// Contact & portal form delivery (Formspree recommended — inbox is not exposed on the site).
//
// 1) Create a free form at https://formspree.io (use the same inbox you want to receive mail).
// 2) Copy the form URL (looks like https://formspree.io/f/xxxxxxxx).
// 3) Paste it below as FORM_ENDPOINT.
//
// Until FORM_ENDPOINT is set, the Contact page form will show a short setup message (no email shown on the site).
// Portal intake can still fall back to mailto using TO_EMAIL when FORM_ENDPOINT is empty.
//
window.PLMOPS_CONFIG = {
  FORM_ENDPOINT: "",
  TO_EMAIL: "teamcentersap@gmail.com"
};
