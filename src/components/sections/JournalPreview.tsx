import {useTranslations, useLocale} from 'next-intl';
import SectionHeading from '@/components/ui/SectionHeading';
import Reveal from '@/components/ui/Reveal';
import {Link} from '@/i18n/routing';
import {getPosts} from '@/lib/journal';

export default function JournalPreview() {
  const t = useTranslations('Journal');
  const locale = useLocale();
  const posts = getPosts(locale).slice(0, 3);

  return (
    <section className="sec" id="journal">
      <div className="wrap">
        <Reveal>
          <SectionHeading idx={t('idx')} title={t('section_title')} moreText={t('all_posts')} moreLink="/journal" />
        </Reveal>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-[clamp(1.2rem,2.5vw,2rem)]">
          {posts.map((post, index) => (
            <Reveal key={post.slug} delay={(index % 3) * 0.1}>
              <article>
                <Link href={`/journal/${post.slug}`} className="block border-t border-[var(--color-line)] pt-[1.4rem] transition-colors duration-400 hover:border-[var(--color-gold)] group">
                  <div className="flex justify-between mono !text-[0.9rem] !tracking-[0.05em] mb-[1.3rem]">
                    <span className="text-[var(--color-gold)]">{post.category}</span>
                    <span>{new Date(post.date).getFullYear()}</span>
                  </div>
                  <h3 className="font-semibold text-[clamp(1.5rem,2.2vw,2rem)] tracking-[-0.025em] leading-[1.18] transition-colors duration-300 group-hover:text-[var(--color-gold-hi)]">
                    {post.title}
                  </h3>
                </Link>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
