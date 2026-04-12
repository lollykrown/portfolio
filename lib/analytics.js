// lib/analytics.js

export const track = (event, data = {}) => {
  if (typeof window === "undefined") return;

  // ✅ Plausible
  if (window.plausible) {
    window.plausible(event, { props: data });
  }

  // ✅ Google Analytics (gtag)
  if (window.gtag) {
    window.gtag("event", event, data);
  }
};