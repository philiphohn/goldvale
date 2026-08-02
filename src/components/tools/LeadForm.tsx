'use client';

import React, { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';

interface LeadFormProps {
  calcData?: Record<string, any>;
}

export default function LeadForm({ calcData }: LeadFormProps) {
  const t = useTranslations('otaTool.lead_form');
  const locale = useLocale();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [phone, setPhone] = useState('');
  const [consentAnalysis, setConsentAnalysis] = useState(false);
  const [consentNewsletter, setConsentNewsletter] = useState(false);

  // Bot protection
  const [honeypot, setHoneypot] = useState('');
  const [mountTime, setMountTime] = useState<number>(0);

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setMountTime(Date.now());
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !websiteUrl || !consentAnalysis) return;

    setSubmitting(true);
    setErrorMessage('');

    try {
      const res = await fetch('/api/ota-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          websiteUrl,
          phone,
          consentAnalysis,
          consentNewsletter,
          calcData,
          _hp: honeypot,
          _t: mountTime,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Fehler beim Senden');
      }

      setSubmitted(true);
    } catch (err: any) {
      setErrorMessage(err.message || 'Ein Fehler ist aufgetreten.');
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="w-full bg-[#1C1F26] border border-[#10B981]/40 rounded-2xl p-8 sm:p-10 text-center space-y-4 shadow-xl">
        <div className="w-12 h-12 rounded-full bg-[#10B981]/10 text-[#10B981] flex items-center justify-center mx-auto text-2xl">
          ✓
        </div>
        <h3 className="text-xl sm:text-2xl font-bold text-white">{t('success_title')}</h3>
        <p className="text-sm text-[#D1D5DB] max-w-md mx-auto leading-relaxed">
          {t('success_desc')}
        </p>
      </div>
    );
  }

  return (
    <div className="w-full bg-[#14161A] border border-[#262930] rounded-2xl p-6 sm:p-8 lg:p-10 shadow-2xl space-y-6">
      
      <div className="space-y-2">
        <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">{t('heading')}</h3>
        <p className="text-xs sm:text-sm text-[#9CA3AF] font-mono">{t('subheading')}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Honeypot field for bots */}
        <div className="hidden" aria-hidden="true">
          <input
            type="text"
            name="website_url_hp"
            tabIndex={-1}
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
            autoComplete="off"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="block text-xs font-mono text-[#D1D5DB]">{t('website_label')}</label>
            <input
              type="url"
              required
              placeholder="https://..."
              value={websiteUrl}
              onChange={(e) => setWebsiteUrl(e.target.value)}
              className="w-full bg-[#1C1F26] border border-[#2E333D] rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#FF3E7F]"
            />
          </div>

          <div className="space-y-1">
            <label className="block text-xs font-mono text-[#D1D5DB]">{t('email_label')}</label>
            <input
              type="email"
              required
              placeholder="name@domain.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#1C1F26] border border-[#2E333D] rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#FF3E7F]"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="block text-xs font-mono text-[#D1D5DB]">{t('name_label')}</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-[#1C1F26] border border-[#2E333D] rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#FF3E7F]"
            />
          </div>

          <div className="space-y-1">
            <label className="block text-xs font-mono text-[#D1D5DB]">{t('phone_label')}</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full bg-[#1C1F26] border border-[#2E333D] rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#FF3E7F]"
            />
          </div>
        </div>

        {/* Consents */}
        <div className="space-y-3 pt-2">
          <label className="flex items-start space-x-3 cursor-pointer text-xs text-[#D1D5DB] leading-relaxed">
            <input
              type="checkbox"
              required
              checked={consentAnalysis}
              onChange={(e) => setConsentAnalysis(e.target.checked)}
              className="mt-0.5 rounded border-[#2E333D] bg-[#1C1F26] text-[#FF3E7F] focus:ring-0 w-4 h-4 shrink-0"
            />
            <span>
              {t('consent_analysis')}{' '}
              <Link href="/datenschutz" className="underline hover:text-white" target="_blank">
                Datenschutz
              </Link>
            </span>
          </label>

          <label className="flex items-start space-x-3 cursor-pointer text-xs text-[#9CA3AF] leading-relaxed">
            <input
              type="checkbox"
              checked={consentNewsletter}
              onChange={(e) => setConsentNewsletter(e.target.checked)}
              className="mt-0.5 rounded border-[#2E333D] bg-[#1C1F26] text-[#FF3E7F] focus:ring-0 w-4 h-4 shrink-0"
            />
            <span>{t('consent_newsletter')}</span>
          </label>
        </div>

        {errorMessage && (
          <div className="p-3 bg-[#3B1C1C] border border-[#EF4444] text-[#FCA5A5] text-xs rounded-xl">
            {errorMessage}
          </div>
        )}

        <div className="pt-2">
          <button
            type="submit"
            disabled={submitting}
            className="w-full sm:w-auto py-3.5 px-8 bg-[#FF3E7F] hover:bg-[#FF548F] text-white font-medium text-sm rounded-xl transition-all shadow-lg shadow-[#FF3E7F]/20 disabled:opacity-50"
          >
            {submitting ? t('submitting') : t('submit_btn')}
          </button>
        </div>

        <p className="text-[11px] text-[#6B7280] font-mono pt-1">
          🔒 {t('privacy_note')}
        </p>

      </form>
    </div>
  );
}
