(function(){
  const cfg = window.PLMOPS_CONFIG || {};
  const products = cfg.products || {};
  const path = (location.pathname.split("/").pop() || "index.html");
  const params = new URLSearchParams(location.search);
  const utmSource = (params.get("utm_source") || "").toLowerCase();
  const utmMedium = (params.get("utm_medium") || "").toLowerCase();
  const utmCampaign = params.get("utm_campaign") || "";
  const ASSET_V = "20260917noprice";

  function track(name, extra){
    const payload = Object.assign({
      page_path: location.pathname,
      page_title: document.title,
      utm_source: utmSource || undefined,
      utm_medium: utmMedium || undefined,
      utm_campaign: utmCampaign || undefined
    }, extra || {});
    if (typeof window.gtag === "function") {
      window.gtag("event", name, payload);
    }
    if (window.fbq) {
      window.fbq("trackCustom", name, payload);
    }
  }

  function isFacebookGroupUrl(url){
    if (!url || url.indexOf("[ADD") === 0) return false;
    if (url === "https://www.facebook.com/groups/feed/") return false;
    try {
      const u = new URL(url);
      return u.hostname.replace(/^www\./,"") === "facebook.com" &&
        /^\/groups\/(?!feed\/)[^/]+/.test(u.pathname);
    } catch (_) {
      return false;
    }
  }

  function withCid(baseUrl, cid){
    if (!baseUrl) return "";
    const u = new URL(baseUrl);
    if (cid) u.searchParams.set("cid", cid);
    return u.toString();
  }

  function campaignFor(product, fallback){
    if (utmCampaign && /^[a-z0-9_]+$/i.test(utmCampaign)) return utmCampaign;
    if (utmSource === "facebook") return product.campaignFacebook;
    if (utmSource === "instagram") return cfg.CAMPAIGN_IDS.instagram_bom_compare;
    if (utmSource === "linkedin") return cfg.CAMPAIGN_IDS.linkedin_bom_compare;
    if (utmSource === "youtube") return cfg.CAMPAIGN_IDS.youtube_bom_compare;
    return fallback;
  }

  function isAppleStore(product){
    return product && (product.storePlatform === "apple" || /apps\.apple\.com/i.test(product.storeUrl || ""));
  }

  function storeUrl(product, fallbackCampaign){
    if (!product || !product.storeReady || !product.storeUrl) return "";
    if (isAppleStore(product)) return product.storeUrl;
    return withCid(product.storeUrl, campaignFor(product, fallbackCampaign));
  }

  function demoUrl(product){
    return (product && product.demoUrl) || cfg.YOUTUBE_CHANNEL_URL;
  }

  function whatsappUrl(){
    const u = (cfg.WHATSAPP_URL || "").trim();
    if (!u || u.indexOf("[ADD") === 0) return "";
    try {
      const parsed = new URL(u);
      if (parsed.protocol !== "https:") return "";
      if (parsed.hostname !== "wa.me" && parsed.hostname !== "api.whatsapp.com" && parsed.hostname !== "www.whatsapp.com") return "";
      return u;
    } catch (_) {
      return "";
    }
  }

  function navHtml(){
    return (
      '<div class="nav-inner">' +
        '<a class="brand" href="index.html">PLM AI Services<small>Manufacturing data tools · Worldwide</small></a>' +
        '<button class="nav-toggle" type="button" aria-expanded="false" aria-controls="primary-nav">Menu</button>' +
        '<nav class="nav-links" id="primary-nav" aria-label="Primary">' +
          '<a data-nav href="products.html">Products</a>' +
          '<a data-nav href="solutions.html">Solutions</a>' +
          '<a data-nav href="demos.html">Demo Videos</a>' +
          '<a data-nav href="about.html">About</a>' +
          '<a data-nav href="contact.html">Contact</a>' +
        '</nav>' +
        '<div class="cta">' +
          '<a class="btn primary" href="contact.html#contact-form">Request Demo</a>' +
        '</div>' +
      '</div>'
    );
  }

  function footerHtml(){
    return (
      '<div class="container">' +
        '<div>' +
          '<strong>PLM AI Services</strong>' +
          '<p class="brand-blurb">BOM and ERP data tools for manufacturers worldwide—including the USA, India, Europe and other markets. Windows software for BOM compare, ERP migration validation and document revision control.</p>' +
          '<p class="brand-blurb">Sales &amp; support: use the <a href="contact.html#contact-form">demo request form</a>. We reply by email after you submit.</p>' +
        '</div>' +
        '<div>' +
          '<h2>Products</h2>' +
          '<ul>' +
            '<li><a href="bom-compare.html">BOM Compare Tool</a></li>' +
            '<li><a href="erp-migration-validator.html">ERP Migration Validator</a></li>' +
            '<li><a href="docrev-manager.html">DocRev Manager</a></li>' +
            '<li><a href="bapiload-guard.html">BAPI Guard</a></li>' +
            '<li><a href="order-release-guard.html">Release Guard</a></li>' +
            '<li><a href="leanconsult-factory.html">Lean Consult</a></li>' +
          '</ul>' +
        '</div>' +
        '<div>' +
          '<h2>Company</h2>' +
          '<ul>' +
            '<li><a href="about.html">About</a></li>' +
            '<li><a href="solutions.html">Solutions</a></li>' +
            '<li><a href="contact.html">Contact</a></li>' +
            '<li><a href="support.html">Support</a></li>' +
          '</ul>' +
        '</div>' +
        '<div>' +
          '<h2>Legal</h2>' +
          '<ul>' +
            '<li><a href="privacy.html">Privacy Policy</a></li>' +
            '<li><a href="terms.html">Terms of Use</a></li>' +
            '<li><a href="licence.html">Software Licence</a></li>' +
            '<li><a href="refund.html">Refund / Trial Policy</a></li>' +
          '</ul>' +
        '</div>' +
        '<div>' +
          '<h2>Resources</h2>' +
          '<ul>' +
            '<li><a href="demos.html">Demo Videos</a></li>' +
            '<li><a data-config="youtube" target="_blank" rel="noopener noreferrer">YouTube channel</a></li>' +
            '<li data-facebook-community hidden><a data-facebook-community>Join PLM SAP Tool Room</a></li>' +
          '</ul>' +
        '</div>' +
        '<div class="site-legal">© 2026 PLM AI Services. Independent software. Not affiliated with SAP SE, Microsoft or Apple. Invoice and tax details (including GST where applicable): confirm with sales before citing on purchase orders.</div>' +
      '</div>'
    );
  }

  function applyChrome(){
    const header = document.querySelector("header.nav");
    if (header) header.innerHTML = navHtml();
    const footer = document.querySelector("footer.footer");
    if (footer) footer.innerHTML = footerHtml();
  }

  function bindStoreButtons(){
    document.querySelectorAll("[data-store]").forEach(function(el){
      const key = el.getAttribute("data-store");
      const product = products[key];
      if (!product) return;
      const fallback = el.getAttribute("data-campaign") || product.campaignPage || "website_product_page";
      if (!product.storeReady || !product.storeUrl) {
        el.setAttribute("aria-disabled", "true");
        el.classList.add("is-disabled");
        el.removeAttribute("href");
        el.textContent = product.storeComingSoon || "Link coming soon";
        return;
      }
      el.href = storeUrl(product, fallback);
      el.target = "_blank";
      el.rel = "noopener noreferrer";
      el.addEventListener("click", function(){
        const storeEvent = isAppleStore(product) ? "click_app_store" : "click_microsoft_store";
        track(storeEvent, { product: product.id, store_platform: isAppleStore(product) ? "apple" : "microsoft" });
        track(product.storeEvent, { product: product.id });
        if (el.hasAttribute("data-trial")) track("click_trial", { product: product.id });
      });
    });
  }

  function bindDemoButtons(){
    document.querySelectorAll("[data-demo]").forEach(function(el){
      const key = el.getAttribute("data-demo");
      const product = key === "channel" ? null : products[key];
      const href = product ? demoUrl(product) : cfg.YOUTUBE_CHANNEL_URL;
      el.href = href;
      el.target = "_blank";
      el.rel = "noopener noreferrer";
      el.addEventListener("click", function(){
        track(product ? "click_product_demo" : "click_youtube_channel", product ? { product: product.id } : {});
      });
    });
  }

  function bindSupport(){
    document.querySelectorAll("[data-support]").forEach(function(el){
      el.addEventListener("click", function(){ track("click_support"); });
    });
  }

  function bindFacebook(){
    const valid = isFacebookGroupUrl(cfg.FACEBOOK_GROUP_URL);
    document.querySelectorAll("[data-facebook-community]").forEach(function(el){
      if (!valid) {
        el.hidden = true;
        return;
      }
      el.hidden = false;
      if (el.tagName === "A") {
        el.href = cfg.FACEBOOK_GROUP_URL;
        el.target = "_blank";
        el.rel = "noopener noreferrer";
        el.addEventListener("click", function(){ track("click_facebook_community"); });
      }
    });
  }

  function bindWhatsApp(){
    const url = whatsappUrl();
    document.querySelectorAll("[data-whatsapp]").forEach(function(el){
      if (!url) {
        el.hidden = true;
        return;
      }
      el.hidden = false;
      if (el.tagName === "A") {
        el.href = url;
        el.target = "_blank";
        el.rel = "noopener noreferrer";
        el.addEventListener("click", function(){ track("click_whatsapp"); });
      }
    });
  }

  function bindGstClaims(){
    const show = !!cfg.GST_INVOICE_AVAILABLE;
    document.querySelectorAll("[data-gst]").forEach(function(el){
      el.hidden = !show;
    });
  }

  function markNav(){
    document.querySelectorAll("[data-nav]").forEach(function(a){
      const href = a.getAttribute("href") || "";
      const file = href.split("#")[0];
      if (file && file === path) a.classList.add("active");
      if ((path === "index.html" || path === "") && href === "index.html") a.classList.add("active");
    });
  }

  function mobileNav(){
    const inner = document.querySelector(".nav-inner");
    const btn = document.querySelector(".nav-toggle");
    if (!inner || !btn) return;
    btn.addEventListener("click", function(){
      const open = inner.classList.toggle("is-open");
      btn.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  function initPixel(){
    const id = (cfg.META_PIXEL_ID || "").trim();
    if (!id) return;
    if (window.fbq) return;
    !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
    n.push=n;n.loaded=!0;n.version="2.0";n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window, document,"script","https://connect.facebook.net/en_US/fbevents.js");
    window.fbq("init", id);
    window.fbq("track", "PageView");
  }

  function pageViewEvents(){
    if (typeof window.gtag === "function") {
      window.gtag("event", "site_ping", { page_path: location.pathname, page_title: document.title });
    }
    const pageProduct = document.body.getAttribute("data-product");
    if (pageProduct && products[pageProduct]) {
      const p = products[pageProduct];
      track("view_product", { product: p.id });
      track(p.viewEvent, { product: p.id });
    }
  }

  function fillDynamicText(){
    document.querySelectorAll("[data-config]").forEach(function(el){
      const key = el.getAttribute("data-config");
      if (key === "youtube") el.href = cfg.YOUTUBE_CHANNEL_URL;
      if (key === "email" || key === "b2b-email") {
        const topic = el.getAttribute("data-subject") || el.getAttribute("data-topic") || "";
        el.href = "contact.html" + (topic ? ("?topic=" + encodeURIComponent(topic)) : "") + "#contact-form";
        if (!el.textContent.trim() || /@/.test(el.textContent)) {
          el.textContent = el.getAttribute("data-label") || "Request via form";
        }
      }
    });
  }

  function initBrowserTranslate(){
    if (document.getElementById("google_translate_element")) return;
    const inner = document.querySelector(".nav-inner");
    if (!inner) return;

    const wrap = document.createElement("div");
    wrap.className = "lang-switch";
    wrap.id = "google_translate_element";
    wrap.setAttribute("aria-label", "Translate this page");

    const toggle = inner.querySelector(".nav-toggle");
    const cta = inner.querySelector(".cta");
    if (toggle) inner.insertBefore(wrap, toggle);
    else if (cta) inner.insertBefore(wrap, cta);
    else inner.appendChild(wrap);

    window.googleTranslateElementInit = function(){
      if (!window.google || !google.translate || !google.translate.TranslateElement) return;
      new google.translate.TranslateElement({
        pageLanguage: "en",
        includedLanguages: "en,hi,ta,te,mr,bn,gu,kn,pa,de,fr,es,pt,zh-CN,ja,ar,it,nl,ko,ru",
        layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
        autoDisplay: false
      }, "google_translate_element");
    };

    const s = document.createElement("script");
    s.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    s.async = true;
    document.head.appendChild(s);
  }

  function showFieldError(input, message){
    if (!input) return;
    input.classList.add("is-invalid");
    input.setAttribute("aria-invalid", "true");
    let err = input.parentElement && input.parentElement.querySelector(".field-error");
    if (!err) {
      err = document.createElement("div");
      err.className = "field-error";
      err.id = (input.id || input.name || "field") + "-error";
      if (input.parentElement) input.parentElement.appendChild(err);
    }
    err.textContent = message;
    err.classList.add("is-visible");
    input.setAttribute("aria-describedby", err.id);
  }

  function clearFieldErrors(form){
    form.querySelectorAll(".is-invalid").forEach(function(el){
      el.classList.remove("is-invalid");
      el.removeAttribute("aria-invalid");
    });
    form.querySelectorAll(".field-error").forEach(function(el){
      el.classList.remove("is-visible");
      el.textContent = "";
    });
  }

  function validateEmail(v){
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
  }

  function validatePhone(v){
    const digits = v.replace(/\D/g, "");
    return digits.length >= 10 && digits.length <= 15;
  }

  function initContactForm(){
    const contactForm = document.querySelector("#contactForm");
    if (!contactForm) return;
    const status = document.querySelector("#contactFormStatus");
    const btn = document.querySelector("#contactSubmitBtn");
    const success = document.querySelector("#contactFormSuccess");
    const endpoint = (cfg.FORM_ENDPOINT || "").trim();
    if (btn) btn.textContent = "Submit request";

    contactForm.addEventListener("submit", async function(e){
      e.preventDefault();
      clearFieldErrors(contactForm);
      const fd = new FormData(contactForm);
      const name = (fd.get("name") || "").toString().trim();
      const company = (fd.get("company") || "").toString().trim();
      const email = (fd.get("email") || "").toString().trim();
      const phone = (fd.get("phone") || "").toString().trim();
      const city = (fd.get("city") || "").toString().trim();
      const topic = (fd.get("topic") || fd.get("product") || "").toString().trim();
      const message = (fd.get("message") || fd.get("problem") || "").toString().trim();
      const consent = fd.get("consent");

      let ok = true;
      const nameEl = contactForm.querySelector("[name=name]");
      const companyEl = contactForm.querySelector("[name=company]");
      const emailEl = contactForm.querySelector("[name=email]");
      const phoneEl = contactForm.querySelector("[name=phone]");
      const cityEl = contactForm.querySelector("[name=city]");
      const topicEl = contactForm.querySelector("[name=topic], [name=product]");
      const messageEl = contactForm.querySelector("[name=message], [name=problem]");
      const consentEl = contactForm.querySelector("[name=consent]");

      if (!name) { showFieldError(nameEl, "Please enter your name."); ok = false; }
      if (!company) { showFieldError(companyEl, "Please enter your company name."); ok = false; }
      if (!email || !validateEmail(email)) { showFieldError(emailEl, "Enter a valid work email address."); ok = false; }
      if (phoneEl && phoneEl.hasAttribute("required") && (!phone || !validatePhone(phone))) {
        showFieldError(phoneEl, "Enter a valid phone or WhatsApp number (10–15 digits)."); ok = false;
      }
      if (cityEl && cityEl.hasAttribute("required") && !city) {
        showFieldError(cityEl, "Please enter your city."); ok = false;
      }
      if (!topic) { showFieldError(topicEl, "Select a product of interest."); ok = false; }
      if (!message) { showFieldError(messageEl, "Briefly describe your current problem."); ok = false; }
      if (consentEl && !consent) { showFieldError(consentEl, "Consent is required to contact you."); ok = false; }
      if (!ok) {
        if (status) status.textContent = "Please correct the highlighted fields.";
        const firstInvalid = contactForm.querySelector(".is-invalid");
        if (firstInvalid) firstInvalid.focus();
        return;
      }

      if (!endpoint) {
        if (status) {
          status.textContent = "Form delivery is not configured yet. Set FORM_ENDPOINT in assets/config.js (Formspree or similar). Mail apps are not opened from this site.";
        }
        track("click_demo_request", { topic: topic || "general", delivery: "blocked_no_endpoint" });
        return;
      }

      if (btn) btn.disabled = true;
      if (status) status.textContent = "Sending…";
      try {
        const res = await fetch(endpoint, { method:"POST", body: fd, headers:{ Accept:"application/json" }});
        if (!res.ok) throw new Error("fail");
        contactForm.reset();
        contactForm.classList.add("is-sent");
        if (status) status.textContent = "";
        if (success) {
          success.classList.add("is-visible");
          success.textContent = "Thank you. We will contact you shortly about your demo request.";
        }
        track("click_demo_request", { topic: topic || "general", delivery: "form" });
      } catch (_) {
        if (status) status.textContent = "Could not send. Please try again in a few minutes, or use the form later.";
      } finally {
        if (btn) btn.disabled = false;
      }
    });
  }

  applyChrome();
  initPixel();
  markNav();
  mobileNav();
  bindStoreButtons();
  bindDemoButtons();
  bindSupport();
  bindFacebook();
  bindWhatsApp();
  bindGstClaims();
  fillDynamicText();
  pageViewEvents();
  initBrowserTranslate();
  initContactForm();

  (function prefillContactTopic(){
    const sel = document.querySelector("#contactTopic");
    if (!sel) return;
    const topic = params.get("topic");
    if (!topic) return;
    const match = Array.prototype.find.call(sel.options, function(opt){
      return opt.value.toLowerCase() === topic.toLowerCase() ||
        opt.value.toLowerCase().indexOf(topic.toLowerCase()) >= 0;
    });
    if (match) sel.value = match.value;
    else {
      const opt = document.createElement("option");
      opt.value = topic;
      opt.textContent = topic;
      opt.selected = true;
      sel.appendChild(opt);
    }
  })();

  void ASSET_V;
})();
