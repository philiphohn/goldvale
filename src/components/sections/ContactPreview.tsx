import {useTranslations} from 'next-intl';
import Reveal from '@/components/ui/Reveal';
import ContactForm from '@/components/ui/ContactForm';
import Image from 'next/image';

export default function ContactPreview({ source }: { source?: string }) {
  const t = useTranslations('Contact');

  return (
    <section className="bg-[var(--color-background-2)] border-b border-[var(--color-line)] pt-24 pb-12" id="kontakt">
      <div className="wrap">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-[clamp(2rem,5vw,5rem)] items-start py-[clamp(4rem,8vw,6rem)]">
          <Reveal>
            <h2 className="font-medium text-[clamp(2rem,4.5vw,3.6rem)] tracking-[-0.025em] lowercase leading-[1.02]">
              {t('title_1')}
              <em className="font-serif italic font-normal text-[var(--color-gold)] normal-case">{t('title_2')}</em>
            </h2>
            <p className="mt-[1.4rem] text-[var(--color-muted)] max-w-[44ch] text-[1.2rem]">
              {t('lead')}
            </p>
            
            <div className="mt-[2rem] flex flex-col gap-[0.6rem]">
              <a href="mailto:hello@goldvalestudios.com" className="text-[1.15rem] text-[var(--color-white)] transition-colors duration-300 w-max border-b border-[var(--color-line)] pb-[0.1em] hover:text-[var(--color-pop)] hover:border-[var(--color-pop)]">
                hello@goldvalestudios.com
              </a>
              <a href="tel:+4915678412954" className="text-[1.15rem] text-[var(--color-white)] transition-colors duration-300 w-max border-b border-[var(--color-line)] pb-[0.1em] hover:text-[var(--color-pop)] hover:border-[var(--color-pop)]">
                +49 15678 412954
              </a>
            </div>
            
            <ContactForm source={source} />
          </Reveal>
          
          <Reveal delay={0.2} className="md:justify-self-end mt-12 md:mt-0">
            <div className="text-center md:text-left flex flex-col items-center md:items-start">
              <div className="w-[150px] h-[150px] rounded-full mx-auto md:mx-0 mb-[1rem] overflow-hidden border border-[var(--color-line)] relative">
                <Image src="/images/founder.jpg" alt="Philip Hohn - Gründer & Ansprechpartner bei Goldvale Studios" fill className="object-cover" sizes="150px" />
              </div>
              <div className="font-medium text-[1.15rem]">Philip Hohn</div>
              <div className="mono !text-[0.8rem] !tracking-[0.08em] !text-[var(--color-muted)] mt-[0.35rem]">{t('person_role')}</div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
