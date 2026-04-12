'use client';

import { useEffect, useState } from "react";
import { getConsent } from "@/lib/consent";
import CookieBanner from "@/components/CookieBanner";
import { loadGoogleAnalytics } from "@/lib/loadGA";

export default function AnalyticsManager({ children }) {
  const [consent, setConsentState] = useState(null);

  useEffect(() => {
    const saved = getConsent();
    setConsentState(saved);

    if (saved === "accepted") {
      loadGoogleAnalytics();
    }
  }, []);

  const handleAccept = () => {
    setConsentState("accepted");
    loadGoogleAnalytics();
    setTimeout(() => {
      window.gtag?.('consent', 'update', {
          analytics_storage:'granted'
        })
    }, 0);
  };
  const handleReject = () => {
    setConsentState("declined");
    loadGoogleAnalytics();
    setTimeout(() => {
      window.gtag?.('consent', 'update', {
          analytics_storage:'denied'
        })
    }, 0);
  };

  if (consent === null) {
    return (
      <>
        {children}
        <CookieBanner onAccept={handleAccept} onReject={handleReject} />
      </>
    );
  }

  return (
    <>
      {children}
      {consent === "accepted" && null}
    </>
  );
}