import {defineRouting} from 'next-intl/routing';
import {createNavigation} from 'next-intl/navigation';

import {routeMap} from '@/lib/routes';

const pathnames: Record<string, string | Record<string, string>> = {
  '/': '/',
  '/studio': '/studio',
  '/journal': '/journal',
  '/journal/[slug]': '/journal/[slug]',
};

Object.keys(routeMap).forEach(key => {
  pathnames[key] = routeMap[key];
});

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ['en', 'de', 'el'],
 
  // Used when no locale matches
  defaultLocale: 'de',

  // The `pathnames` object allows mapping internal paths to localized external paths
  pathnames
});

// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
export const {Link, redirect, usePathname, useRouter, getPathname} =
  createNavigation(routing);
