import {MetadataRoute} from 'next';
import {routing} from '@/i18n/routing';
import {getPosts} from '@/lib/journal';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://goldvale.de';

  const staticRoutes = [
    '',
    '/studio',
    '/leistungen',
    '/arbeiten',
    '/journal',
    '/kontakt',
    '/impressum',
    '/datenschutz',
  ];

  const sitemapEntries: MetadataRoute.Sitemap = staticRoutes.map((route) => {
    return {
      url: `${baseUrl}/de${route}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: route === '' ? 1 : 0.8,
      alternates: {
        languages: {
          de: `${baseUrl}/de${route}`,
          en: `${baseUrl}/en${route === '/arbeiten' ? '/work' : route === '/leistungen' ? '/services' : route === '/kontakt' ? '/contact' : route === '/impressum' ? '/imprint' : route === '/datenschutz' ? '/privacy' : route}`,
          'x-default': `${baseUrl}/de${route}`,
        },
      },
    };
  });

  // Add Dynamic Journal Posts
  const journalPosts = getPosts('de'); // we use 'de' as the base reference to get all slugs
  
  const journalEntries: MetadataRoute.Sitemap = journalPosts.map((post) => {
    return {
      url: `${baseUrl}/de/journal/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: 'monthly',
      priority: 0.7,
      alternates: {
        languages: {
          de: `${baseUrl}/de/journal/${post.slug}`,
          en: `${baseUrl}/en/journal/${post.slug}`,
          'x-default': `${baseUrl}/de/journal/${post.slug}`,
        },
      },
    };
  });

  return [...sitemapEntries, ...journalEntries];
}
