import {getTranslations} from 'next-intl/server';
import Reveal from '@/components/ui/Reveal';
import PrivacyPolicyDE from '@/components/legal/PrivacyPolicyDE';
import PrivacyPolicyEN from '@/components/legal/PrivacyPolicyEN';

import {SITE_URL} from '@/lib/site-url';

export async function generateMetadata({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'Footer'});
  const canonicalUrl = `${SITE_URL}/${locale}/datenschutz`;
  
  const title = t('datenschutz');
  const description = t('datenschutz');
  
  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        de: `${SITE_URL}/de/datenschutz`,
        en: `${SITE_URL}/en/datenschutz`,
        el: `${SITE_URL}/el/datenschutz`,
        'x-default': `${SITE_URL}/en/datenschutz`,
      },
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      locale: locale === 'en' ? 'en_US' : locale === 'el' ? 'el_GR' : 'de_DE',
    },
  };
}

export default async function DatenschutzPage({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  const t = await getTranslations('Footer');

  return (
    <section className="bg-[var(--color-background-2)] border-b border-[var(--color-line)] pt-32 pb-16 min-h-screen">
      <div className="wrap">
        <Reveal>
          <h1 className="font-semibold text-[clamp(2.2rem,4vw,3.2rem)] tracking-[-0.025em] lowercase mb-[2rem]">{t('datenschutz')}</h1>
          {locale === 'de' ? <PrivacyPolicyDE /> : <PrivacyPolicyEN />}
        </Reveal>
      </div>
    </section>
  );
}
