import {useTranslations} from 'next-intl';
import SectionHeading from '@/components/ui/SectionHeading';
import Reveal from '@/components/ui/Reveal';
import Image from 'next/image';

export default function WorkPreview() {
  const t = useTranslations('Work');
  const tDetail = useTranslations('WorkDetail');

  const featured = [
    {
      name: tDetail('proj5_name'),
      year: '2024',
      tags: tDetail('proj5_tags').split(', '),
      image: '/images/references/tolon-house.gr.png',
      url: 'https://tolon-house.gr',
    },
    {
      name: tDetail('proj4_name'),
      year: '2024',
      tags: tDetail('proj4_tags').split(', '),
      image: '/images/references/thelakesideloft.de.png',
      url: 'https://thelakesideloft.de',
    },
  ];

  return (
    <section className="sec" id="arbeiten">
      <div className="wrap">
        <Reveal>
          <SectionHeading idx={t('idx')} title={t('section_title')} moreText={t('all_projects')} moreLink="/arbeiten" />
        </Reveal>
        
        <div className="grid grid-cols-1 md:grid-cols-[1.3fr_1fr] gap-[clamp(1.5rem,3vw,3rem)] mb-[clamp(1.5rem,3vw,2.5rem)]">
          <Reveal delay={0.1}>
            <article className="h-full">
              <a href={featured[0].url} target="_blank" rel="noopener noreferrer" className="block relative rounded-[5px] overflow-hidden border border-[var(--color-line)] isolate group h-full flex flex-col">
                <div className="aspect-[16/10] relative overflow-hidden bg-[var(--color-surface)]">
                  <Image 
                    src={featured[0].image}
                    alt={`${featured[0].name} Preview`}
                    fill
                    className="object-cover object-top transition-transform duration-[0.8s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 60vw"
                  />
                </div>
                <div className="flex justify-between items-start gap-[1rem] p-[1.4rem_1.5rem] flex-grow bg-[var(--color-background)]">
                  <div>
                    <h3 className="font-semibold text-[clamp(1.5rem,2.6vw,2.1rem)] tracking-[-0.025em] transition-colors duration-300 group-hover:text-[var(--color-gold)]">{featured[0].name}</h3>
                    <div className="flex flex-wrap gap-[0.4rem] mt-[0.6rem]">
                      {featured[0].tags.map(tag => (
                        <span key={tag} className="mono !text-[0.76rem] !tracking-[0.06em] border border-[var(--color-line)] px-[0.75em] py-[0.34em] rounded-full text-[var(--color-muted)]">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <span className="mono !text-[0.86rem] text-[var(--color-muted)] !normal-case">{featured[0].year}</span>
                </div>
              </a>
            </article>
          </Reveal>
          
          <Reveal delay={0.2}>
            <article className="h-full">
              <a href={featured[1].url} target="_blank" rel="noopener noreferrer" className="block relative rounded-[5px] overflow-hidden border border-[var(--color-line)] isolate group h-full flex flex-col">
                <div className="aspect-[16/10] relative overflow-hidden bg-[var(--color-surface)]">
                  <Image 
                    src={featured[1].image}
                    alt={`${featured[1].name} Preview`}
                    fill
                    className="object-cover object-top transition-transform duration-[0.8s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 40vw"
                  />
                </div>
                <div className="flex justify-between items-start gap-[1rem] p-[1.4rem_1.5rem] flex-grow bg-[var(--color-background)]">
                  <div>
                    <h3 className="font-semibold text-[clamp(1.5rem,2.6vw,2.1rem)] tracking-[-0.025em] transition-colors duration-300 group-hover:text-[var(--color-gold)]">{featured[1].name}</h3>
                    <div className="flex flex-wrap gap-[0.4rem] mt-[0.6rem]">
                      {featured[1].tags.map(tag => (
                        <span key={tag} className="mono !text-[0.76rem] !tracking-[0.06em] border border-[var(--color-line)] px-[0.75em] py-[0.34em] rounded-full text-[var(--color-muted)]">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <span className="mono !text-[0.86rem] text-[var(--color-muted)] !normal-case">{featured[1].year}</span>
                </div>
              </a>
            </article>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
