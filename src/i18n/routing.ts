import {defineRouting} from 'next-intl/routing';
import {createNavigation} from 'next-intl/navigation';

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ['en', 'de', 'el'],
 
  // Used when no locale matches
  defaultLocale: 'de',

  // The `pathnames` object allows mapping internal paths to localized external paths
  pathnames: {
    '/': '/',
    '/arbeiten': {
      en: '/work',
      de: '/arbeiten',
      el: '/erga'
    },
    '/leistungen': {
      en: '/services',
      de: '/leistungen',
      el: '/ypiresies'
    },
    '/hospitality': '/hospitality',
    '/webdesign-berlin': '/webdesign-berlin',
    '/studio': '/studio',
    '/journal': '/journal',
    '/journal/[slug]': '/journal/[slug]',
    '/kontakt': {
      en: '/contact',
      de: '/kontakt',
      el: '/epikoinonia'
    },
    '/impressum': {
      en: '/imprint',
      de: '/impressum',
      el: '/nomika'
    },
    '/datenschutz': {
      en: '/privacy',
      de: '/datenschutz',
      el: '/prostasia-dedomenon'
    }
  }
});

// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
export const {Link, redirect, usePathname, useRouter, getPathname} =
  createNavigation(routing);
