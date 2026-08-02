import {MetadataRoute} from 'next';
import {getPosts} from '@/lib/journal';
import {SITE_URL} from '@/lib/site-url';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_URL;

  const staticRoutes = [
    { route: '', priority: 1.0, changeFrequency: 'weekly' as const },
    { route: '/studio', priority: 0.8, changeFrequency: 'weekly' as const },
    { route: '/leistungen', priority: 0.8, changeFrequency: 'weekly' as const },
    { route: '/hospitality', priority: 0.8, changeFrequency: 'monthly' as const },
    { route: '/webdesign-berlin', priority: 0.8, changeFrequency: 'monthly' as const },
    { route: '/arbeiten', priority: 0.8, changeFrequency: 'weekly' as const },
    { route: '/journal', priority: 0.8, changeFrequency: 'weekly' as const },
    { route: '/kontakt', priority: 0.8, changeFrequency: 'weekly' as const },
    { route: '/impressum', priority: 0.3, changeFrequency: 'monthly' as const },
    { route: '/datenschutz', priority: 0.3, changeFrequency: 'monthly' as const },
  ];

  const getLocalizedPath = (route: string, locale: 'de' | 'en' | 'el') => {
    if (locale === 'de') {
      if (route === '/arbeiten') return '/de/arbeiten';
      if (route === '/leistungen') return '/de/leistungen';
      if (route === '/hospitality') return '/de/hospitality';
      if (route === '/kontakt') return '/de/kontakt';
      if (route === '/impressum') return '/de/impressum';
      if (route === '/datenschutz') return '/de/datenschutz';
      return `/de${route}`;
    } else if (locale === 'el') {
      if (route === '/arbeiten') return '/el/erga';
      if (route === '/leistungen') return '/el/ypiresies';
      if (route === '/hospitality') return '/el/hospitality';
      if (route === '/kontakt') return '/el/epikoinonia';
      if (route === '/impressum') return '/el/nomika';
      if (route === '/datenschutz') return '/el/prostasia-dedomenon';
      return `/el${route}`;
    } else {
      if (route === '/arbeiten') return '/en/work';
      if (route === '/leistungen') return '/en/services';
      if (route === '/hospitality') return '/en/hospitality';
      if (route === '/kontakt') return '/en/contact';
      if (route === '/impressum') return '/en/imprint';
      if (route === '/datenschutz') return '/en/privacy';
      return `/en${route}`;
    }
  };

  const locales: ('de' | 'en' | 'el')[] = ['de', 'en', 'el'];

  const sitemapEntries: MetadataRoute.Sitemap = staticRoutes.flatMap(({ route, priority, changeFrequency }) => {
    const deUrl = `${baseUrl}${getLocalizedPath(route, 'de')}`;
    const enUrl = `${baseUrl}${getLocalizedPath(route, 'en')}`;
    const elUrl = `${baseUrl}${getLocalizedPath(route, 'el')}`;

    const languages = {
      de: deUrl,
      en: enUrl,
      el: elUrl,
      'x-default': enUrl,
    };

    return locales.map((locale) => ({
      url: `${baseUrl}${getLocalizedPath(route, locale)}`,
      lastModified: new Date(),
      changeFrequency,
      priority,
      alternates: {
        languages,
      },
    }));
  });

  // Add Dynamic Journal Posts
  const journalPosts = getPosts('de');
  
  const journalEntries: MetadataRoute.Sitemap = journalPosts.flatMap((post) => {
    const deUrl = `${baseUrl}/de/journal/${post.slug}`;
    const enUrl = `${baseUrl}/en/journal/${post.slug}`;
    const elUrl = `${baseUrl}/el/journal/${post.slug}`;

    const languages = {
      de: deUrl,
      en: enUrl,
      el: elUrl,
      'x-default': enUrl,
    };

    return locales.map((locale) => ({
      url: `${baseUrl}/${locale}/journal/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
      alternates: {
        languages,
      },
    }));
  });

  return [...sitemapEntries, ...journalEntries];
}
