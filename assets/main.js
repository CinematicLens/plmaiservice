(function(){
  const path = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('[data-nav]').forEach(a=>{
    if(a.getAttribute('href') === path) a.classList.add('active');
  });

  if (typeof window.gtag === 'function') {
    window.gtag('event', 'site_ping', {
      page_path: location.pathname,
      page_title: document.title
    });
  }

  const cfg = window.PLMOPS_CONFIG || {};
  const endpoint = (cfg.FORM_ENDPOINT || '').trim();
  const toEmail = cfg.TO_EMAIL || 'teamcentersap@gmail.com';

  async function postFormData(url, form){
    const res = await fetch(url, {
      method: 'POST',
      body: new FormData(form),
      headers: { Accept: 'application/json' }
    });
    let data = null;
    try { data = await res.json(); } catch (_) { /* non-JSON */ }
    if (!res.ok) {
      const msg = (data && (data.error || data.message)) || res.statusText || 'Request failed';
      throw new Error(msg);
    }
    return data;
  }

  // Contact page: secure message form (no public inbox on the page)
  const contactForm = document.querySelector('#contactForm');
  if (contactForm) {
    const status = document.querySelector('#contactFormStatus');
    const btn = document.querySelector('#contactSubmitBtn');
    contactForm.addEventListener('submit', async (e)=>{
      e.preventDefault();
      if (!endpoint) {
        if (status) {
          status.textContent = 'Form delivery is not configured yet. In assets/config.js set FORM_ENDPOINT to your Formspree form URL (free at formspree.io).';
        }
        return;
      }
      btn.disabled = true;
      if (status) status.textContent = 'Sending…';
      try {
        await postFormData(endpoint, contactForm);
        contactForm.reset();
        if (status) status.textContent = 'Thank you. We will get back to you shortly.';
      } catch (err) {
        if (status) status.textContent = 'Could not send. Check FORM_ENDPOINT in assets/config.js or try again later.';
      } finally {
        btn.disabled = false;
      }
    });
  }

  // Portal: detailed intake (optional Formspree / same endpoint)
  const portalForm = document.querySelector('#requestForm');
  if (portalForm) {
    const status = document.querySelector('#formStatus');
    const btn = document.querySelector('#submitBtn');

    portalForm.addEventListener('submit', async (e)=>{
      e.preventDefault();
      const data = Object.fromEntries(new FormData(portalForm).entries());
      btn.disabled = true;
      if (status) status.textContent = 'Submitting...';

      if (endpoint) {
        try {
          await postFormData(endpoint, portalForm);
          portalForm.reset();
          if (status) status.textContent = 'Submitted. We will contact you shortly.';
        } catch (err) {
          if (status) status.textContent = 'Could not submit online. Opening email draft…';
          openMailto(toEmail, data);
        } finally {
          btn.disabled = false;
        }
        return;
      }

      openMailto(toEmail, data);
      if (status) status.textContent = 'Email draft opened. Please click Send in your email app.';
      btn.disabled = false;
    });
  }

  function openMailto(to, data){
    const subject = `[PLM Ops] ${data.requestType || data.serviceArea || 'Service Request'} – ${data.summary || data.problemType || 'General'}`;
    const body =
`Request Type: ${data.requestType || '-'}
Severity: ${data.severity || '-'}
Service Area: ${data.serviceArea || '-'}
Problem Type: ${data.problemType || '-'}

Environment: ${data.environment || '-'}
OS / Platform: ${data.platform || '-'}
Teamcenter Version: ${data.tcVersion || '-'}
AWC Version: ${data.awcVersion || '-'}
T4x Version: ${data.t4xVersion || '-'}
Module / Area: ${data.moduleArea || '-'}

Customer Email: ${data.email || '-'}
Phone / WhatsApp: ${data.phone || '-'}

Summary:
${data.summary || '-'}

Details:
${data.message || ''}

Business Impact: ${data.impact || '-'}
Preferred Response Window: ${data.responseWindow || '-'}

Consent: ${data.consent ? 'Yes' : 'No'}

---
Sent from PLM AI Services portal`;
    const url = `mailto:${encodeURIComponent(to)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = url;
  }
})();
