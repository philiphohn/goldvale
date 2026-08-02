'use client';

import Image from 'next/image';
import {useEffect, useState} from 'react';
import {useTranslations, useLocale} from 'next-intl';
import {Link, usePathname} from '@/i18n/routing';
import {useParams} from 'next/navigation';

export default function Header() {
  const t = useTranslations('Nav');
  const locale = useLocale();
  const pathname = usePathname();
  const params = useParams();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, {passive: true});
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-60 grid grid-cols-2 md:grid-cols-[1fr_auto_1fr] items-center px-[clamp(1.4rem,5vw,5rem)] transition-all duration-500 border-b ${
        scrolled
          ? 'bg-[rgba(var(--bg-rgb),0.85)] backdrop-blur-[14px] py-[1.05rem] border-[var(--color-line)]'
          : 'py-[1.5rem] border-transparent'
      }`}
    >
      <div className="hidden md:flex gap-[1.8rem]">
        <Link href="/arbeiten" className="relative text-[1rem] tracking-[0.02em] text-[var(--color-muted)] transition-colors duration-300 hover:text-[var(--color-white)] after:content-[''] after:absolute after:left-0 after:-bottom-[5px] after:h-[1px] after:w-0 after:bg-[var(--color-pop)] after:transition-all after:duration-350 hover:after:w-full">
          {t('arbeiten')}
        </Link>
        <Link href="/leistungen" className="relative text-[1rem] tracking-[0.02em] text-[var(--color-muted)] transition-colors duration-300 hover:text-[var(--color-white)] after:content-[''] after:absolute after:left-0 after:-bottom-[5px] after:h-[1px] after:w-0 after:bg-[var(--color-pop)] after:transition-all after:duration-350 hover:after:w-full">
          {t('leistungen')}
        </Link>
        <Link href="/hospitality" className="relative text-[1rem] tracking-[0.02em] text-[var(--color-muted)] transition-colors duration-300 hover:text-[var(--color-white)] after:content-[''] after:absolute after:left-0 after:-bottom-[5px] after:h-[1px] after:w-0 after:bg-[var(--color-pop)] after:transition-all after:duration-350 hover:after:w-full">
          {t('hospitality')}
        </Link>
        <Link href="/studio" className="relative text-[1rem] tracking-[0.02em] text-[var(--color-muted)] transition-colors duration-300 hover:text-[var(--color-white)] after:content-[''] after:absolute after:left-0 after:-bottom-[5px] after:h-[1px] after:w-0 after:bg-[var(--color-pop)] after:transition-all after:duration-350 hover:after:w-full">
          {t('studio')}
        </Link>
        <Link href="/journal" className="relative text-[1rem] tracking-[0.02em] text-[var(--color-muted)] transition-colors duration-300 hover:text-[var(--color-white)] after:content-[''] after:absolute after:left-0 after:-bottom-[5px] after:h-[1px] after:w-0 after:bg-[var(--color-pop)] after:transition-all after:duration-350 hover:after:w-full">
          {t('journal')}
        </Link>
      </div>

      <Link href="/" className="flex items-center justify-self-start md:justify-self-center group py-1" aria-label="Goldvale Studios">
        <Image
          src="/images/goldvalestudios.svg"
          alt="Goldvale Studios"
          width={240}
          height={90}
          className="h-[70px] md:h-[80px] w-auto object-contain transition-opacity duration-300 group-hover:opacity-90"
          priority
        />
      </Link>

      <div className="hidden md:flex gap-[1.6rem] items-center justify-self-end">
        <div className="inline-flex items-center gap-[0.4rem] text-[0.92rem] tracking-[0.04em]" role="group" aria-label="Language switch">
          <Link
            href={{pathname: pathname as any, params: params as any} as any}
            locale="de"
            className={`transition-colors duration-300 ${locale === 'de' ? 'text-[var(--color-gold)]' : 'text-[var(--color-muted)] hover:text-[var(--color-white)]'}`}
          >
            DE
          </Link>
          <span className="text-[var(--color-muted-2)]">/</span>
          <Link
            href={{pathname: pathname as any, params: params as any} as any}
            locale="en"
            className={`transition-colors duration-300 ${locale === 'en' ? 'text-[var(--color-gold)]' : 'text-[var(--color-muted)] hover:text-[var(--color-white)]'}`}
          >
            EN
          </Link>
          <span className="text-[var(--color-muted-2)]">/</span>
          <Link
            href={{pathname: pathname as any, params: params as any} as any}
            locale="el"
            className={`transition-colors duration-300 ${locale === 'el' ? 'text-[var(--color-gold)]' : 'text-[var(--color-muted)] hover:text-[var(--color-white)]'}`}
          >
            EL
          </Link>
        </div>
        <Link href="/kontakt" className="text-[0.95rem] tracking-[0.02em] text-white border border-[var(--color-line)] px-[1.25rem] py-[0.65rem] rounded-full transition-all duration-350 hover:border-[var(--color-pop)] hover:bg-[var(--color-pop)] hover:text-white">
          {t('erstgespraech')}
        </Link>
      </div>

      <button 
        className="md:hidden flex flex-col gap-[5px] justify-self-end items-end p-2" 
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle Navigation"
        aria-expanded={menuOpen}
      >
        <span className="w-[24px] h-[1.5px] bg-white block"></span>
        <span className="w-[24px] h-[1.5px] bg-white block"></span>
        <span className="w-[24px] h-[1.5px] bg-white block"></span>
      </button>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute top-full left-0 right-0 bg-[var(--color-background)] border-b border-[var(--color-line)] p-6 flex flex-col gap-6 md:hidden">
          <div className="flex flex-col gap-4 text-xl">
            <Link href="/arbeiten" onClick={() => setMenuOpen(false)}>{t('arbeiten')}</Link>
            <Link href="/leistungen" onClick={() => setMenuOpen(false)}>{t('leistungen')}</Link>
            <Link href="/hospitality" onClick={() => setMenuOpen(false)}>{t('hospitality')}</Link>
            <Link href="/studio" onClick={() => setMenuOpen(false)}>{t('studio')}</Link>
            <Link href="/journal" onClick={() => setMenuOpen(false)}>{t('journal')}</Link>
            <Link href="/kontakt" className="text-[var(--color-gold)]" onClick={() => setMenuOpen(false)}>{t('erstgespraech')}</Link>
          </div>
          <div className="inline-flex items-center gap-2 mt-4 pt-4 border-t border-[var(--color-line)]">
            
<Link href={{pathname: pathname as any, params: params as any} as any} locale="de" onClick={() => setMenuOpen(false)} className={locale === 'de' ? 'text-[var(--color-gold)]' : 'text-[var(--color-muted)]'}>DE</Link>
            <span className="text-[var(--color-muted-2)]">/</span>
            
<Link href={{pathname: pathname as any, params: params as any} as any} locale="en" onClick={() => setMenuOpen(false)} className={locale === 'en' ? 'text-[var(--color-gold)]' : 'text-[var(--color-muted)]'}>EN</Link>
            <span className="text-[var(--color-muted-2)]">/</span>
            
<Link href={{pathname: pathname as any, params: params as any} as any} locale="el" onClick={() => setMenuOpen(false)} className={locale === 'el' ? 'text-[var(--color-gold)]' : 'text-[var(--color-muted)]'}>EL</Link>
          </div>
        </div>
      )}
    </nav>
  );
}
