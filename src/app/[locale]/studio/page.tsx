import {getTranslations} from 'next-intl/server';
import Reveal from '@/components/ui/Reveal';


import {getPageMetadata} from '@/lib/routes';

export async function generateMetadata({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'Meta'});
  return getPageMetadata(locale as any, '/studio', t('studio_title'), t('studio_description'), false);
}

export default async function StudioDetailPage() {
  const t = await getTranslations('StudioDetail');
  const tNutshell = await getTranslations('Studio');

  return (
    <div className="pt-[clamp(10rem,15vh,14rem)] pb-24">
      {/* Header */}
      <div className="wrap mb-[clamp(6rem,10vw,8rem)]">
        <Reveal>
          <h1 className="font-semibold text-[clamp(2.8rem,6vw,5.5rem)] tracking-[-0.03em] lowercase leading-[1.05]">{t('title')}</h1>
          <p className="mt-[1.5rem] text-[var(--color-muted)] text-[clamp(1.3rem,2vw,1.8rem)] max-w-[40ch] leading-[1.4]">{t('lead')}</p>
        </Reveal>
      </div>

      {/* Nutshell - Extended */}
      <div className="wrap">
        <Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[1px] bg-[var(--color-line)] border border-[var(--color-line)] rounded-[5px] overflow-hidden">
            {[1, 2, 3, 4].map((num) => (
              <div key={num} className="bg-[var(--color-background)] p-[clamp(2.5rem,5vw,4rem)]">
                <div className="font-serif text-[2.8rem] text-[var(--color-gold)] font-normal mb-[1rem]">0{num}</div>
                <p className="text-[clamp(1.5rem,2.2vw,2rem)] leading-[1.35] font-medium tracking-[-0.01em] max-w-[28ch]">
                  {tNutshell.rich(`item${num}` as any, {
                    bold: (chunks) => <strong className="text-[var(--color-gold-hi)] font-semibold">{chunks}</strong>
                  })}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>

      {/* Values */}
      <div className="wrap mt-[clamp(8rem,15vw,12rem)]">
        <Reveal>
          <h2 className="font-medium text-[clamp(2.2rem,4vw,3.5rem)] lowercase tracking-[-0.02em] mb-[clamp(3rem,6vw,5rem)] border-b border-[var(--color-line)] pb-[1rem]">{t('values_title')}</h2>
        </Reveal>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-[clamp(2rem,4vw,4rem)]">
          {[1, 2, 3].map((val) => (
            <Reveal key={val} delay={val * 0.1}>
              <div className="h-full border-l border-[var(--color-gold)] pl-[1.5rem]">
                <h4 className="font-semibold text-[1.8rem] mb-[1rem] text-[var(--color-white)]">{t(`val_${val}_title` as any)}</h4>
                <p className="text-[var(--color-muted)] text-[1.15rem] leading-[1.6] max-w-[35ch]">{t(`val_${val}_desc` as any)}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}
