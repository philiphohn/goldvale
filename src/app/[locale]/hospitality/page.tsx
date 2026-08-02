import { getTranslations, setRequestLocale } from 'next-intl/server';
import Reveal from '@/components/ui/Reveal';
import SectionHeading from '@/components/ui/SectionHeading';
import FaqAccordion from '@/components/hospitality/FaqAccordion';
import ContactPreview from '@/components/sections/ContactPreview';
import { Link } from '@/i18n/routing';
import Image from 'next/image';
import { SITE_URL } from '@/lib/site-url';

import {getPageMetadata} from '@/lib/routes';

export async function generateMetadata({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'hospitality.meta'});
  return getPageMetadata(locale as any, '/hospitality', t('title'), t('description'));
}

export default async function HospitalityPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const tHero = await getTranslations('hospitality.hero');
  const tStart = await getTranslations('hospitality.starting');
  const tSrv = await getTranslations('hospitality.services');
  const tAud = await getTranslations('hospitality.audiences');
  const tWork = await getTranslations('hospitality.work');
  const tProc = await getTranslations('hospitality.process');
  const tState = await getTranslations('hospitality.statement');
  const tFaq = await getTranslations('hospitality.faq');
  const tCta = await getTranslations('hospitality.cta');

  // FAQ Items array for Accordion and JSON-LD
  const faqItems = [1, 2, 3, 4, 5, 6, 7, 8].map((i) => ({
    id: `${i}`,
    question: tFaq(`q${i}`),
    answer: tFaq(`a${i}`),
  }));

  // Structured Data Schemas
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: locale === 'en' ? 'Web design and web development for hotels and vacation rentals' : 'Webdesign und Webentwicklung für Hotels und Ferienwohnungen',
    serviceType: locale === 'en' ? 'Web design and web development for hotels and vacation rentals' : 'Webdesign und Webentwicklung für Hotels und Ferienwohnungen',
    provider: {
      '@type': 'Organization',
      name: 'Goldvale Studios',
      url: SITE_URL,
    },
    areaServed: ['DE', 'AT', 'CH', 'GR'],
    audience: {
      '@type': 'Audience',
      audienceType: locale === 'en' ? 'Hotels, vacation rentals, short-term rental hosts' : 'Hotels, Ferienwohnungen, Kurzzeitvermieter',
    },
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: locale === 'en' ? 'Home' : 'Startseite',
        item: `${SITE_URL}/${locale}`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Hospitality',
        item: `${SITE_URL}/${locale}/hospitality`,
      },
    ],
  };

  const serviceCards = [
    {
      title: tSrv('s1_h3'),
      tags: [tSrv('s1_tags.0'), tSrv('s1_tags.1'), tSrv('s1_tags.2')],
      text: tSrv('s1_text'),
    },
    {
      title: tSrv('s2_h3'),
      tags: [tSrv('s2_tags.0'), tSrv('s2_tags.1'), tSrv('s2_tags.2')],
      text: tSrv('s2_text'),
    },
    {
      title: tSrv('s3_h3'),
      tags: [tSrv('s3_tags.0'), tSrv('s3_tags.1'), tSrv('s3_tags.2')],
      text: tSrv('s3_text'),
    },
    {
      title: tSrv('s4_h3'),
      tags: [tSrv('s4_tags.0'), tSrv('s4_tags.1'), tSrv('s4_tags.2')],
      text: tSrv('s4_text'),
    },
    {
      title: tSrv('s5_h3'),
      tags: [tSrv('s5_tags.0'), tSrv('s5_tags.1'), tSrv('s5_tags.2')],
      text: tSrv('s5_text'),
    },
    {
      title: tSrv('s6_h3'),
      tags: [tSrv('s6_tags.0'), tSrv('s6_tags.1'), tSrv('s6_tags.2')],
      text: tSrv('s6_text'),
    },
  ];

  const audienceEntries = [
    { title: tAud('a1_h3'), text: tAud('a1_text') },
    { title: tAud('a2_h3'), text: tAud('a2_text') },
    { title: tAud('a3_h3'), text: tAud('a3_text') },
    { title: tAud('a4_h3'), text: tAud('a4_text') },
    { title: tAud('a5_h3'), text: tAud('a5_text') },
  ];

  const referenceProjects = [
    {
      title: tWork('p1_title'),
      year: tWork('p1_year'),
      tags: [tWork('p1_tags.0'), tWork('p1_tags.1'), tWork('p1_tags.2')],
      desc: tWork('p1_desc'),
      image: '/images/references/tolon-house.gr.png',
      url: 'https://tolon-house.gr',
      alt: locale === 'en' ? 'Tolon House — website for apartments in Tolo, Greece' : 'Tolon House — Website für Apartments in Tolo, Griechenland',
    },
    {
      title: tWork('p2_title'),
      year: tWork('p2_year'),
      tags: [tWork('p2_tags.0'), tWork('p2_tags.1'), tWork('p2_tags.2')],
      desc: tWork('p2_desc'),
      image: '/images/references/thelakesideloft.de.png',
      url: 'https://thelakesideloft.de',
      alt: locale === 'en' ? 'The Lakeside Loft — website and branding for an event boat in Berlin' : 'The Lakeside Loft — Website und Branding für ein Eventboot in Berlin',
    },
    {
      title: tWork('p3_title'),
      year: tWork('p3_year'),
      tags: [tWork('p3_tags.0'), tWork('p3_tags.1'), tWork('p3_tags.2')],
      desc: tWork('p3_desc'),
      image: '/images/references/filoxenos.gr.png',
      url: 'https://filoxenos.gr',
      alt: locale === 'en' ? 'Filoxenos.gr — platform for short-term rental declarations in Greece' : 'Filoxenos.gr — Plattform für Kurzzeitmiet-Erklärungen in Griechenland',
    },
  ];

  const processSteps = [
    { num: '01', title: tProc('step1_title'), desc: tProc('step1_desc') },
    { num: '02', title: tProc('step2_title'), desc: tProc('step2_desc') },
    { num: '03', title: tProc('step3_title'), desc: tProc('step3_desc') },
    { num: '04', title: tProc('step4_title'), desc: tProc('step4_desc') },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <div className="pt-[clamp(9rem,14vh,13rem)] pb-24">
        {/* Section 00 — Hero */}
        <section className="sec border-b border-[var(--color-line)] pb-[clamp(4rem,8vw,7rem)]">
          <div className="wrap">
            <Reveal>
              <span className="mono mb-[1.5rem] block text-[var(--color-gold)]">{tHero('eyebrow')}</span>
              <h1 className="font-semibold text-[clamp(2.6rem,5.5vw,5.2rem)] tracking-[-0.03em] lowercase leading-[1.06] max-w-[28ch]">
                {tHero('h1')}
              </h1>
              <p className="mt-[1.8rem] text-[var(--color-muted)] text-[clamp(1.2rem,1.9vw,1.65rem)] max-w-[44ch] leading-[1.45]">
                {tHero('lead')}
              </p>
              <div className="mono text-[0.85rem] text-[var(--color-muted-2)] mt-[1.2rem] tracking-[0.04em]">
                {tHero('meta')}
              </div>
              <div className="flex flex-wrap gap-4 mt-[2.5rem] items-center">
                <Link
                  href="/kontakt"
                  className="text-[1rem] tracking-[0.02em] text-black bg-[var(--color-white)] border border-[var(--color-white)] px-[1.5rem] py-[0.8rem] rounded-full transition-all duration-300 hover:bg-[var(--color-gold)] hover:border-[var(--color-gold)] hover:text-white"
                >
                  {tHero('cta_primary')}
                </Link>
                <Link
                  href="/arbeiten"
                  className="text-[1rem] tracking-[0.02em] text-[var(--color-muted)] border border-[var(--color-line)] px-[1.5rem] py-[0.8rem] rounded-full transition-all duration-300 hover:text-white hover:border-[var(--color-white)]"
                >
                  {tHero('cta_secondary')}
                </Link>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Section 01 — Ausgangslage */}
        <section className="sec border-b border-[var(--color-line)] py-[clamp(5rem,10vw,8rem)]" id="ausgangslage">
          <div className="wrap">
            <Reveal>
              <SectionHeading idx={tStart('eyebrow')} title={tStart('h2')} />
              <p className="text-[var(--color-muted)] text-[clamp(1.18rem,1.8vw,1.45rem)] leading-[1.6] max-w-[55ch] mb-[clamp(3rem,6vw,5rem)]">
                {tStart('intro')}
              </p>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-[clamp(2rem,5vw,5rem)] gap-y-[clamp(2.5rem,4vw,4rem)]">
              {[1, 2, 3, 4].map((idx) => (
                <Reveal key={idx} delay={idx * 0.1}>
                  <div className="border-t border-[var(--color-line)] pt-[1.5rem]">
                    <h3 className="font-semibold text-[clamp(1.4rem,2.2vw,1.8rem)] tracking-[-0.02em] mb-[0.6rem] text-[var(--color-white)]">
                      {tStart(`p${idx}_h3` as any)}
                    </h3>
                    <p className="text-[var(--color-muted)] text-[1.1rem] leading-[1.55]">
                      {tStart(`p${idx}_text` as any)}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Section 02 — Leistungen für Gastgeber */}
        <section className="sec border-b border-[var(--color-line)] py-[clamp(5rem,10vw,8rem)]" id="leistungen">
          <div className="wrap">
            <Reveal>
              <SectionHeading idx={tSrv('eyebrow')} title={tSrv('h2')} />
              <p className="text-[var(--color-muted)] text-[clamp(1.18rem,1.8vw,1.45rem)] leading-[1.6] max-w-[50ch] mb-[clamp(3rem,6vw,5rem)]">
                {tSrv('intro')}
              </p>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-[clamp(1.5rem,3vw,3rem)]">
              {serviceCards.map((card, i) => (
                <Reveal key={i} delay={(i % 2) * 0.1}>
                  <div className="bg-[var(--color-background-2)] border border-[var(--color-line)] rounded-[5px] p-[clamp(1.8rem,3.5vw,2.5rem)] h-full flex flex-col justify-between">
                    <div>
                      <h3 className="font-semibold text-[clamp(1.5rem,2.5vw,2.1rem)] tracking-[-0.025em] lowercase mb-[1rem]">
                        {card.title}
                      </h3>
                      <div className="flex flex-wrap gap-[0.45rem] mb-[1.2rem]">
                        {card.tags.map((tag, j) => (
                          <span
                            key={j}
                            className="mono !text-[0.76rem] !tracking-[0.06em] uppercase border border-[var(--color-line)] px-[0.75em] py-[0.34em] rounded-full text-[var(--color-muted-2)]"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <p className="text-[var(--color-muted)] text-[1.08rem] leading-[1.6]">
                        {card.text}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal>
              <div className="mt-[3rem] text-right">
                <Link
                  href="/leistungen"
                  className="mono text-[0.92rem] text-[var(--color-gold)] border-b border-[var(--color-gold)] pb-[0.1em] hover:text-white hover:border-white transition-colors"
                >
                  {tSrv('all_services_link')} →
                </Link>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Section 03 — Für wen */}
        <section className="sec border-b border-[var(--color-line)] py-[clamp(5rem,10vw,8rem)]" id="zielgruppen">
          <div className="wrap">
            <Reveal>
              <SectionHeading idx={tAud('eyebrow')} title={tAud('h2')} />
            </Reveal>

            <div className="border-t border-[var(--color-line)] divide-y divide-[var(--color-line)]">
              {audienceEntries.map((entry, idx) => (
                <Reveal key={idx} delay={idx * 0.08}>
                  <div className="grid grid-cols-1 md:grid-cols-[1.3fr_2fr] gap-[1.5rem] py-[clamp(1.8rem,3vw,2.5rem)] items-baseline">
                    <h3 className="font-semibold text-[clamp(1.4rem,2.2vw,1.9rem)] tracking-[-0.02em] lowercase text-[var(--color-white)]">
                      {entry.title}
                    </h3>
                    <p className="text-[var(--color-muted)] text-[1.1rem] leading-[1.55]">
                      {entry.text}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Section 04 — Referenzen */}
        <section className="sec border-b border-[var(--color-line)] py-[clamp(5rem,10vw,8rem)]" id="referenzen">
          <div className="wrap">
            <Reveal>
              <SectionHeading idx={tWork('eyebrow')} title={tWork('h2')} />
              <p className="text-[var(--color-muted)] text-[clamp(1.18rem,1.8vw,1.45rem)] leading-[1.6] max-w-[50ch] mb-[clamp(3rem,6vw,5rem)]">
                {tWork('intro')}
              </p>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-[clamp(1.5rem,3vw,2.5rem)]">
              {referenceProjects.map((proj, i) => (
                <Reveal key={i} delay={i * 0.1}>
                  <article className="h-full flex flex-col">
                    <a
                      href={proj.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block relative rounded-[5px] overflow-hidden group isolate flex-grow flex flex-col border border-[var(--color-line)] bg-[var(--color-background-2)]"
                    >
                      <div className="aspect-video relative overflow-hidden rounded-t-[5px]">
                        <Image
                          src={proj.image}
                          alt={proj.alt}
                          fill
                          className="object-cover object-top transition-transform duration-[0.8s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, 33vw"
                          loading="lazy"
                        />
                      </div>
                      <div className="p-[1.4rem_1.5rem] flex-grow flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-baseline mb-[0.6rem]">
                            <h3 className="font-semibold text-[clamp(1.4rem,2vw,1.8rem)] tracking-[-0.025em] transition-colors duration-300 group-hover:text-[var(--color-gold)]">
                              {proj.title}
                            </h3>
                            <span className="mono !text-[0.86rem] text-[var(--color-muted)]">{proj.year}</span>
                          </div>
                          <p className="text-[var(--color-muted)] text-[1rem] leading-[1.5] mb-[1.2rem]">
                            {proj.desc}
                          </p>
                        </div>
                        <div className="flex flex-wrap gap-[0.4rem] mt-auto">
                          {proj.tags.map((tag) => (
                            <span
                              key={tag}
                              className="mono !text-[0.76rem] !tracking-[0.06em] border border-[var(--color-line)] px-[0.75em] py-[0.34em] rounded-full text-[var(--color-muted-2)] uppercase"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </a>
                  </article>
                </Reveal>
              ))}
            </div>

            <Reveal>
              <div className="mt-[3rem] text-right">
                <Link
                  href="/arbeiten"
                  className="mono text-[0.92rem] text-[var(--color-gold)] border-b border-[var(--color-gold)] pb-[0.1em] hover:text-white hover:border-white transition-colors"
                >
                  {tWork('all_projects_link')} →
                </Link>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Section 05 — Ablauf */}
        <section className="sec border-b border-[var(--color-line)] py-[clamp(5rem,10vw,8rem)]" id="ablauf">
          <div className="wrap">
            <Reveal>
              <SectionHeading idx={tProc('eyebrow')} title={tProc('h2')} />
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[2px] bg-[var(--color-line)] rounded-[5px] overflow-hidden">
              {processSteps.map((step) => (
                <Reveal key={step.num} delay={parseInt(step.num) * 0.1}>
                  <div className="bg-[var(--color-background)] p-[clamp(2rem,3vw,2.5rem)] h-full flex flex-col">
                    <div className="mono !text-[0.9rem] text-[var(--color-gold)] mb-[1rem]">{step.num}</div>
                    <h3 className="font-semibold text-[1.4rem] mb-[0.8rem] text-[var(--color-white)]">{step.title}</h3>
                    <p className="text-[var(--color-muted)] text-[1.05rem] leading-[1.55]">{step.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Section 06 — Haltung */}
        <section className="py-[clamp(6rem,13vw,11rem)] text-center border-b border-[var(--color-line)]">
          <div className="wrap">
            <span className="mono mb-[2rem] block text-[var(--color-gold)]">{tState('eyebrow')}</span>
            <Reveal>
              <p className="font-sans font-medium text-[clamp(1.7rem,4.2vw,3.4rem)] leading-[1.18] tracking-[-0.02em] max-w-[24ch] mx-auto lowercase">
                {tState('text')}
              </p>
            </Reveal>
          </div>
        </section>

        {/* Section 07 — FAQ */}
        <section className="sec border-b border-[var(--color-line)] py-[clamp(5rem,10vw,8rem)]" id="faq">
          <div className="wrap">
            <Reveal>
              <h2 className="font-medium text-[clamp(2.2rem,4vw,3.5rem)] lowercase tracking-[-0.02em] mb-[clamp(3rem,6vw,5rem)] text-center">
                {tFaq('h2')}
              </h2>
              <FaqAccordion items={faqItems} />
            </Reveal>
          </div>
        </section>

        {/* Section 08 — Abschluss-CTA */}
        <section className="pt-[clamp(5rem,8vw,7rem)]">
          <ContactPreview source="hospitality-landingpage" />
        </section>
      </div>
    </>
  );
}
