import {notFound} from 'next/navigation';
import {MDXRemote} from 'next-mdx-remote/rsc';
import {getPostBySlug, getPosts} from '@/lib/journal';
import Reveal from '@/components/ui/Reveal';
import {Link} from '@/i18n/routing';
import Mermaid from '@/components/ui/Mermaid';
import {SITE_URL} from '@/lib/site-url';

import {getPageMetadata} from '@/lib/routes';

export async function generateMetadata({params}: {params: Promise<{locale: string; slug: string}>}) {
  const {locale, slug} = await params;
  const post = getPostBySlug(slug, locale);
  
  if (!post) {
    return {
      title: 'Post not found',
    };
  }
  
  const baseMeta = getPageMetadata(locale as any, `/journal/${slug}`, post.title, post.excerpt);
  return {
    ...baseMeta,
    openGraph: {
      ...baseMeta.openGraph,
      type: 'article',
      publishedTime: post.date,
    },
  };
}

export async function generateStaticParams({params}: any) {
  const resolvedParams = await params;
  const posts = getPosts(resolvedParams.locale);
  return posts.map((post: any) => ({
    slug: post.slug,
  }));
}

// Custom components for MDX
const mdxComponents = {
  h1: (props: any) => <h1 className="font-semibold text-[clamp(2.2rem,4vw,3.2rem)] tracking-[-0.025em] mb-[1.5rem] mt-[3rem]" {...props} />,
  h2: (props: any) => <h2 className="font-semibold text-[clamp(1.8rem,3vw,2.4rem)] tracking-[-0.02em] mb-[1.2rem] mt-[3rem]" {...props} />,
  h3: (props: any) => <h3 className="font-semibold text-[clamp(1.5rem,2vw,1.8rem)] tracking-[-0.02em] mb-[1rem] mt-[2rem]" {...props} />,
  p: (props: any) => <p className="text-[var(--color-muted)] text-[clamp(1.1rem,1.5vw,1.25rem)] leading-[1.65] mb-[1.5rem]" {...props} />,
  ul: (props: any) => <ul className="list-disc list-outside ml-[1.5rem] text-[var(--color-muted)] text-[clamp(1.1rem,1.5vw,1.25rem)] leading-[1.65] mb-[1.5rem] flex flex-col gap-[0.5rem]" {...props} />,
  ol: (props: any) => <ol className="list-decimal list-outside ml-[1.5rem] text-[var(--color-muted)] text-[clamp(1.1rem,1.5vw,1.25rem)] leading-[1.65] mb-[1.5rem] flex flex-col gap-[0.5rem]" {...props} />,
  li: (props: any) => <li {...props} />,
  strong: (props: any) => <strong className="font-semibold text-[var(--color-white)]" {...props} />,
  a: (props: any) => <a className="text-[var(--color-gold)] underline underline-offset-4 hover:text-[var(--color-gold-hi)] transition-colors" {...props} />,
  blockquote: (props: any) => <blockquote className="border-l-2 border-[var(--color-gold)] pl-[1.5rem] my-[2rem] italic text-[var(--color-white)] opacity-90" {...props} />,
  pre: (props: any) => {
    // Detect mermaid code blocks: <pre><code className="language-mermaid">...</code></pre>
    const child = props.children;
    if (child?.props?.className === 'language-mermaid') {
      return <Mermaid chart={child.props.children as string} />;
    }
    return <pre className="bg-[var(--color-surface)] border border-[var(--color-line)] rounded-lg p-[1.5rem] my-[2rem] overflow-x-auto text-[0.95rem] leading-[1.6]" {...props} />;
  },
  code: (props: any) => {
    // Inline code (not inside a pre)
    if (!props.className) {
      return <code className="bg-[var(--color-surface)] px-[0.4em] py-[0.15em] rounded text-[0.9em] text-[var(--color-gold)]" {...props} />;
    }
    return <code {...props} />;
  },
};

export default async function BlogPostPage({params}: {params: Promise<{locale: string; slug: string}>}) {
  const {locale, slug} = await params;
  const post = getPostBySlug(slug, locale);

  if (!post) {
    notFound();
  }

  // Format date
  const dateObj = new Date(post.date);
  const formattedDate = new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(dateObj);

  const blogPostingSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    author: {
      '@type': 'Person',
      name: 'Philip Hohn',
      url: `${SITE_URL}/${locale}/studio`
    },
    publisher: {
      '@type': 'Organization',
      name: 'Goldvale Studios',
      url: SITE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/opengraph-image.png`
      }
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/${locale}/journal/${slug}`
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingSchema) }}
      />
      <article className="pt-32 pb-32 min-h-screen">
      <div className="wrap max-w-[850px]">
        <Reveal>
          <div className="mb-[1rem]">
            <Link href="/journal" className="mono !text-[0.8rem] !tracking-[0.1em] text-[var(--color-muted-2)] hover:text-[var(--color-white)] transition-colors">
              &larr; BACK TO JOURNAL
            </Link>
          </div>
          
          <header className="mb-[3rem] pb-[3rem] border-b border-[var(--color-line)]">
            <div className="flex gap-[1rem] items-center mono !text-[0.85rem] !tracking-[0.05em] mb-[1.5rem]">
              <span className="text-[var(--color-gold)] px-[0.6em] py-[0.2em] border border-[var(--color-gold)] rounded-full">
                {post.category}
              </span>
              <time dateTime={post.date} className="text-[var(--color-muted)]">
                {formattedDate}
              </time>
            </div>
            
            <h1 className="font-semibold text-[clamp(2.5rem,5vw,4rem)] tracking-[-0.03em] leading-[1.1] mb-[1.5rem]">
              {post.title}
            </h1>
            
            <p className="text-[clamp(1.2rem,2vw,1.5rem)] text-[var(--color-muted)] leading-[1.5] max-w-[90%]">
              {post.excerpt}
            </p>
          </header>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mdx-content">
            <MDXRemote source={post.content} components={mdxComponents} />
          </div>
        </Reveal>
      </div>
    </article>
    </>
  );
}
