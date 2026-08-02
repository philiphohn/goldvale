import {getTranslations} from 'next-intl/server';
import Reveal from '@/components/ui/Reveal';
import Button from '@/components/ui/Button';
import {Link} from '@/i18n/routing';
import Image from 'next/image';

export async function generateMetadata({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  const isEn = locale === 'en';
  return {
    title: isEn
      ? 'Selected Projects & Portfolio | Goldvale Studios'
      : 'Ausgewählte Projekte & Referenzen | Goldvale Studios',
    description: isEn
      ? 'Explore our digital work for clients including Tolon House, The Lakeside Loft, Eventboot.de & Filoxenos.gr.'
      : 'Entdecken Sie unsere digitalen Arbeiten für Kunden wie Tolon House, The Lakeside Loft, Eventboot.de & Filoxenos.gr.',
  };
}

export default async function ArbeitenDetailPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations('WorkDetail');

  const projects = [
    { 
      name: t('proj1_name'), 
      year: '2025', 
      tags: t('proj1_tags').split(', '), 
      desc: t('proj1_desc'), 
      image: '/images/references/eventboot.de.png',
      url: 'https://eventboot.de'
    },
    { 
      name: t('proj2_name'), 
      year: '2026', 
      tags: t('proj2_tags').split(', '), 
      desc: t('proj2_desc'), 
      image: '/images/references/faultr.ai.png',
      url: 'https://faultr.ai'
    },
    { 
      name: t('proj3_name'), 
      year: '2026', 
      tags: t('proj3_tags').split(', '), 
      desc: t('proj3_desc'), 
      image: '/images/references/filoxenos.gr.png',
      url: 'https://filoxenos.gr'
    },
    { 
      name: t('proj4_name'), 
      year: '2024', 
      tags: t('proj4_tags').split(', '), 
      desc: t('proj4_desc'), 
      image: '/images/references/thelakesideloft.de.png',
      url: 'https://thelakesideloft.de'
    },
    { 
      name: t('proj5_name'), 
      year: '2024', 
      tags: t('proj5_tags').split(', '), 
      desc: t('proj5_desc'), 
      image: '/images/references/tolon-house.gr.png',
      url: 'https://tolon-house.gr'
    },
  ];

  return (
    <div className="pt-[clamp(10rem,15vh,14rem)] pb-24">
      {/* Header */}
      <div className="wrap mb-[clamp(4rem,8vw,7rem)]">
        <Reveal>
          <h1 className="font-semibold text-[clamp(2.8rem,6vw,5.5rem)] tracking-[-0.03em] lowercase leading-[1.05]">{t('title')}</h1>
          <p className="mt-[1.5rem] text-[var(--color-muted)] text-[clamp(1.3rem,2vw,1.8rem)] max-w-[35ch] leading-[1.4]">{t('lead')}</p>
        </Reveal>
      </div>

      {/* Grid */}
      <div className="wrap">
        <Reveal>
          <div className="mb-[2.5rem]">
            <Link href="/hospitality" className="mono text-[0.92rem] text-[var(--color-gold)] border-b border-[var(--color-gold)] pb-[0.1em] hover:text-white hover:border-white transition-colors inline-block">
              {locale === 'en'
                ? 'Are you a host or hotelier? Visit our Hospitality page'
                : locale === 'el'
                ? 'Είστε οικοδεσπότης ή ξενοδόχος; Δείτε τη σελίδα Hospitality'
                : 'Sie sind Gastgeber oder Hotelier? Zur Hospitality-Seite'} →
            </Link>
          </div>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-[clamp(1.5rem,3vw,3rem)] gap-y-[clamp(3rem,6vw,5rem)]">
          {projects.map((proj, i) => (
            <Reveal key={i} delay={(i % 2) * 0.1}>
              <article className="h-full flex flex-col">
                <a href={proj.url} target="_blank" rel="noopener noreferrer" className="block relative rounded-[5px] overflow-hidden group isolate flex-grow flex flex-col">
                  <div className="aspect-video relative overflow-hidden rounded-[5px] border border-[var(--color-line)]">
                    <Image 
                      src={proj.image} 
                      alt={`${proj.name} - Website & App Design Preview`} 
                      fill 
                      className="object-cover transition-transform duration-[0.8s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105" 
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                  <div className="mt-[1.5rem] flex-grow flex flex-col">
                    <div className="flex justify-between items-baseline mb-[0.8rem]">
                      <h3 className="font-semibold text-[clamp(1.6rem,2.2vw,2.1rem)] tracking-[-0.025em] transition-colors duration-300 group-hover:text-[var(--color-gold)]">{proj.name}</h3>
                      <span className="mono !text-[0.86rem] text-[var(--color-muted)]">{proj.year}</span>
                    </div>
                    <p className="text-[var(--color-muted)] text-[1.1rem] leading-[1.5] mb-[1.2rem] max-w-[42ch] flex-grow">
                      {proj.desc}
                    </p>
                    <div className="flex flex-wrap gap-[0.4rem] mt-auto">
                      {proj.tags.map(tag => (
                        <span key={tag} className="mono !text-[0.76rem] !tracking-[0.06em] border border-[var(--color-line)] px-[0.75em] py-[0.34em] rounded-full text-[var(--color-muted-2)]">
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
      </div>

      {/* CTA */}
      <div className="wrap mt-[clamp(6rem,12vw,10rem)] text-center border-t border-[var(--color-line)] pt-[clamp(4rem,8vw,7rem)]">
        <Reveal>
          <div className="max-w-[30ch] mx-auto">
            <h2 className="font-medium text-[clamp(2rem,3.5vw,2.8rem)] lowercase tracking-[-0.02em] leading-[1.1] mb-[1rem]">{t('cta_title')}</h2>
            <p className="text-[var(--color-muted)] text-[1.2rem] mb-[2rem]">{t('cta_desc')}</p>
            <Link href="/kontakt">
              <Button>{t('cta_button')}</Button>
            </Link>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
