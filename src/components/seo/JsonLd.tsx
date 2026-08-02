import { SITE_URL } from '@/lib/site-url';

export default function JsonLd() {
  const professionalServiceData = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'Goldvale Studios',
    legalName: 'HBC Hohn Business Consulting UG (haftungsbeschränkt)',
    url: SITE_URL,
    logo: `${SITE_URL}/opengraph-image.jpg`,
    image: `${SITE_URL}/opengraph-image.jpg`,
    description: 'Goldvale Studios ist ein Digitalstudio für Websites, App-Entwicklung, Marken und Strategie.',
    telephone: '+4915678412954',
    email: 'hello@goldvalestudios.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Lerchenstraße 7',
      addressLocality: 'Berlin',
      postalCode: '14089',
      addressCountry: 'DE'
    },
    founder: {
      '@type': 'Person',
      name: 'Philip Hohn'
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '18:00'
      }
    ]
  };

  const websiteData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Goldvale Studios',
    url: SITE_URL,
    inLanguage: ['de', 'en'],
    publisher: {
      '@type': 'Organization',
      name: 'Goldvale Studios',
      url: SITE_URL
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(professionalServiceData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteData) }}
      />
    </>
  );
}
