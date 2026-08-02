import Hero from '@/components/sections/Hero';
import Reveal from '@/components/ui/Reveal';
import {getTranslations} from 'next-intl/server';
import WorkPreview from '@/components/sections/WorkPreview';
import StudioNutshell from '@/components/sections/StudioNutshell';
import ServicesSummary from '@/components/sections/ServicesSummary';
import ContactPreview from '@/components/sections/ContactPreview';
import JournalPreview from '@/components/sections/JournalPreview';


import {getPageMetadata} from '@/lib/routes';

export async function generateMetadata({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'Meta'});
  return getPageMetadata(locale as any, '/', t('home_title'), t('home_description'), true);
}

export default async function Home() {
  const t = await getTranslations('Manifest');

  return (
    <>
      <Hero />
      <WorkPreview />
      
      {/* Logos */}
      <aside className="border-y border-[var(--color-line)] py-[clamp(2.5rem,5vw,3.5rem)]">
        <div className="wrap">
          <p className="mono !text-[0.82rem] !tracking-[0.12em] text-[var(--color-muted-2)] mb-[2rem] text-center">Projekte &amp; Kunden</p>
          <Reveal>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-y-[2rem] gap-x-[1rem] items-center justify-items-center">
              {['Tolon House', 'The Lakeside Loft', 'Eventboot', 'Faultr.ai', 'Filoxenos'].map((logo, i) => (
                <span key={i} className="font-serif font-normal text-[clamp(1.15rem,1.7vw,1.5rem)] tracking-[0.02em] text-[var(--color-muted)] opacity-60 transition-all duration-300 hover:opacity-100 hover:text-[var(--color-white)]">
                  {logo}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </aside>

      <StudioNutshell />
      <ServicesSummary />

      {/* Manifest */}
      <section className="py-[clamp(6rem,13vw,11rem)] text-center">
        <div className="wrap">
          <span className="mono mb-[2rem] block">{t('haltung')}</span>
          <Reveal>
            <p className="font-sans font-medium text-[clamp(1.7rem,4.2vw,3.4rem)] leading-[1.18] tracking-[-0.02em] max-w-[22ch] mx-auto lowercase">
              {t('text_1')}
              <em className="font-serif italic font-normal text-[var(--color-gold)] normal-case">{t('text_2')}</em>
              {t('text_3')}
            </p>
          </Reveal>
        </div>
      </section>

      <ContactPreview />
      <JournalPreview />
    </>
  );
}
