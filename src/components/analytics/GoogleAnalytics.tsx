'use client';

import { useEffect, useState } from 'react';
import Script from 'next/script';

export default function GoogleAnalytics({ gaId }: { gaId: string }) {
  const [consentGranted, setConsentGranted] = useState(false);

  useEffect(() => {
    // Check initial state
    const checkConsent = () => {
      const consent = localStorage.getItem('cookie_consent_analytics');
      if (consent === 'true') {
        setConsentGranted(true);
      }
    };
    
    checkConsent();

    // Listen for real-time updates from CookieBanner
    window.addEventListener('cookie_consent_updated', checkConsent);
    return () => window.removeEventListener('cookie_consent_updated', checkConsent);
  }, []);

  if (!consentGranted || !gaId) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${gaId}', {
            page_path: window.location.pathname,
          });
        `}
      </Script>
    </>
  );
}
