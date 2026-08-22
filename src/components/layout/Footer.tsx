'use client';

import {useTranslations, useLocale} from 'next-intl';
import {Link, usePathname} from '@/i18n/routing';
import {useParams} from 'next/navigation';

export default function Footer() {
  const t = useTranslations('Footer');
  const tNav = useTranslations('Nav');
  const locale = useLocale();
  const pathname = usePathname();
  const params = useParams();

  return (
    <footer className="py-[clamp(4rem,8vw,6rem)] pb-[2.5rem]">
      <div className="wrap">
        <div className="font-sans font-semibold text-[clamp(2.2rem,7vw,5.5rem)] tracking-[-0.035em] lowercase leading-[1]">
          {t('big_1')}
          <Link href="/kontakt" className="transition-colors duration-300 hover:text-[var(--color-gold)] inline-flex items-center">
            {t('big_2')}
            <svg className="w-[0.7em] h-[0.7em] inline-block -align-[0.04em] ml-[0.28em] fill-none stroke-current stroke-[2.6] stroke-round stroke-linejoin-round" viewBox="0 0 24 24">
              <path d="m9 18 6-6-6-6" />
            </svg>
          </Link>
        </div>
        
        <div className="flex justify-between flex-wrap gap-[2rem] mt-[clamp(2.5rem,5vw,4rem)] pt-[2.5rem] border-t border-[var(--color-line)]">
          <div className="flex flex-col">
            <h4 className="mono text-[var(--color-gold)] mb-[1rem]">{t('col_studio')}</h4>
            <Link href="/arbeiten" className="block text-[var(--color-muted)] text-[1rem] mb-[0.6rem] transition-colors duration-300 hover:text-[var(--color-white)]">{tNav('arbeiten')}</Link>
            <Link href="/leistungen" className="block text-[var(--color-muted)] text-[1rem] mb-[0.6rem] transition-colors duration-300 hover:text-[var(--color-white)]">{tNav('leistungen')}</Link>
            <Link href="/studio" className="block text-[var(--color-muted)] text-[1rem] mb-[0.6rem] transition-colors duration-300 hover:text-[var(--color-white)]">{tNav('studio')}</Link>
            <Link href="/journal" className="block text-[var(--color-muted)] text-[1rem] mb-[0.6rem] transition-colors duration-300 hover:text-[var(--color-white)]">{tNav('journal')}</Link>
          </div>
          
          <div className="flex flex-col">
            <h4 className="mono text-[var(--color-gold)] mb-[1rem]">{t('col_industries')}</h4>
            <Link href="/hospitality" className="block text-[var(--color-muted)] text-[1rem] mb-[0.6rem] transition-colors duration-300 hover:text-[var(--color-white)]">{tNav('hospitality')}</Link>
            <Link href="/tools/ota-provisionsrechner" className="block text-[var(--color-muted)] text-[1rem] mb-[0.6rem] transition-colors duration-300 hover:text-[var(--color-white)]">{locale === 'el' ? 'Υπολογιστής OTA' : locale === 'en' ? 'OTA Calculator' : 'OTA-Provisionsrechner'}</Link>
          </div>
          
          <div className="flex flex-col">
            <h4 className="mono text-[var(--color-gold)] mb-[1rem]">{t('col_contact')}</h4>
            <a href="mailto:hello@goldvalestudios.com" className="block text-[var(--color-muted)] text-[1rem] mb-[0.6rem] transition-colors duration-300 hover:text-[var(--color-white)]">hello@goldvalestudios.com</a>
            <a href={`tel:${t('phone_raw')}`} className="block text-[var(--color-muted)] text-[1rem] mb-[0.6rem] transition-colors duration-300 hover:text-[var(--color-white)]">{t('phone')}</a>
            <a href="https://www.goldvalestudios.com" className="block text-[var(--color-muted)] text-[1rem] mb-[0.6rem] transition-colors duration-300 hover:text-[var(--color-white)]">goldvalestudios.com</a>
          </div>
          
          <div className="flex flex-col">
            <h4 className="mono text-[var(--color-gold)] mb-[1rem]">{t('col_social')}</h4>
            <a href="https://www.instagram.com/goldvalestudios" target="_blank" rel="noopener noreferrer" className="block text-[var(--color-muted)] text-[1rem] mb-[0.6rem] transition-colors duration-300 hover:text-[var(--color-white)]">Instagram</a>
            <a href="https://www.linkedin.com/company/goldvalestudios" target="_blank" rel="noopener noreferrer" className="block text-[var(--color-muted)] text-[1rem] mb-[0.6rem] transition-colors duration-300 hover:text-[var(--color-white)]">LinkedIn</a>
          </div>
          
          <div className="flex flex-col">
            <h4 className="mono text-[var(--color-gold)] mb-[1rem]">{t('col_legal')}</h4>
            <Link href="/impressum" className="block text-[var(--color-muted)] text-[1rem] mb-[0.6rem] transition-colors duration-300 hover:text-[var(--color-white)]">{t('impressum')}</Link>
            <Link href="/datenschutz" className="block text-[var(--color-muted)] text-[1rem] mb-[0.6rem] transition-colors duration-300 hover:text-[var(--color-white)]">{t('datenschutz')}</Link>
          </div>
        </div>
        
        <div className="flex justify-between flex-wrap gap-[1rem] mt-[3rem] mono tracking-[0.03em] text-[var(--color-muted-2)] !text-[0.82rem] !normal-case">
          <span>© 2026 Goldvale Studios</span>
          <div className="inline-flex items-center gap-[0.4rem] tracking-[0.04em]" role="group" aria-label="Language switch">
            
<Link href={{pathname: pathname as any, params: params as any} as any} locale="de" className={`transition-colors duration-300 uppercase ${locale === 'de' ? 'text-[var(--color-gold)]' : 'text-[var(--color-muted-2)] hover:text-[var(--color-white)]'}`}>DE</Link>
            <span className="text-[var(--color-muted-2)]">/</span>
            
<Link href={{pathname: pathname as any, params: params as any} as any} locale="en" className={`transition-colors duration-300 uppercase ${locale === 'en' ? 'text-[var(--color-gold)]' : 'text-[var(--color-muted-2)] hover:text-[var(--color-white)]'}`}>EN</Link>
            <span className="text-[var(--color-muted-2)]">/</span>
            
<Link href={{pathname: pathname as any, params: params as any} as any} locale="el" className={`transition-colors duration-300 uppercase ${locale === 'el' ? 'text-[var(--color-gold)]' : 'text-[var(--color-muted-2)] hover:text-[var(--color-white)]'}`}>EL</Link>
          </div>
          <span>{t('tagline')}</span>
        </div>
      </div>
    </footer>
  );
}
