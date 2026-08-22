import { SITE_URL } from '@/lib/site-url';

export const routeMap: Record<string, { en: string; de: string; el: string }> = {
  '/arbeiten': { en: '/work', de: '/arbeiten', el: '/erga' },
  '/leistungen': { en: '/services', de: '/leistungen', el: '/ypiresies' },
  '/kontakt': { en: '/contact', de: '/kontakt', el: '/epikoinonia' },
  '/impressum': { en: '/imprint', de: '/impressum', el: '/nomika' },
  '/datenschutz': { en: '/privacy', de: '/datenschutz', el: '/prostasia-dedomenon' },
  '/hospitality': { en: '/hospitality', de: '/hospitality', el: '/hospitality' },
  '/webdesign-berlin': { en: '/webdesign-berlin', de: '/webdesign-berlin', el: '/webdesign-berlin' },
  '/tools/ota-provisionsrechner': { en: '/tools/ota-commission-calculator', de: '/tools/ota-provisionsrechner', el: '/ergaleia/ypologistis-promitheion-ota' },
};

export function getLocalizedPath(route: string, locale: 'de' | 'en' | 'el') {
  if (routeMap[route]) {
    return `/${locale}${routeMap[route][locale]}`;
  }
  
  // Handle dynamic journal routes like /journal/some-slug
  if (route.startsWith('/journal/')) {
    return `/${locale}${route}`;
  }
  
  // Fallback for identical static routes like /, /studio, /journal
  return `/${locale}${route === '/' ? '' : route}`;
}

export function getPageMetadata(
  locale: 'de' | 'en' | 'el',
  route: string,
  title: string,
  description: string,
  absoluteTitle: boolean = false
) {
  const canonicalUrl = `${SITE_URL}${getLocalizedPath(route, locale)}`;
  
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        de: `${SITE_URL}${getLocalizedPath(route, 'de')}`,
        en: `${SITE_URL}${getLocalizedPath(route, 'en')}`,
        el: `${SITE_URL}${getLocalizedPath(route, 'el')}`,
        'x-default': `${SITE_URL}${getLocalizedPath(route, 'en')}`,
      }
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: 'Goldvale Studios',
      locale: locale === 'en' ? 'en_US' : locale === 'el' ? 'el_GR' : 'de_DE',
      type: 'website',
      images: [
        {
          url: `${SITE_URL}/opengraph-image.png`,
          width: 1200,
          height: 630,
          alt: title,
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`${SITE_URL}/opengraph-image.png`]
    }
  };
}
