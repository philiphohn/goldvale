import {getTranslations} from 'next-intl/server';
import Reveal from '@/components/ui/Reveal';
import {Link} from '@/i18n/routing';

export async function generateMetadata({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  const isEn = locale === 'en';
  return {
    title: isEn
      ? 'Digital Agency Services | Websites, Apps & Branding — Goldvale Studios'
      : 'Digitalagentur Leistungen | Websites, Apps & Branding — Goldvale Studios',
    description: isEn
      ? 'From concept to launch: bespoke websites, web apps, design systems, and digital strategies built for longevity and growth.'
      : 'Von der Idee bis zum Launch: Maßgeschneiderte Websites, Web-Apps, Design-Systeme und Digitalstrategien aus einer Hand.',
  };
}

export default async function LeistungenDetailPage({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  const t = await getTranslations('ServicesDetail');
  const tSrv = await getTranslations('Services');

  const services = [
    { num: '01', title: tSrv('s1_title'), desc: tSrv('s1_desc'), extended: 'Wir konzipieren und entwickeln maßgeschneiderte Websites, die nicht nur beeindruckend aussehen, sondern auch performant und skalierbar sind. Unser Ansatz kombiniert tiefgehendes Verständnis für User Experience mit modernsten Technologien wie React, Next.js und Headless CMS-Systemen.', kw: ['UX / UI', 'Screendesign', 'Frontend', 'Headless CMS', 'Performance', 'Barrierefreiheit'], link: { text: locale === 'en' ? 'Websites for hotels and vacation rentals' : 'Auftritte für Hotels und Ferienwohnungen', href: '/hospitality' as const } },
    { num: '02', title: tSrv('s2_title'), desc: tSrv('s2_desc'), extended: 'Komplexe digitale Produkte erfordern mehr als nur guten Code. Wir bauen Web-Apps und mobile Anwendungen, die geschäftskritische Prozesse digitalisieren und Nutzern echte Mehrwerte bieten. Von der Architektur bis zum Deployment decken wir den gesamten Stack ab.', kw: ['Web-App', 'Mobile', 'Prototyping', 'Full-Stack', 'API-Integration', 'Skalierung'] },
    { num: '03', title: tSrv('s3_title'), desc: tSrv('s3_desc'), extended: 'Eine starke Marke ist das Fundament jedes erfolgreichen Unternehmens. Wir entwickeln digitale Identitäten, die Haltung zeigen und sich nahtlos über alle Touchpoints erstrecken. Unsere Design Systeme garantieren konsistente Markenführung im digitalen Raum.', kw: ['Branding', 'Design System', 'Corporate Design', 'Motion', 'Guidelines'] },
    { num: '04', title: tSrv('s4_title'), desc: tSrv('s4_desc'), extended: 'Erfolg im Digitalen ist kein Zufall. Wir analysieren Märkte, Zielgruppen und Technologien, um datengetriebene Strategien zu entwickeln. Mit UX-Audits und klaren Roadmaps schaffen wir die Basis für nachhaltiges Wachstum und messbare Ergebnisse.', kw: ['Digitalstrategie', 'Research', 'UX-Audit', 'Roadmap', 'SEO'] },
  ];

  return (
    <div className="pt-[clamp(10rem,15vh,14rem)] pb-24">
      {/* Header */}
      <div className="wrap mb-[clamp(6rem,10vw,8rem)]">
        <Reveal>
          <h1 className="font-semibold text-[clamp(2.8rem,6vw,5.5rem)] tracking-[-0.03em] lowercase leading-[1.05]">{t('title')}</h1>
          <p className="mt-[1.5rem] text-[var(--color-muted)] text-[clamp(1.3rem,2vw,1.8rem)] max-w-[40ch] leading-[1.4]">{t('lead')}</p>
        </Reveal>
      </div>

      {/* Services Deep Dive */}
      <div className="wrap">
        <div className="border-t border-[var(--color-line)]">
          {services.map((srv, i) => (
            <Reveal key={i} delay={0.1}>
              <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr_1fr] gap-[clamp(2rem,4vw,5rem)] py-[clamp(3.5rem,6vw,5rem)] border-b border-[var(--color-line)] relative group">
                
                <div className="font-serif text-[clamp(3rem,6vw,5rem)] font-light text-[var(--color-gold)] leading-[0.8]">{srv.num}</div>
                
                <div>
                  <h3 className="font-semibold text-[clamp(2.2rem,4vw,3.2rem)] tracking-[-0.025em] lowercase mb-[1rem]">{srv.title}</h3>
                  <div className="flex flex-wrap gap-[0.55rem] content-start">
                    {srv.kw.map((k, j) => (
                      <span key={j} className="mono !text-[0.85rem] !tracking-[0.02em] text-[var(--color-muted)] border border-[var(--color-line)] px-[1em] py-[0.45em] rounded-full transition-colors duration-300">
                        {k}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div>
                  <p className="text-[var(--color-white)] text-[1.3rem] leading-[1.5] font-medium mb-[1.5rem] max-w-[40ch]">{srv.desc}</p>
                  <p className="text-[var(--color-muted)] text-[1.1rem] leading-[1.6] max-w-[45ch]">{srv.extended}</p>
                  {srv.link && (
                    <p className="mt-[1.2rem]">
                      <Link href={srv.link.href} className="mono !text-[0.88rem] text-[var(--color-gold)] border-b border-[var(--color-gold)] pb-[0.1em] hover:text-white hover:border-white transition-colors inline-block">
                        {srv.link.text} →
                      </Link>
                    </p>
                  )}
                </div>
                
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Process */}
      <div className="wrap mt-[clamp(8rem,15vw,12rem)]">
        <Reveal>
          <h2 className="font-medium text-[clamp(2.2rem,4vw,3.5rem)] lowercase tracking-[-0.02em] mb-[clamp(3rem,6vw,5rem)] text-center">{t('process_title')}</h2>
        </Reveal>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[2px] bg-[var(--color-line)] rounded-[5px] overflow-hidden">
          {[1, 2, 3, 4].map((step) => (
            <Reveal key={step} delay={step * 0.1}>
              <div className="bg-[var(--color-background)] p-[clamp(2rem,3vw,2.5rem)] h-full">
                <div className="mono !text-[0.9rem] text-[var(--color-gold)] mb-[1rem]">0{step}</div>
                <h4 className="font-semibold text-[1.5rem] mb-[0.8rem]">{t(`process_${step}_title` as any)}</h4>
                <p className="text-[var(--color-muted)] text-[1.05rem] leading-[1.5]">{t(`process_${step}_desc` as any)}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}
