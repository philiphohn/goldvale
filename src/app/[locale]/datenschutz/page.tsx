import {getTranslations} from 'next-intl/server';
import Reveal from '@/components/ui/Reveal';
import PrivacyPolicyDE from '@/components/legal/PrivacyPolicyDE';
import PrivacyPolicyEN from '@/components/legal/PrivacyPolicyEN';

export async function generateMetadata({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'Footer'});
  return {
    title: t('datenschutz') + ' — Goldvale Studios',
    description: t('datenschutz'),
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
