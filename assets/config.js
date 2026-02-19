// Optional config for form submission.
// If you don't have a backend, leave FORM_ENDPOINT empty and the portal will open a mailto draft.
//
// Example (Formspree):
// window.PLMOPS_CONFIG = { FORM_ENDPOINT: "https://formspree.io/f/xxxxxxx", TO_EMAIL: "teamcentersap@gmail.com" };
//
// Example (Netlify Forms + function): set FORM_ENDPOINT to your deployed function URL.
window.PLMOPS_CONFIG = {
  FORM_ENDPOINT: "",
  TO_EMAIL: "teamcentersap@gmail.com"
};
