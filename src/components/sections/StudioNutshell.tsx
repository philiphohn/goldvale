import {useTranslations} from 'next-intl';
import SectionHeading from '@/components/ui/SectionHeading';
import Reveal from '@/components/ui/Reveal';

export default function StudioNutshell() {
  const t = useTranslations('Studio');

  return (
    <section className="sec" id="studio">
      <div className="wrap">
        <Reveal>
          <SectionHeading idx={t('idx')} title={t('section_title')} moreText="Das Studio" moreLink="/studio" />
        </Reveal>
        
        <Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[1px] bg-[var(--color-line)] border border-[var(--color-line)] rounded-[5px] overflow-hidden">
            {[1, 2, 3, 4].map((num) => (
              <div key={num} className="bg-[var(--color-background)] p-[clamp(2rem,4vw,3.2rem)] transition-colors duration-500 hover:bg-[var(--color-surface)]">
                <div className="font-serif text-[2.2rem] text-[var(--color-gold)] font-normal">0{num}</div>
                <p className="mt-[1.1rem] text-[clamp(1.35rem,2vw,1.75rem)] leading-[1.32] font-medium tracking-[-0.01em]">
                  {t.rich(`item${num}` as any, {
                    bold: (chunks) => <strong className="text-[var(--color-gold-hi)] font-semibold">{chunks}</strong>
                  })}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
