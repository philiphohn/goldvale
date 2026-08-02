import React from 'react';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { getPageMetadata } from '@/lib/routes';
import { SITE_URL } from '@/lib/site-url';
import Reveal from '@/components/ui/Reveal';
import Calculator from '@/components/tools/Calculator';
import LeadForm from '@/components/tools/LeadForm';
import { Link } from '@/i18n/routing';

export async function generateStaticParams() {
  return [{ locale: 'de' }, { locale: 'en' }, { locale: 'el' }];
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'otaTool' });
  return getPageMetadata(locale as any, '/tools/ota-provisionsrechner', t('meta_title'), t('meta_description'));
}

export default async function OtaCalculatorPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('otaTool');

  const webAppJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    'name': t('meta_title'),
    'description': t('meta_description'),
    'url': `${SITE_URL}/${locale}/tools/ota-provisionsrechner`,
    'applicationCategory': 'BusinessApplication',
    'operatingSystem': 'All',
    'offers': {
      '@type': 'Offer',
      'price': '0',
      'priceCurrency': 'EUR',
    },
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': [1, 2, 3, 4].map((i) => ({
      '@type': 'Question',
      'name': t(`faq.q${i}`),
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': t(`faq.a${i}`),
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <section className="sec min-h-screen pt-28 pb-20">
        <div className="wrap space-y-12">
          
          {/* Header & Intro */}
          <Reveal>
            <div className="space-y-4 max-w-3xl">
              <span className="text-xs uppercase font-mono tracking-wider text-[#FF3E7F]">
                {t('eyebrow')}
              </span>
              <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight lowercase">
                {t('h1')}
              </h1>
              <p className="text-base sm:text-lg text-[#9CA3AF] leading-relaxed">
                {t('subtitle')}
              </p>
            </div>
          </Reveal>

          {/* Calculator Tool */}
          <Reveal delay={0.1}>
            <Calculator />
          </Reveal>

          {/* Lead Form */}
          <Reveal delay={0.15}>
            <LeadForm />
          </Reveal>

          {/* Methodology & Assumptions */}
          <Reveal delay={0.2}>
            <div className="bg-[#14161A] border border-[#262930] rounded-2xl p-6 sm:p-8 space-y-4">
              <h3 className="text-lg font-bold text-white font-mono">{t('methodology.title')}</h3>
              <div className="space-y-3 text-xs sm:text-sm text-[#9CA3AF] leading-relaxed">
                <p>{t('methodology.p1')}</p>
                <p>{t('methodology.p2')}</p>
                <p>{t('methodology.p3')}</p>
              </div>
            </div>
          </Reveal>

          {/* FAQ Accordion */}
          <Reveal delay={0.25}>
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-white tracking-tight">{t('faq.title')}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="bg-[#14161A] border border-[#262930] rounded-2xl p-6 space-y-2">
                    <h4 className="text-sm font-bold text-white flex items-start gap-2">
                      <span className="text-[#FF3E7F] font-mono">+</span>
                      <span>{t(`faq.q${i}`)}</span>
                    </h4>
                    <p className="text-xs sm:text-sm text-[#9CA3AF] leading-relaxed pl-4">
                      {t(`faq.a${i}`)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Backlink to Hospitality */}
          <Reveal delay={0.3}>
            <div className="flex justify-between items-center border-t border-[#262930] pt-8">
              <Link
                href="/hospitality"
                className="inline-flex items-center gap-2 text-sm text-[#FF3E7F] hover:underline font-mono"
              >
                ← Back to Hospitality
              </Link>
              <div className="text-xs text-[#9CA3AF] font-mono">
                <Link href="/impressum" className="hover:text-white mr-4">{t('disclaimers.trademark') ? 'Impressum' : ''}</Link>
                <Link href="/datenschutz" className="hover:text-white">Datenschutz</Link>
              </div>
            </div>
          </Reveal>

          {/* Trademark Disclaimer */}
          <div className="text-[11px] text-[#6B7280] font-mono border-t border-[#262930]/60 pt-4 leading-relaxed">
            {t('disclaimers.trademark')}
          </div>

        </div>
      </section>
    </>
  );
}
