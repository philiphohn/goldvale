const fs = require('fs');
const path = require('path');

const SITE_URL = 'https://www.goldvalestudios.com';

const pages = [
  { file: 'page.tsx', pathSlug: '', key: 'home' },
  { file: 'arbeiten/page.tsx', pathSlug: '/arbeiten', key: 'work' },
  { file: 'leistungen/page.tsx', pathSlug: '/leistungen', key: 'services' },
  { file: 'studio/page.tsx', pathSlug: '/studio', key: 'studio' },
  { file: 'journal/page.tsx', pathSlug: '/journal', key: 'journal' },
  { file: 'kontakt/page.tsx', pathSlug: '/kontakt', key: 'contact' },
];

pages.forEach(p => {
  const filePath = path.join(__dirname, 'src/app/[locale]', p.file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Replace generateMetadata function
  const metaRegex = /export async function generateMetadata\([^)]*\)\s*\{[^}]+\}/m;

  const newMeta = `export async function generateMetadata({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'Meta'});
  const canonicalUrl = \`\${SITE_URL}/\${locale}${p.pathSlug}\`;
  
  const title = t('${p.key}_title');
  const description = t('${p.key}_description');
  
  return {
    ${p.key === 'home' ? 'title: { absolute: title },' : 'title,'}
    description,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        de: \`\${SITE_URL}/de${p.pathSlug}\`,
        en: \`\${SITE_URL}/en${p.pathSlug}\`,
        el: \`\${SITE_URL}/el${p.pathSlug}\`,
        'x-default': \`\${SITE_URL}/en${p.pathSlug}\`,
      },
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      locale: locale === 'en' ? 'en_US' : locale === 'el' ? 'el_GR' : 'de_DE',
    },
  };
}`;

  content = content.replace(metaRegex, newMeta);
  
  // Make sure getTranslations and SITE_URL are imported if needed
  if (!content.includes("import {getTranslations}")) {
    content = "import {getTranslations} from 'next-intl/server';\n" + content;
  }
  if (!content.includes("import {SITE_URL}")) {
    content = "import {SITE_URL} from '@/lib/site-url';\n" + content;
  }

  fs.writeFileSync(filePath, content);
});

// Update layout.tsx
const layoutPath = path.join(__dirname, 'src/app/[locale]/layout.tsx');
let layoutContent = fs.readFileSync(layoutPath, 'utf8');

const layoutMetaRegex = /export async function generateMetadata\([^)]*\)\s*\{([\s\S]*?)  \};\n\}/m;
const newLayoutMeta = `export async function generateMetadata({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      template: '%s | Goldvale Studios',
      default: 'Goldvale Studios — Digital Studio',
    },
    openGraph: {
      siteName: 'Goldvale Studios',
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
      images: ['/opengraph-image.png']
    },
  };
}`;

layoutContent = layoutContent.replace(layoutMetaRegex, newLayoutMeta);
fs.writeFileSync(layoutPath, layoutContent);

console.log('Pages metadata fixed!');
