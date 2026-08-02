const fs = require('fs');
const path = require('path');

const pages = [
  { file: 'page.tsx', pathSlug: '/', key: 'home' },
  { file: 'arbeiten/page.tsx', pathSlug: '/arbeiten', key: 'work' },
  { file: 'leistungen/page.tsx', pathSlug: '/leistungen', key: 'services' },
  { file: 'studio/page.tsx', pathSlug: '/studio', key: 'studio' },
  { file: 'journal/page.tsx', pathSlug: '/journal', key: 'journal' },
  { file: 'kontakt/page.tsx', pathSlug: '/kontakt', key: 'contact' },
  { file: 'impressum/page.tsx', pathSlug: '/impressum', key: 'impressum' },
  { file: 'datenschutz/page.tsx', pathSlug: '/datenschutz', key: 'datenschutz' },
];

pages.forEach(p => {
  const filePath = path.join(__dirname, 'src/app/[locale]', p.file);
  let content = fs.readFileSync(filePath, 'utf8');

  const metaRegex = /export async function generateMetadata[\s\S]*?^(export default (?:async )?function)/m;
  
  const namespace = (p.key === 'impressum' || p.key === 'datenschutz') ? 'Footer' : 'Meta';
  const titleKey = (p.key === 'impressum' || p.key === 'datenschutz') ? p.key : `${p.key}_title`;
  const descKey = (p.key === 'impressum' || p.key === 'datenschutz') ? p.key : `${p.key}_description`;

  const newMeta = `import {getPageMetadata} from '@/lib/routes';

export async function generateMetadata({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: '${namespace}'});
  return getPageMetadata(locale as any, '${p.pathSlug}', t('${titleKey}'), t('${descKey}'), ${p.key === 'home' ? 'true' : 'false'});
}

$1`;

  content = content.replace(metaRegex, newMeta);
  
  // Clean up unused imports
  content = content.replace(/import {SITE_URL} from '@\/lib\/site-url';\n/g, '');
  
  fs.writeFileSync(filePath, content);
});

// Update webdesign-berlin and hospitality manually in script
const webdesignPath = path.join(__dirname, 'src/app/[locale]/webdesign-berlin/page.tsx');
let webdesignContent = fs.readFileSync(webdesignPath, 'utf8');
const webdesignMetaRegex = /export async function generateMetadata[\s\S]*?^(export default (?:async )?function)/m;
const webdesignNewMeta = `import {getPageMetadata} from '@/lib/routes';

export async function generateMetadata({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  const title = locale === 'en'
    ? 'Web Design Berlin | Digital Studio for High-Performance Websites'
    : locale === 'el'
    ? 'Web Design Berlin | Ψηφιακό Studio για Websites Υψηλής Απόδοσης'
    : 'Webdesign Berlin | Digitalstudio für Performance Websites & Apps';
  
  const description = locale === 'en'
    ? 'Bespoke web design & app development in Berlin. We design & develop high-performance websites and digital products for ambitious brands.'
    : locale === 'el'
    ? 'Εξειδικευμένο web design & ανάπτυξη εφαρμογών στο Βερολίνο. Σχεδιάζουμε και αναπτύσσουμε ψηφιακά προϊόντα υψηλής απόδοσης.'
    : 'Maßgeschneidertes Webdesign & App-Entwicklung in Berlin. Wir konzipieren und entwickeln performante Websites und digitale Produkte für ambitionierte Marken.';

  return getPageMetadata(locale as any, '/webdesign-berlin', title, description);
}

$1`;
webdesignContent = webdesignContent.replace(webdesignMetaRegex, webdesignNewMeta);
webdesignContent = webdesignContent.replace(/import {SITE_URL} from '@\/lib\/site-url';\n/g, '');
fs.writeFileSync(webdesignPath, webdesignContent);

const hospitalityPath = path.join(__dirname, 'src/app/[locale]/hospitality/page.tsx');
let hospitalityContent = fs.readFileSync(hospitalityPath, 'utf8');
const hospitalityMetaRegex = /export async function generateMetadata[\s\S]*?^(export default (?:async )?function)/m;
const hospitalityNewMeta = `import {getPageMetadata} from '@/lib/routes';

export async function generateMetadata({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'hospitality.meta'});
  return getPageMetadata(locale as any, '/hospitality', t('title'), t('description'));
}

$1`;
hospitalityContent = hospitalityContent.replace(hospitalityMetaRegex, hospitalityNewMeta);
hospitalityContent = hospitalityContent.replace(/import {SITE_URL} from '@\/lib\/site-url';\n/g, '');
fs.writeFileSync(hospitalityPath, hospitalityContent);

const journalSlugPath = path.join(__dirname, 'src/app/[locale]/journal/[slug]/page.tsx');
let journalSlugContent = fs.readFileSync(journalSlugPath, 'utf8');
const journalSlugMetaRegex = /export async function generateMetadata[\s\S]*?^(export async function generateStaticParams)/m;
const journalSlugNewMeta = `import {getPageMetadata} from '@/lib/routes';

export async function generateMetadata({params}: {params: Promise<{locale: string; slug: string}>}) {
  const {locale, slug} = await params;
  const post = getPostBySlug(slug, locale);
  
  if (!post) {
    return {
      title: 'Post not found',
    };
  }
  
  const baseMeta = getPageMetadata(locale as any, \`/journal/\${slug}\`, post.title, post.excerpt);
  return {
    ...baseMeta,
    openGraph: {
      ...baseMeta.openGraph,
      type: 'article',
      publishedTime: post.date,
    },
  };
}

$1`;
journalSlugContent = journalSlugContent.replace(journalSlugMetaRegex, journalSlugNewMeta);
journalSlugContent = journalSlugContent.replace(/import {SITE_URL} from '@\/lib\/site-url';\n/g, '');
// Since journalSlug imports { SITE_URL }, remove it if unused
journalSlugContent = journalSlugContent.replace(/import { SITE_URL } from '@\/lib\/site-url';\n/g, '');
fs.writeFileSync(journalSlugPath, journalSlugContent);

console.log('Done refactoring metadata functions!');
