(function(){
  const cfg = window.PLMOPS_CONFIG || {};
  const products = cfg.products || {};
  const path = (location.pathname.split("/").pop() || "index.html");
  const params = new URLSearchParams(location.search);
  const utmSource = (params.get("utm_source") || "").toLowerCase();
  const utmMedium = (params.get("utm_medium") || "").toLowerCase();
  const utmCampaign = params.get("utm_campaign") || "";

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
        el.textContent = product.storeComingSoon || "Microsoft Store link coming soon.";
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

  function markNav(){
    document.querySelectorAll("[data-nav]").forEach(function(a){
      const href = a.getAttribute("href") || "";
      const file = href.split("#")[0];
      if (file && file === path) a.classList.add("active");
      if (path === "index.html" && href.indexOf("index.html#product-demos") === 0 && location.hash === "#product-demos") {
        a.classList.add("active");
      }
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
      if (key === "email") {
        el.href = "mailto:" + (cfg.SUPPORT_EMAIL || cfg.TO_EMAIL);
        if (!el.textContent.trim()) el.textContent = cfg.SUPPORT_EMAIL || cfg.TO_EMAIL;
      }
      if (key === "b2b-email") {
        const addr = cfg.B2B_EMAIL || "sanjay@plmaiservice.com";
        el.href = "mailto:" + addr + (el.getAttribute("data-subject") ? ("?subject=" + encodeURIComponent(el.getAttribute("data-subject"))) : "");
        if (!el.textContent.trim()) el.textContent = addr;
      }
    });
  }

  function initI18n(){
    const pack = window.PLMOPS_I18N;
    if (!pack || !pack.strings) return;
    const supported = (pack.langs || []).map(function(l){ return l.code; });
    const stored = (localStorage.getItem("plmops_lang") || "").toLowerCase();
    const fromQuery = (params.get("lang") || "").toLowerCase();
    let lang = fromQuery || stored || pack.defaultLang || "en";
    if (supported.indexOf(lang) < 0) lang = pack.defaultLang || "en";

    function t(key){
      const table = pack.strings[lang] || pack.strings.en || {};
      const en = pack.strings.en || {};
      return table[key] != null ? table[key] : (en[key] != null ? en[key] : key);
    }

    function applyText(el, key){
      if (!el || !key) return;
      const val = t(key);
      if (el.hasAttribute("data-i18n-html")) el.innerHTML = val;
      else el.textContent = val;
    }

    function mapChrome(){
      document.querySelectorAll("a.skip").forEach(function(el){ applyText(el, "skip"); });
      document.querySelectorAll(".brand small").forEach(function(el){ applyText(el, "brand.tag"); });
      document.querySelectorAll(".nav-toggle").forEach(function(el){ applyText(el, "nav.menu"); });

      document.querySelectorAll(".nav-links a").forEach(function(el){
        const href = (el.getAttribute("href") || "").trim();
        if (/bapiload-guard\.html/i.test(href)) applyText(el, "nav.bapi");
        else if (/order-release-guard\.html/i.test(href)) applyText(el, "nav.release");
        else if (/#store-apps/i.test(href)) applyText(el, "nav.store");
        else if (/support\.html/i.test(href)) applyText(el, "nav.support");
        else if (/leanconsult-factory\.html/i.test(href)) applyText(el, "nav.lean");
      });

      document.querySelectorAll(".nav .cta a.btn").forEach(function(el){
        const href = el.getAttribute("href") || "";
        if (/mailto:/i.test(href)) applyText(el, "nav.email");
        else if (/#request-demo|contact\.html/i.test(href) || /demo/i.test(el.textContent || "")) applyText(el, "nav.demo");
      });

      document.querySelectorAll(".footer h2").forEach(function(el){
        const raw = (el.getAttribute("data-i18n-src") || el.textContent || "").trim();
        if (!el.getAttribute("data-i18n-src")) el.setAttribute("data-i18n-src", raw);
        const src = el.getAttribute("data-i18n-src");
        const map = {
          "B2B": "footer.b2b",
          "Microsoft Store": "footer.ms",
          "Lean Consult": "footer.lean",
          "Company": "footer.company",
          "Resources": "footer.resources"
        };
        if (map[src]) applyText(el, map[src]);
      });
      document.querySelectorAll(".footer a[href='about.html']").forEach(function(el){ applyText(el, "footer.about"); });
      document.querySelectorAll(".footer a[href='support.html']").forEach(function(el){ applyText(el, "footer.support"); });
      document.querySelectorAll(".footer a[href='contact.html']").forEach(function(el){ applyText(el, "footer.contact"); });
      document.querySelectorAll(".footer a[href='privacy.html']").forEach(function(el){ applyText(el, "footer.privacy"); });
      document.querySelectorAll(".footer a[href='terms.html']").forEach(function(el){ applyText(el, "footer.terms"); });
      document.querySelectorAll('.footer a[data-config="youtube"]').forEach(function(el){ applyText(el, "footer.youtube"); });
      document.querySelectorAll(".footer .container > div:first-child p").forEach(function(el){ applyText(el, "footer.blurb"); });
      document.querySelectorAll(".site-legal").forEach(function(el){ applyText(el, "footer.legal"); });
    }

    function applyMarked(){
      document.querySelectorAll("[data-i18n]").forEach(function(el){
        applyText(el, el.getAttribute("data-i18n"));
      });
    }

    function mountSwitcher(){
      const host = document.querySelector(".nav .cta") || document.querySelector(".nav-inner");
      if (!host || host.querySelector(".lang-switch")) return;
      const wrap = document.createElement("label");
      wrap.className = "lang-switch";
      wrap.title = t("lang.label");
      const sr = document.createElement("span");
      sr.className = "sr-only";
      sr.textContent = t("lang.label");
      const sel = document.createElement("select");
      sel.setAttribute("aria-label", t("lang.label"));
      (pack.langs || []).forEach(function(l){
        const opt = document.createElement("option");
        opt.value = l.code;
        opt.textContent = l.short || l.label;
        opt.title = l.label;
        if (l.code === lang) opt.selected = true;
        sel.appendChild(opt);
      });
      sel.addEventListener("change", function(){
        localStorage.setItem("plmops_lang", sel.value);
        const url = new URL(location.href);
        url.searchParams.set("lang", sel.value);
        location.href = url.toString();
      });
      wrap.appendChild(sr);
      wrap.appendChild(sel);
      host.appendChild(wrap);
    }

    document.documentElement.lang = lang;
    localStorage.setItem("plmops_lang", lang);
    mapChrome();
    applyMarked();
    mountSwitcher();
  }

  const contactForm = document.querySelector("#contactForm");
  if (contactForm) {
    const status = document.querySelector("#contactFormStatus");
    const btn = document.querySelector("#contactSubmitBtn");
    const endpoint = (cfg.FORM_ENDPOINT || "").trim();
    const b2bEmail = (cfg.B2B_EMAIL || "sanjay@plmaiservice.com").trim();
    if (!endpoint && btn) {
      btn.textContent = "Open email to send";
    }
    contactForm.addEventListener("submit", async function(e){
      e.preventDefault();
      const fd = new FormData(contactForm);
      const name = (fd.get("name") || "").toString().trim();
      const company = (fd.get("company") || "").toString().trim();
      const email = (fd.get("email") || "").toString().trim();
      const topic = (fd.get("topic") || "").toString().trim();
      const message = (fd.get("message") || "").toString().trim();
      if (!endpoint) {
        const subject = "PLM AI Services — " + (topic || "website inquiry");
        const body = [
          "Name: " + name,
          "Company: " + company,
          "Email: " + email,
          "Topic: " + topic,
          "",
          message
        ].join("\r\n");
        window.location.href = "mailto:" + b2bEmail +
          "?subject=" + encodeURIComponent(subject) +
          "&body=" + encodeURIComponent(body);
        if (status) status.textContent = "Opening your email app to send to " + b2bEmail + "…";
        track("click_demo_request", { topic: topic || "general", delivery: "mailto" });
        return;
      }
      btn.disabled = true;
      if (status) status.textContent = "Sending…";
      try {
        const res = await fetch(endpoint, { method:"POST", body: fd, headers:{ Accept:"application/json" }});
        if (!res.ok) throw new Error("fail");
        contactForm.reset();
        if (status) status.textContent = "Thank you. We will get back to you shortly.";
        track("click_demo_request", { topic: topic || "general", delivery: "form" });
      } catch (_) {
        if (status) status.textContent = "Could not send. Email " + b2bEmail + " directly, or try again later.";
      } finally {
        btn.disabled = false;
      }
    });
  }

  initPixel();
  markNav();
  mobileNav();
  bindStoreButtons();
  bindDemoButtons();
  bindSupport();
  bindFacebook();
  fillDynamicText();
  pageViewEvents();
  initI18n();

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
})();
