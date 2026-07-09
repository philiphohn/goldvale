export default function JsonLd() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'Goldvale Studios',
    legalName: 'HBC Hohn Business Consulting UG (haftungsbeschränkt)',
    url: 'https://goldvale.de',
    logo: 'https://goldvale.de/opengraph-image.jpg',
    image: 'https://goldvale.de/opengraph-image.jpg',
    description: 'Goldvale Studios ist ein Digitalstudio für Websites, App-Entwicklung, Marken und Strategie.',
    telephone: '+4915678412954',
    email: 'hello@goldvale.de',
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

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
