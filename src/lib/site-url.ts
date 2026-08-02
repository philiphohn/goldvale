export const SITE_URL = process.env.SITE_URL || 'https://www.goldvalestudios.com';

export function getAbsoluteUrl(path: string = ''): string {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${SITE_URL}${cleanPath}`;
}
