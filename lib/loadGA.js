export const loadGoogleAnalytics = () => {
  if (window.__gaLoaded) return;
  window.__gaLoaded = true;

  const script = document.createElement("script");
  script.src = "https://www.googletagmanager.com/gtag/js?id=G-1CQLF3S0NN";
  script.async = true;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  function gtag(){window.dataLayer.push(arguments);}
  window.gtag = gtag;

  gtag('consent', 'default', {
    analytics_storage:'denied'
  })

  gtag("js", new Date());
  gtag("config", "G-1CQLF3S0NN", {
    anonymize_ip: true
  });
};