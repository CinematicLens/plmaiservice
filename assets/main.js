(function(){
  const path = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('[data-nav]').forEach(a=>{
    if(a.getAttribute('href') === path) a.classList.add('active');
  });

  // Portal form handler
  const form = document.querySelector('#requestForm');
  if(!form) return;

  const cfg = window.PLMOPS_CONFIG || {};
  const endpoint = cfg.FORM_ENDPOINT || ''; // optional (e.g., Formspree/Netlify function)
  const toEmail = cfg.TO_EMAIL || 'teamcentersap@gmail.com';

  form.addEventListener('submit', async (e)=>{
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form).entries());
    const status = document.querySelector('#formStatus');
    const btn = document.querySelector('#submitBtn');
    btn.disabled = true;
    status.textContent = 'Submitting...';

    // If an endpoint is configured, POST JSON there.
    if(endpoint){
      try{
        const res = await fetch(endpoint, {
          method:'POST',
          headers:{'Content-Type':'application/json'},
          body: JSON.stringify(data)
        });
        if(!res.ok) throw new Error('Request failed');
        form.reset();
        status.textContent = '✅ Submitted. We will contact you shortly.';
      }catch(err){
        status.textContent = '❌ Could not submit. Falling back to email draft...';
        openMailto(toEmail, data);
      }finally{
        btn.disabled = false;
      }
      return;
    }

    // No backend: open mailto draft
    openMailto(toEmail, data);
    status.textContent = '✅ Email draft opened. Please click Send in your email app.';
    btn.disabled = false;
  });

  function openMailto(to, data){
    const subject = `[PLM Ops] ${data.serviceArea || 'Service Request'} – ${data.problemType || 'General'}`;
    const body =
`Service Area: ${data.serviceArea || '-'}
Problem Type: ${data.problemType || '-'}

Customer Email: ${data.email || '-'}

Details:
${data.message || ''}

---
Sent from PLM Ops Studio portal`;
    const url = `mailto:${encodeURIComponent(to)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = url;
  }
})();
