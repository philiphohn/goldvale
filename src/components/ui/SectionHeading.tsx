import {Link} from '@/i18n/routing';

interface SectionHeadingProps {
  idx: string;
  title: string;
  moreText?: string;
  moreLink?: string;
  as?: 'h1' | 'h2';
}

export default function SectionHeading({idx, title, moreText, moreLink, as = 'h2'}: SectionHeadingProps) {
  const HeadingTag = as;
  return (
    <div className="flex justify-between items-baseline gap-[1.5rem] flex-wrap mb-[clamp(2.5rem,5vw,4rem)] border-t border-[var(--color-line)] pt-[1.6rem]">
      <span className="mono text-[var(--color-gold)]">{idx}</span>
      <HeadingTag className="font-semibold text-[clamp(1.9rem,3.4vw,2.9rem)] tracking-[-0.025em] lowercase">{title}</HeadingTag>
      {moreText && moreLink && (
        <Link href={moreLink as any} className="mono !text-[0.84rem] !tracking-[0.08em] !text-[var(--color-muted)] transition-colors duration-300 hover:!text-[var(--color-pop)] inline-flex items-center">
          {moreText}
          <svg className="w-[0.7em] h-[0.7em] inline-block -align-[0.04em] ml-[0.28em] fill-none stroke-current stroke-[2.6] stroke-round stroke-linejoin-round" viewBox="0 0 24 24">
            <path d="m9 18 6-6-6-6" />
          </svg>
        </Link>
      )}
    </div>
  );
}
