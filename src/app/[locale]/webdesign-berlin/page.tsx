import { setRequestLocale } from 'next-intl/server';
import Reveal from '@/components/ui/Reveal';
import SectionHeading from '@/components/ui/SectionHeading';
import ContactPreview from '@/components/sections/ContactPreview';
import { Link } from '@/i18n/routing';
import Image from 'next/image';
import { SITE_URL } from '@/lib/site-url';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const isEn = locale === 'en';
  const canonicalUrl = `${SITE_URL}/${locale}/webdesign-berlin`;

  const title = locale === 'en'
    ? 'Web Design Berlin | Digital Studio for High-Performance Websites'
    : locale === 'el'
    ? 'Web Design Berlin | Ψηφιακό Studio για Websites Υψηλής Απόδοσης'
    : 'Webdesign Berlin | Digitalstudio für Performance Websites & Apps';
  
  const description = locale === 'en'
    ? 'Bespoke web design & app development in Berlin. We design & develop high-performance websites and digital products for ambitious brands.'
    : locale === 'el'
    ? 'Εξειδικευμένο web design & ανάπτυξη εφαρμογών στο Βερολίνο. Σχεδιάζουμε και αναπτύσσουμε ψηφιακά προϊόντα υψηλής απόδοσης.'
    : 'Maßgeschneidertes Webdesign & App-Entwicklung in Berlin. Wir konzipieren und entwickeln performante Websites und digitale Produkte für ambitionierte Marken.';

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        de: `${SITE_URL}/de/webdesign-berlin`,
        en: `${SITE_URL}/en/webdesign-berlin`,
        el: `${SITE_URL}/el/webdesign-berlin`,
        'x-default': `${SITE_URL}/en/webdesign-berlin`,
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

export default async function WebdesignBerlinPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const isEn = locale === 'en';

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'Goldvale Studios — Webdesign & App-Entwicklung Berlin',
    url: `${SITE_URL}/${locale}/webdesign-berlin`,
    telephone: '+4915678412954',
    email: 'hello@goldvalestudios.com',
    priceRange: '$$$',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Lerchenstraße 7',
      addressLocality: 'Berlin',
      postalCode: '14089',
      addressCountry: 'DE',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 52.4862,
      longitude: 13.1558,
    },
    areaServed: ['Berlin', 'Brandenburg', 'Deutschland', 'DACH'],
  };

  const localProjects = [
    {
      name: 'Eventboot.de',
      desc: isEn ? 'Premium boat rental & booking system in Berlin' : 'Exklusives Eventboot-Buchungssystem & Web-App in Berlin',
      tags: ['WEB-APP', 'BOOKING', 'BERLIN'],
      image: '/images/references/eventboot.de.png',
      url: 'https://eventboot.de',
    },
    {
      name: 'The Lakeside Loft',
      desc: isEn ? 'Branding & website for an event boat location in Berlin' : 'Brand Identity & Website für eine Event-Location in Berlin',
      tags: ['WEBSITE', 'BRANDING', 'HOSPITALITY'],
      image: '/images/references/thelakesideloft.de.png',
      url: 'https://thelakesideloft.de',
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />

      <div className="pt-[clamp(9rem,14vh,13rem)] pb-24">
        {/* Hero */}
        <section className="sec border-b border-[var(--color-line)] pb-[clamp(4rem,8vw,7rem)]">
          <div className="wrap">
            <Reveal>
              <span className="mono mb-[1.5rem] block text-[var(--color-gold)]">
                {isEn ? 'Berlin Digital Studio' : 'Digitalstudio Berlin'}
              </span>
              <h1 className="font-semibold text-[clamp(2.6rem,5.5vw,5.2rem)] tracking-[-0.03em] lowercase leading-[1.06] max-w-[26ch]">
                {isEn ? 'web design and app development in berlin.' : 'webdesign und app-entwicklung in berlin.'}
              </h1>
              <p className="mt-[1.8rem] text-[var(--color-muted)] text-[clamp(1.2rem,1.9vw,1.65rem)] max-w-[46ch] leading-[1.45]">
                {isEn
                  ? 'Goldvale Studios is a Berlin-based digital studio creating high-performance websites, web applications, and brand identities for ambitious companies.'
                  : 'Goldvale Studios ist ein Berliner Digitalstudio für High-Performance Websites, Web-Anwendungen und Markenauftritte für ambitionierte Unternehmen.'}
              </p>
              <div className="flex flex-wrap gap-4 mt-[2.5rem] items-center">
                <Link
                  href="/kontakt"
                  className="text-[1rem] tracking-[0.02em] text-black bg-[var(--color-white)] border border-[var(--color-white)] px-[1.5rem] py-[0.8rem] rounded-full transition-all duration-300 hover:bg-[var(--color-gold)] hover:border-[var(--color-gold)] hover:text-white"
                >
                  {isEn ? 'Schedule intro call' : 'Erstgespräch vereinbaren'}
                </Link>
                <Link
                  href="/arbeiten"
                  className="text-[1rem] tracking-[0.02em] text-[var(--color-muted)] border border-[var(--color-line)] px-[1.5rem] py-[0.8rem] rounded-full transition-all duration-300 hover:text-white hover:border-[var(--color-white)]"
                >
                  {isEn ? 'View work' : 'Arbeiten ansehen'}
                </Link>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Why Berlin Section */}
        <section className="sec border-b border-[var(--color-line)] py-[clamp(5rem,10vw,8rem)]">
          <div className="wrap">
            <Reveal>
              <SectionHeading
                idx="01 — Standort Berlin"
                title={isEn ? 'digital craftsmanship from berlin.' : 'digitale handwerkskunst aus berlin.'}
              />
              <p className="text-[var(--color-muted)] text-[clamp(1.18rem,1.8vw,1.45rem)] leading-[1.6] max-w-[52ch] mb-[clamp(3rem,6vw,4rem)]">
                {isEn
                  ? 'We combine strategic positioning, modern engineering with Next.js, and refined UI design — directly from Berlin to global markets.'
                  : 'Wir verbinden strategische Positionierung, moderne Technik auf Next.js-Basis und ästhetisches Screendesign — direkt aus Berlin für internationale Märkte.'}
              </p>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-[clamp(1.5rem,3vw,2.5rem)]">
              {[
                {
                  title: isEn ? 'Strategy & UX' : 'Strategie & UX',
                  desc: isEn ? 'Clarity before code: we define core targets and user flows for maximum engagement.' : 'Klarheit vor dem Code: Wir definieren Ziele und Nutzerführung für maximale Wirkung.',
                },
                {
                  title: isEn ? 'Next.js & Speed' : 'Performance & Next.js',
                  desc: isEn ? 'Zero-compromise engineering: sub-second load times and top Core Web Vitals.' : 'Kompromisslose Technik: Sub-Sekunden Ladezeiten und beste Core Web Vitals.',
                },
                {
                  title: isEn ? 'Direct Support' : 'Persönliche Betreuung',
                  desc: isEn ? 'Close collaboration with founder Philip Hohn from day one to post-launch.' : 'Enge partnerschaftliche Betreuung durch Gründer Philip Hohn ab Tag 1.',
                },
              ].map((item, idx) => (
                <Reveal key={idx} delay={idx * 0.1}>
                  <div className="bg-[var(--color-background-2)] border border-[var(--color-line)] rounded-[5px] p-[1.8rem]">
                    <h3 className="font-semibold text-[1.4rem] mb-[0.6rem] text-[var(--color-white)]">{item.title}</h3>
                    <p className="text-[var(--color-muted)] text-[1.05rem] leading-[1.55]">{item.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Berlin Projects */}
        <section className="sec border-b border-[var(--color-line)] py-[clamp(5rem,10vw,8rem)]">
          <div className="wrap">
            <Reveal>
              <SectionHeading
                idx="02 — Berlin Referenzen"
                title={isEn ? 'projects built in berlin.' : 'projekte aus berlin.'}
              />
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-[clamp(1.5rem,3vw,3rem)]">
              {localProjects.map((proj, i) => (
                <Reveal key={i} delay={i * 0.1}>
                  <a
                    href={proj.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block relative rounded-[5px] overflow-hidden group isolate border border-[var(--color-line)] bg-[var(--color-background-2)]"
                  >
                    <div className="aspect-video relative overflow-hidden rounded-t-[5px]">
                      <Image
                        src={proj.image}
                        alt={`${proj.name} Webdesign Berlin`}
                        fill
                        className="object-cover object-top transition-transform duration-[0.8s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>
                    <div className="p-[1.4rem_1.5rem]">
                      <h3 className="font-semibold text-[1.6rem] mb-[0.4rem] group-hover:text-[var(--color-gold)] transition-colors">
                        {proj.name}
                      </h3>
                      <p className="text-[var(--color-muted)] text-[1.05rem] mb-[1rem]">{proj.desc}</p>
                      <div className="flex flex-wrap gap-2">
                        {proj.tags.map((t) => (
                          <span key={t} className="mono !text-[0.76rem] border border-[var(--color-line)] px-[0.75em] py-[0.34em] rounded-full text-[var(--color-muted-2)]">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </a>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="pt-[clamp(5rem,8vw,7rem)]">
          <ContactPreview source="webdesign-berlin-landingpage" />
        </section>
      </div>
    </>
  );
}
