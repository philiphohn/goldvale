import {getTranslations} from 'next-intl/server';
import SectionHeading from '@/components/ui/SectionHeading';
import Reveal from '@/components/ui/Reveal';
import {Link} from '@/i18n/routing';
import {getPosts} from '@/lib/journal';


import {getPageMetadata} from '@/lib/routes';

export async function generateMetadata({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'Meta'});
  return getPageMetadata(locale as any, '/journal', t('journal_title'), t('journal_description'), false);
}

export default async function JournalPage({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  const t = await getTranslations('Journal');
  const posts = getPosts(locale);

  return (
    <section className="sec min-h-screen" id="journal">
      <div className="wrap pt-20 pb-32">
        <Reveal>
          <SectionHeading as="h1" idx={t('idx')} title={t('section_title')} moreText={t('all_posts')} moreLink="/journal" />
        </Reveal>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-[clamp(1.2rem,2.5vw,2rem)] gap-y-[3rem]">
          {posts.map((post, index) => (
            <Reveal key={post.slug} delay={(index % 3) * 0.1}>
              <article>
                <Link href={`/journal/${post.slug}`} className="block border-t border-[var(--color-line)] pt-[1.4rem] transition-colors duration-400 hover:border-[var(--color-gold)] group">
                  <div className="flex justify-between mono !text-[0.9rem] !tracking-[0.05em] mb-[1.3rem]">
                    <span className="text-[var(--color-gold)]">{post.category}</span>
                    <span>{new Date(post.date).getFullYear()}</span>
                  </div>
                  <h3 className="font-semibold text-[clamp(1.5rem,2.2vw,2rem)] tracking-[-0.025em] leading-[1.18] transition-colors duration-300 group-hover:text-[var(--color-gold-hi)] mb-[1rem]">
                    {post.title}
                  </h3>
                  <p className="text-[var(--color-muted)] line-clamp-3 leading-[1.5]">
                    {post.excerpt}
                  </p>
                </Link>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
