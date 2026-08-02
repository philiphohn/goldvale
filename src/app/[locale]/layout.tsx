import {NextIntlClientProvider} from 'next-intl';
import {getMessages, getTranslations, setRequestLocale} from 'next-intl/server';
import {notFound} from 'next/navigation';
import {routing} from '@/i18n/routing';
import {Fraunces, Hanken_Grotesk} from 'next/font/google';
import '../globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CookieBanner from '@/components/ui/CookieBanner';
import GoogleAnalytics from '@/components/analytics/GoogleAnalytics';
import StructuredData from '@/components/seo/StructuredData';
import { SITE_URL } from '@/lib/site-url';

const serif = Fraunces({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-serif',
  display: 'swap',
});

const sans = Hanken_Grotesk({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-sans',
  display: 'swap',
});

export async function generateMetadata({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;

  let title = 'Goldvale Studios — Digitalstudio für Websites & App-Entwicklung';
  let description = 'Wir bauen hochkonvertierende Websites, Web-Apps und digitale Marken für ambitionierte Unternehmen.';

  if (locale === 'en') {
    title = 'Goldvale Studios — Digital Studio for Websites & Apps';
    description = 'We build high-converting websites, web apps, and digital brands for ambitious companies.';
  } else if (locale === 'el') {
    title = 'Goldvale Studios — Ψηφιακό Studio για Websites & Εφαρμογές';
    description = 'Δημιουργούμε υψηλής απόδοσης websites, web apps και ψηφιακά brands για φιλόδοξες επιχειρήσεις.';
  }

  const canonicalUrl = `${SITE_URL}/${locale}`;

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      template: '%s | Goldvale Studios',
      default: title,
    },
    description: description,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        de: `${SITE_URL}/de`,
        en: `${SITE_URL}/en`,
        el: `${SITE_URL}/el`,
        'x-default': `${SITE_URL}/en`,
      },
    },
    openGraph: {
      title: title,
      description: description,
      url: canonicalUrl,
      siteName: 'Goldvale Studios',
      locale: locale === 'en' ? 'en_US' : locale === 'el' ? 'el_GR' : 'de_DE',
      type: 'website',
      images: [
        {
          url: '/opengraph-image.png',
          width: 1200,
          height: 630,
          alt: 'Goldvale Studios Logo',
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title: title,
      description: description,
      images: ['/opengraph-image.png']
    },
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();
  const tCookie = await getTranslations('Cookie');

  return (
    <html lang={locale} className={`${sans.variable} ${serif.variable}`}>
      <head>
        <StructuredData />
        <link rel="apple-touch-icon" sizes="57x57" href="/apple-icon-57x57.png" />
        <link rel="apple-touch-icon" sizes="60x60" href="/apple-icon-60x60.png" />
        <link rel="apple-touch-icon" sizes="72x72" href="/apple-icon-72x72.png" />
        <link rel="apple-touch-icon" sizes="76x76" href="/apple-icon-76x76.png" />
        <link rel="apple-touch-icon" sizes="114x114" href="/apple-icon-114x114.png" />
        <link rel="apple-touch-icon" sizes="120x120" href="/apple-icon-120x120.png" />
        <link rel="apple-touch-icon" sizes="144x144" href="/apple-icon-144x144.png" />
        <link rel="apple-touch-icon" sizes="152x152" href="/apple-icon-152x152.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-icon-180x180.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/android-icon-192x192.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="msapplication-TileColor" content="#14161a" />
        <meta name="msapplication-TileImage" content="/ms-icon-144x144.png" />
        <meta name="theme-color" content="#14161a" />
      </head>
      <body>
        <NextIntlClientProvider messages={messages}>
          <Header />
          <main>
            {children}
          </main>
          <Footer />
          <CookieBanner 
            text={tCookie('text')}
            accept={tCookie('accept')}
            reject={tCookie('reject')}
            policy={tCookie('policy')}
          />
        </NextIntlClientProvider>
        <GoogleAnalytics gaId="G-1K7SKK4ZDS" />
      </body>
    </html>
  );
}
