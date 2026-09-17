export const siteConfig = {
  name: 'Yuhoo.ai',
  shortName: 'Yuhoo',
  descriptiveName: 'Yuhoo AI & ERP Systems',
  url: (process.env.NEXT_PUBLIC_SITE_URL || 'https://www.yuhoo.ai').replace(/\/$/, ''),
  tagline: 'Smarter Business. Simpler Technology.',
  logo: '/yuhoo-logo.webp',
  icon: '/yuhoo-icon.png',
  email: 'info@yuhoo.ai',
} as const;
