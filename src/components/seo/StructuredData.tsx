import { SITE_URL } from '@/lib/site-url';

export default function StructuredData() {
  const organizationData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE_URL}/#organization`,
    name: 'Goldvale Studios',
    legalName: 'HBC Hohn Business Consulting UG (haftungsbeschränkt)',
    url: SITE_URL,
    logo: {
      '@type': 'ImageObject',
      url: `${SITE_URL}/images/goldvalestudios.svg`,
      width: '240',
      height: '90'
    },
    image: `${SITE_URL}/opengraph-image.png`,
    description: 'Goldvale Studios ist ein Digitalstudio für Websites, App-Entwicklung, Marken und Strategie.',
    email: 'hello@goldvalestudios.com',
    telephone: '+4915678412954',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Lerchenstraße 7',
      addressLocality: 'Berlin',
      postalCode: '14089',
      addressCountry: 'DE'
    },
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: '+4915678412954',
        contactType: 'customer service',
        email: 'hello@goldvalestudios.com',
        availableLanguage: ['German', 'English']
      },
      {
        '@type': 'ContactPoint',
        telephone: '+306974455142',
        contactType: 'customer service',
        email: 'hello@goldvalestudios.com',
        availableLanguage: ['English', 'German']
      }
    ],
    sameAs: [
      'https://www.linkedin.com/company/goldvalestudios',
      'https://www.instagram.com/goldvalestudios'
    ]
  };

  const professionalServiceData = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${SITE_URL}/#service`,
    name: 'Goldvale Studios',
    legalName: 'HBC Hohn Business Consulting UG (haftungsbeschränkt)',
    url: SITE_URL,
    logo: `${SITE_URL}/images/goldvalestudios.svg`,
    image: `${SITE_URL}/opengraph-image.png`,
    priceRange: '$$$',
    telephone: '+4915678412954',
    email: 'hello@goldvalestudios.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Lerchenstraße 7',
      addressLocality: 'Berlin',
      postalCode: '14089',
      addressCountry: 'DE'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 52.4862,
      longitude: 13.1558
    },
    founder: {
      '@type': 'Person',
      name: 'Philip Hohn'
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Digital Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Webdesign & Frontend Development',
            description: 'Custom high-performance websites built with Next.js and Headless CMS.'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'App & Product Development',
            description: 'Web applications, SaaS products, and native mobile apps.'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Hospitality Web Solutions',
            description: 'Direct booking engines and websites for hotels, vacation rentals, and short-term rentals.'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Branding & Design Systems',
            description: 'Visual identity, design tokens, and scalable component systems.'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Digital Strategy & UX Research',
            description: 'Positioning, UX audits, and conversion rate optimization.'
          }
        }
      ]
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
    '@id': `${SITE_URL}/#website`,
    url: SITE_URL,
    name: 'Goldvale Studios',
    inLanguage: ['de', 'en', 'el'],
    publisher: {
      '@id': `${SITE_URL}/#organization`
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationData) }}
      />
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
