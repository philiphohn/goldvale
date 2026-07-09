'use client';

import { useState, useEffect } from 'react';
import { Link } from '@/i18n/routing';

export default function CookieBanner({ 
  text, 
  accept, 
  reject, 
  policy 
}: { 
  text: string; 
  accept: string; 
  reject: string; 
  policy: string 
}) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie_consent_analytics');
    if (consent === null) {
      setShow(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie_consent_analytics', 'true');
    // Dispatch a custom event so GoogleAnalytics component knows immediately
    window.dispatchEvent(new Event('cookie_consent_updated'));
    setShow(false);
  };

  const handleReject = () => {
    localStorage.setItem('cookie_consent_analytics', 'false');
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-[clamp(1rem,3vw,2rem)]">
      <div className="max-w-[1200px] mx-auto bg-[var(--color-surface)] border border-[var(--color-line)] p-[clamp(1.5rem,4vw,2.5rem)] rounded-[5px] shadow-2xl flex flex-col md:flex-row items-center justify-between gap-[2rem] transform translate-y-0 opacity-100 transition-all duration-500">
        
        <div className="text-[var(--color-muted)] text-[1rem] leading-[1.6] max-w-[65ch]">
          <p>{text} <Link href="/datenschutz" className="text-[var(--color-gold)] border-b border-[var(--color-gold)] pb-[0.1em] hover:text-[var(--color-gold-hi)]">{policy}</Link></p>
        </div>

        <div className="flex flex-col sm:flex-row gap-[1rem] shrink-0 w-full md:w-auto">
          <button 
            onClick={handleReject}
            className="px-[1.5em] py-[0.8em] font-medium text-[0.95rem] border border-[var(--color-line)] rounded-[5px] text-[var(--color-muted)] hover:text-[var(--color-white)] hover:bg-[var(--color-background)] transition-colors"
          >
            {reject}
          </button>
          <button 
            onClick={handleAccept}
            className="px-[1.5em] py-[0.8em] font-medium text-[0.95rem] bg-[var(--color-white)] text-[var(--color-black)] rounded-[5px] hover:bg-[var(--color-gold)] transition-colors"
          >
            {accept}
          </button>
        </div>

      </div>
    </div>
  );
}
