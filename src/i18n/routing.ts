import {defineRouting} from 'next-intl/routing';
import {createNavigation} from 'next-intl/navigation';

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ['en', 'de'],
 
  // Used when no locale matches
  defaultLocale: 'de',

  // The `pathnames` object allows mapping internal paths to localized external paths
  pathnames: {
    '/': '/',
    '/arbeiten': {
      en: '/work',
      de: '/arbeiten'
    },
    '/leistungen': {
      en: '/services',
      de: '/leistungen'
    },
    '/studio': '/studio',
    '/journal': '/journal',
    '/journal/[slug]': '/journal/[slug]',
    '/kontakt': {
      en: '/contact',
      de: '/kontakt'
    },
    '/impressum': {
      en: '/imprint',
      de: '/impressum'
    },
    '/datenschutz': {
      en: '/privacy',
      de: '/datenschutz'
    }
  }
});

// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
export const {Link, redirect, usePathname, useRouter, getPathname} =
  createNavigation(routing);
