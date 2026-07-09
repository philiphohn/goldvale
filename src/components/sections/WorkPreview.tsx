import {useTranslations} from 'next-intl';
import SectionHeading from '@/components/ui/SectionHeading';
import Reveal from '@/components/ui/Reveal';
import {Link} from '@/i18n/routing';

export default function WorkPreview() {
  const t = useTranslations('Work');

  return (
    <section className="sec" id="arbeiten">
      <div className="wrap">
        <Reveal>
          <SectionHeading idx={t('idx')} title={t('section_title')} moreText="Alle Projekte" moreLink="/arbeiten" />
        </Reveal>
        
        <div className="grid grid-cols-1 md:grid-cols-[1.4fr_1fr] gap-[clamp(1.5rem,3vw,3rem)] mb-[clamp(1.5rem,3vw,2.5rem)]">
          <Reveal delay={0.1}>
            <article>
              <Link href="/arbeiten" className="block relative rounded-[5px] overflow-hidden border border-[var(--color-line)] isolate group">
                <div className="aspect-[16/10] relative overflow-hidden">
                  <span className="absolute inset-0 transition-transform duration-[0.8s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105" style={{background: 'radial-gradient(120% 120% at 25% 20%, #2b2f37, #14161A 60%)'}}></span>
                </div>
                <div className="flex justify-between items-start gap-[1rem] p-[1.4rem_1.5rem]">
                  <div>
                    <h3 className="font-semibold text-[clamp(1.5rem,2.6vw,2.1rem)] tracking-[-0.025em]">Meridian Capital</h3>
                    <div className="flex flex-wrap gap-[0.4rem] mt-[0.6rem]">
                      <span className="mono !text-[0.76rem] !tracking-[0.06em] border border-[var(--color-line)] px-[0.75em] py-[0.34em] rounded-full">Fintech</span>
                      <span className="mono !text-[0.76rem] !tracking-[0.06em] border border-[var(--color-line)] px-[0.75em] py-[0.34em] rounded-full">Web-App</span>
                    </div>
                  </div>
                  <span className="mono !text-[0.86rem] !normal-case">2026</span>
                </div>
              </Link>
            </article>
          </Reveal>
          
          <Reveal delay={0.2}>
            <article>
              <Link href="/arbeiten" className="block relative rounded-[5px] overflow-hidden border border-[var(--color-line)] isolate group">
                <div className="aspect-[16/10] relative overflow-hidden">
                  <span className="absolute inset-0 transition-transform duration-[0.8s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105" style={{background: 'radial-gradient(120% 120% at 75% 25%, rgba(var(--pop-rgb),0.42), #14161A 62%)'}}></span>
                </div>
                <div className="flex justify-between items-start gap-[1rem] p-[1.4rem_1.5rem]">
                  <div>
                    <h3 className="font-semibold text-[clamp(1.5rem,2.6vw,2.1rem)] tracking-[-0.025em]">Atelier Nord</h3>
                    <div className="flex flex-wrap gap-[0.4rem] mt-[0.6rem]">
                      <span className="mono !text-[0.76rem] !tracking-[0.06em] border border-[var(--color-line)] px-[0.75em] py-[0.34em] rounded-full">Brand</span>
                    </div>
                  </div>
                  <span className="mono !text-[0.86rem] !normal-case">2025</span>
                </div>
              </Link>
            </article>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
