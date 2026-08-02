const fs = require('fs');
const path = require('path');

const SITE_URL = 'https://www.goldvalestudios.com';

['impressum/page.tsx', 'datenschutz/page.tsx'].forEach(file => {
  const filePath = path.join(__dirname, 'src/app/[locale]', file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Replace generateMetadata
  const metaRegex = /export async function generateMetadata\([^)]*\)\s*\{[^}]+\}/m;

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
}`;

  content = content.replace(metaRegex, newMeta);
  // deduplicate imports if added twice
  content = content.replace("import {SITE_URL} from '@/lib/site-url';\nimport {SITE_URL} from '@/lib/site-url';", "import {SITE_URL} from '@/lib/site-url';");

  fs.writeFileSync(filePath, content);
});

console.log('Legal pages metadata fixed!');
