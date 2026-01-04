(function () {
  var config = window.siteConsentConfig || {};
  if (config.enabled === false) {
    return;
  }

  var storageKey = config.storageKey || "site_consent";
  var banner = document.getElementById("cookie-consent");
  var consentState = null;

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
    window.__analyticsLoaded = true;
    loadScriptOnce("analytics-script", "https://www.googletagmanager.com/gtag/js?id=" + config.analyticsId);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { dataLayer.push(arguments); };
    window.gtag("js", new Date());
    window.gtag("config", config.analyticsId, { anonymize_ip: true });
  }

  function enableAdsense() {
    if (!config.adsense || !config.adsense.enabled || !config.adsense.clientId) return;
    if (typeof window.loadAdsenseScript === "function") {
      window.loadAdsenseScript();
    }
  }

  function applyConsent(value) {
    saveConsent(value);
    var approved = value === "accepted" || value === "granted" || value === "allow";
    if (banner) {
      banner.setAttribute("data-visible", approved ? "false" : "true");
    }
    if (approved) {
      enableAnalytics();
      enableAdsense();
    }
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
    consentState = getStoredConsent();
    bindBanner();
    if (banner && (consentState === "granted" || consentState === "accepted")) {
      banner.setAttribute("data-visible", "false");
    } else if (banner) {
      banner.setAttribute("data-visible", "true");
    }
    if (consentState === "granted" || consentState === "accepted") {
      enableAnalytics();
      enableAdsense();
    }
  });

  window.updateConsent = applyConsent;
})();
