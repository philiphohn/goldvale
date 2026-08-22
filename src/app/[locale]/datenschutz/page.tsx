import {getTranslations} from 'next-intl/server';
import Reveal from '@/components/ui/Reveal';
import PrivacyPolicyDE from '@/components/legal/PrivacyPolicyDE';
import PrivacyPolicyEN from '@/components/legal/PrivacyPolicyEN';


import {getPageMetadata} from '@/lib/routes';

export async function generateMetadata({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'Footer'});
  const description = locale === 'en'
    ? 'Privacy policy and details on data processing at Goldvale Studios in accordance with GDPR.'
    : locale === 'el'
    ? 'Πολιτική απορρήτου και προστασίας δεδομένων της Goldvale Studios σύμφωνα με το GDPR.'
    : 'Datenschutzerklärung und Informationen zur Datenverarbeitung bei Goldvale Studios gemäß DSGVO.';
  return getPageMetadata(locale as any, '/datenschutz', t('datenschutz'), description, false);
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
