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
import JsonLd from '@/components/seo/JsonLd';

const serif = Fraunces({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
});

const sans = Hanken_Grotesk({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

export async function generateMetadata({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'Nav'}); // Nav or maybe we can just create a global meta namespace? The Nav currently doesn't have a meta tag. Let's use hardcoded strings with locale check, or we already have Hero metadata.

  const title = locale === 'en' ? 'Goldvale Studios — Digital Studio for Websites & Apps' : 'Goldvale Studios — Digitalstudio für Websites & App-Entwicklung';
  const description = locale === 'en' ? 'We build high-converting websites, web apps, and digital brands for ambitious companies.' : 'Wir bauen hochkonvertierende Websites, Web-Apps und digitale Marken für ambitionierte Unternehmen.';

  return {
    metadataBase: new URL('https://goldvale.de'),
    title: {
      template: '%s | Goldvale Studios',
      default: title,
    },
    description: description,
    openGraph: {
      title: 'Goldvale Studios',
      description: description,
      url: 'https://goldvale.de',
      siteName: 'Goldvale Studios',
      locale: locale === 'en' ? 'en_US' : 'de_DE',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Goldvale Studios',
      description: description,
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
        <JsonLd />
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
        <GoogleAnalytics gaId="G-XXXXXXXXXX" />
      </body>
    </html>
  );
}
