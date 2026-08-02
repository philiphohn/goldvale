import {getTranslations} from 'next-intl/server';
import Reveal from '@/components/ui/Reveal';

import {SITE_URL} from '@/lib/site-url';

export async function generateMetadata({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'Footer'});
  const canonicalUrl = `${SITE_URL}/${locale}/impressum`;
  
  const title = t('impressum');
  const description = t('impressum');
  
  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        de: `${SITE_URL}/de/impressum`,
        en: `${SITE_URL}/en/impressum`,
        el: `${SITE_URL}/el/impressum`,
        'x-default': `${SITE_URL}/en/impressum`,
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

export default async function ImpressumPage({params}: {params: Promise<{locale: string}>}) {
  const t = await getTranslations('Footer');
  const {locale} = await params;

  return (
    <section className="bg-[var(--color-background-2)] border-b border-[var(--color-line)] pt-32 pb-16 min-h-screen">
      <div className="wrap">
        <Reveal>
          <h1 className="font-semibold text-[clamp(2.2rem,4vw,3.2rem)] tracking-[-0.025em] lowercase mb-[2rem]">{t('impressum')}</h1>
          
          <div className="text-[var(--color-muted)] flex flex-col gap-6 max-w-[65ch] leading-[1.6]">
            <div className="mb-4">
              <p>{locale === 'en' ? 'Goldvale Studios is a brand of HBC Hohn Business Consulting UG (haftungsbeschränkt).' : 'Goldvale Studios ist eine Marke der HBC Hohn Business Consulting UG (haftungsbeschränkt).'}</p>
            </div>

            <div>
              <strong className="text-[var(--color-white)] block mb-1">{locale === 'en' ? 'Information according to § 5 TMG' : 'Angaben gemäß § 5 TMG'}</strong>
              <p>HBC Hohn Business Consulting UG (haftungsbeschränkt)<br />
              Lerchenstraße 7<br />
              14089 Berlin<br />
              {locale === 'en' ? 'Germany' : 'Deutschland'}</p>
            </div>
            
            <div>
              <strong className="text-[var(--color-white)] block mb-1">{locale === 'en' ? 'Represented by:' : 'Vertreten durch:'}</strong>
              <p>Philip Hohn</p>
            </div>
            
            <div>
              <strong className="text-[var(--color-white)] block mb-1">{locale === 'en' ? 'Contact:' : 'Kontakt:'}</strong>
              <p>{locale === 'en' ? 'Phone:' : 'Telefon:'} +49 15678 412954<br />
              {locale === 'en' ? 'Email:' : 'E-Mail:'} hello@goldvalestudios.com</p>
            </div>
            
            <div>
              <strong className="text-[var(--color-white)] block mb-1">{locale === 'en' ? 'Register Entry:' : 'Registereintrag:'}</strong>
              <p>{locale === 'en' ? 'Entry in the commercial register.' : 'Eintragung im Handelsregister.'}<br />
              {locale === 'en' ? 'Registry Court: Local Court of Berlin (Charlottenburg)' : 'Registergericht: Amtsgericht Berlin (Charlottenburg)'}<br />
              {locale === 'en' ? 'Registration Number: HRB 266039' : 'Registernummer: HRB 266039'}</p>
            </div>
            
            <div>
              <strong className="text-[var(--color-white)] block mb-1">{locale === 'en' ? 'VAT ID:' : 'Umsatzsteuer-ID:'}</strong>
              <p>{locale === 'en' ? 'VAT identification number according to § 27 a of the German VAT Act:' : 'Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:'}<br />
              DE369234361</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
