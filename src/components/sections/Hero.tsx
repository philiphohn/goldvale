import {useTranslations} from 'next-intl';
import {Link} from '@/i18n/routing';
import AnimatedCanvas from '@/components/ui/AnimatedCanvas';

export default function Hero() {
  const t = useTranslations('Hero');

  return (
    <header className="pt-[clamp(10rem,20vh,16rem)] pb-[clamp(5.5rem,12vw,10rem)] relative overflow-hidden">
      <AnimatedCanvas />
      
      <div className="wrap relative z-10">
        <h1 className="font-sans font-semibold text-[clamp(2.6rem,7.4vw,6.6rem)] leading-[0.98] tracking-[-0.035em] lowercase max-w-[16ch]">
          <span className="inline-block animate-[word_0.8s_cubic-bezier(0.16,1,0.3,1)_forwards] opacity-0 translate-y-[0.5em]" style={{animationDelay: '0.15s'}}>{t('line1')}</span>{' '}
          <span className="inline-block animate-[word_0.8s_cubic-bezier(0.16,1,0.3,1)_forwards] opacity-0 translate-y-[0.5em]" style={{animationDelay: '0.25s'}}>{t('line2')}</span>{' '}
          <span className="inline-block animate-[word_0.8s_cubic-bezier(0.16,1,0.3,1)_forwards] opacity-0 translate-y-[0.5em]" style={{animationDelay: '0.35s'}}>{t('line3')}</span>{' '}
          <em className="inline-block animate-[word_0.8s_cubic-bezier(0.16,1,0.3,1)_forwards] opacity-0 translate-y-[0.5em] font-serif italic font-normal text-[var(--color-gold)] normal-case tracking-[-0.01em]" style={{animationDelay: '0.45s'}}>{t('line4')}</em>{' '}
          <span className="inline-block animate-[word_0.8s_cubic-bezier(0.16,1,0.3,1)_forwards] opacity-0 translate-y-[0.5em]" style={{animationDelay: '0.55s'}}>{t('line5')}</span>
        </h1>
        
        <p className="mt-[clamp(2.2rem,5vw,3.5rem)] max-w-[52ch] text-[clamp(1.2rem,1.7vw,1.5rem)] leading-[1.55] text-[var(--color-muted)] opacity-0 animate-[fade_1s_0.7s_forwards]">
          {t('p1')}
          <Link href="/leistungen" className="text-[var(--color-white)] border-b border-[var(--color-gold)] pb-[0.05em] transition-colors duration-300 hover:text-[var(--color-pop)] hover:border-[var(--color-pop)]">{t('p2_websites')}</Link>
          {t('p3')}
          <Link href="/leistungen" className="text-[var(--color-white)] border-b border-[var(--color-gold)] pb-[0.05em] transition-colors duration-300 hover:text-[var(--color-pop)] hover:border-[var(--color-pop)]">{t('p4_app')}</Link>
          {t('p5')}
          <Link href="/leistungen" className="text-[var(--color-white)] border-b border-[var(--color-gold)] pb-[0.05em] transition-colors duration-300 hover:text-[var(--color-pop)] hover:border-[var(--color-pop)]">{t('p6_marken')}</Link>
          {t('p7')}
          <Link href="/leistungen" className="text-[var(--color-white)] border-b border-[var(--color-gold)] pb-[0.05em] transition-colors duration-300 hover:text-[var(--color-pop)] hover:border-[var(--color-pop)]">{t('p8_strategie')}</Link>
          {t('p9')}
        </p>
        
        <div className="flex flex-wrap gap-[2rem] mt-[clamp(2.5rem,5vw,4rem)] opacity-0 animate-[fade_1s_1s_forwards] mono">
          <span>{t('meta1')}</span>
          <span>{t('meta2')}</span>
        </div>
      </div>
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fade { to { opacity: 1; } }
        @keyframes word { to { opacity: 1; transform: none; } }
        @media (prefers-reduced-motion: reduce) {
          .animate-\\[word_0\\.8s_cubic-bezier\\(0\\.16\\,1\\,0\\.3\\,1\\)_forwards\\],
          .animate-\\[fade_1s_0\\.7s_forwards\\],
          .animate-\\[fade_1s_1s_forwards\\] {
            animation: none !important;
            opacity: 1 !important;
            transform: none !important;
          }
        }
      `}} />
    </header>
  );
}
