(function () {
  var config = window.siteConsentConfig || {};
  if (config.enabled === false) {
    return;
  }

  var storageKey = config.storageKey || "site_consent";
  var banner = null;
  var consentState = null;

  function initGtagStub() {
    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };
    window.gtag("consent", "default", {
      ad_storage: "denied",
      analytics_storage: "denied"
    });
  }

  function getStoredConsent() {
    if (typeof window.localStorage === "undefined") return config.defaultConsent || "denied";
    return window.localStorage.getItem(storageKey) || config.defaultConsent || "denied";
  }

  function saveConsent(value) {
    consentState = value;
    window.siteConsentState = value;
    if (typeof window.localStorage !== "undefined") {
      window.localStorage.setItem(storageKey, value);
    }
  }

  function broadcastConsent(value) {
    try {
      document.dispatchEvent(new CustomEvent("consent:update", { detail: { state: value } }));
    } catch (e) {
      // ignore
    }
  }

  function loadScriptOnce(id, src) {
    if (document.getElementById(id)) return;
    var script = document.createElement("script");
    script.id = id;
    script.async = true;
    script.src = src;
    document.head.appendChild(script);
  }

  function enableAnalytics() {
    if (!config.analyticsId || window.__analyticsLoaded) return;
    if (consentState !== "granted") return;
    window.__analyticsLoaded = true;
    loadScriptOnce("analytics-script", "https://www.googletagmanager.com/gtag/js?id=" + config.analyticsId);
    window.gtag("js", new Date());
    window.gtag("config", config.analyticsId, { anonymize_ip: true });
  }

  function enableAdsense() {
    if (!config.adsense || !config.adsense.enabled || !config.adsense.clientId) return;
    if (consentState !== "granted") return;
    if (typeof window.loadAdsenseScript === "function") {
      window.loadAdsenseScript();
    }
  }

  function updateBannerState(approved) {
    if (!banner) return;
    banner.setAttribute("data-visible", approved ? "false" : "true");
    banner.setAttribute("data-state", approved ? "granted" : "denied");
    var stateLabel = banner.querySelector("[data-consent-state]");
    if (stateLabel) {
      stateLabel.textContent = approved ? "granted" : "denied";
    }
  }

  function applyConsent(value) {
    saveConsent(value);
    var approved = value === "accepted" || value === "granted" || value === "allow";
    updateBannerState(approved);
    window.gtag("consent", "update", {
      ad_storage: approved ? "granted" : "denied",
      analytics_storage: approved ? "granted" : "denied"
    });
    if (approved) {
      enableAnalytics();
      enableAdsense();
    }
    broadcastConsent(value);
  }

  function bindBanner() {
    if (!banner) return;
    var buttons = banner.querySelectorAll("[data-consent-action]");
    buttons.forEach(function (button) {
      button.addEventListener("click", function () {
        applyConsent(button.getAttribute("data-consent-action") === "accept" ? "granted" : "denied");
      });
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    banner = document.getElementById("cookie-consent");
    initGtagStub();
    consentState = getStoredConsent();
    window.siteConsentState = consentState;
    bindBanner();
    var approved = consentState === "granted" || consentState === "accepted";
    updateBannerState(approved);
    if (approved) {
      enableAnalytics();
      enableAdsense();
    }
    broadcastConsent(consentState);
  });

  window.updateConsent = applyConsent;
})();
