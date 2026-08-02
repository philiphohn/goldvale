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

  // Match from export async function generateMetadata to the start of export default
  const metaRegex = /export async function generateMetadata[\s\S]*?^(export default (?:async )?function)/m;

  const newMeta = `import {SITE_URL} from '@/lib/site-url';

export async function generateMetadata({params}: {params: Promise<{locale: string}>}) {
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
}

$1`;

  content = content.replace(metaRegex, newMeta);
  
  // Deduplicate imports if they exist
  content = content.replace(/import {SITE_URL} from '@\/lib\/site-url';\nimport {SITE_URL} from '@\/lib\/site-url';/g, "import {SITE_URL} from '@/lib/site-url';");
  if (!content.includes("import {getTranslations}")) {
    content = "import {getTranslations} from 'next-intl/server';\n" + content;
  }

  fs.writeFileSync(filePath, content);
});

// Update impressum and datenschutz
['impressum/page.tsx', 'datenschutz/page.tsx'].forEach(file => {
  const filePath = path.join(__dirname, 'src/app/[locale]', file);
  let content = fs.readFileSync(filePath, 'utf8');

  const metaRegex = /export async function generateMetadata[\s\S]*?^(export default (?:async )?function)/m;
  const key = file === 'impressum/page.tsx' ? 'impressum' : 'datenschutz';
  const slug = file === 'impressum/page.tsx' ? '/impressum' : '/datenschutz';

  const newMeta = `import {SITE_URL} from '@/lib/site-url';

export async function generateMetadata({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'Footer'});
  const canonicalUrl = \`\${SITE_URL}/\${locale}${slug}\`;
  
  const title = t('${key}');
  const description = t('${key}');
  
  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        de: \`\${SITE_URL}/de${slug}\`,
        en: \`\${SITE_URL}/en${slug}\`,
        el: \`\${SITE_URL}/el${slug}\`,
        'x-default': \`\${SITE_URL}/en${slug}\`,
      },
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      locale: locale === 'en' ? 'en_US' : locale === 'el' ? 'el_GR' : 'de_DE',
    },
  };
}

$1`;

  content = content.replace(metaRegex, newMeta);
  content = content.replace(/import {SITE_URL} from '@\/lib\/site-url';\nimport {SITE_URL} from '@\/lib\/site-url';/g, "import {SITE_URL} from '@/lib/site-url';");
  fs.writeFileSync(filePath, content);
});

// Update layout.tsx
const layoutPath = path.join(__dirname, 'src/app/[locale]/layout.tsx');
let layoutContent = fs.readFileSync(layoutPath, 'utf8');

const layoutMetaRegex = /export async function generateMetadata[\s\S]*?^(export default (?:async )?function)/m;
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
}

$1`;

layoutContent = layoutContent.replace(layoutMetaRegex, newLayoutMeta);
fs.writeFileSync(layoutPath, layoutContent);

console.log('Pages metadata fixed safely!');
