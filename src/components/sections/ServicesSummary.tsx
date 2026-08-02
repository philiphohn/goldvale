import {useTranslations} from 'next-intl';
import SectionHeading from '@/components/ui/SectionHeading';
import Reveal from '@/components/ui/Reveal';
import {Link} from '@/i18n/routing';

export default function ServicesSummary() {
  const t = useTranslations('Services');

  const services = [
    { num: '01', title: t('s1_title'), desc: t('s1_desc'), kw: ['UX / UI', 'Screendesign', 'Frontend'] },
    { num: '02', title: t('s2_title'), desc: t('s2_desc'), kw: ['Web-App', 'Mobile', 'Prototyping'] },
    { num: '03', title: t('s3_title'), desc: t('s3_desc'), kw: ['Branding', 'Design System'] },
    { num: '04', title: t('s4_title'), desc: t('s4_desc'), kw: ['Digitalstrategie', 'Research'] },
  ];

  return (
    <section className="sec" id="leistungen">
      <div className="wrap">
        <Reveal>
          <SectionHeading idx={t('idx')} title={t('section_title')} moreText="Alle Leistungen" moreLink="/leistungen" />
        </Reveal>
        
        <div className="border-t border-[var(--color-line)]">
          {services.map((srv, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <Link href="/leistungen" className="block grid grid-cols-1 md:grid-cols-[auto_1fr_1.2fr] gap-[clamp(1.5rem,4vw,4rem)] py-[clamp(2.4rem,4vw,3.2rem)] border-b border-[var(--color-line)] relative transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:pl-[1.3rem] group">
                <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-[var(--color-pop)] scale-y-0 origin-top transition-transform duration-[0.45s] group-hover:scale-y-100"></div>
                
                <div className="font-serif text-[clamp(2.6rem,5vw,4.4rem)] font-light text-[var(--color-gold)] leading-[0.9]">{srv.num}</div>
                
                <div>
                  <h3 className="font-semibold text-[clamp(1.9rem,3.4vw,2.8rem)] tracking-[-0.025em] lowercase">{srv.title}</h3>
                  <p className="mt-[0.8rem] text-[var(--color-muted)] text-[clamp(1.1rem,1.5vw,1.3rem)] max-w-[34ch] leading-[1.45]">{srv.desc}</p>
                </div>
                
                <div className="flex flex-wrap gap-[0.55rem] content-start col-start-1 md:col-start-3">
                  {srv.kw.map((k, j) => (
                    <span key={j} className="mono !text-[0.92rem] !tracking-[0.02em] text-[var(--color-muted)] border border-[var(--color-line)] px-[1em] py-[0.45em] rounded-full transition-colors duration-300 group-hover:border-[var(--color-surface)] group-hover:!text-[var(--color-gold)] group-hover:!border-[var(--color-gold)]">
                      {k}
                    </span>
                  ))}
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
        
        <Reveal>
          <div className="mt-[2.5rem] text-right">
            <Link href="/hospitality" className="mono text-[0.92rem] text-[var(--color-gold)] border-b border-[var(--color-gold)] pb-[0.1em] hover:text-white hover:border-white transition-colors inline-block">
              Branchenfokus: Hospitality →
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
