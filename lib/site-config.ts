export const siteConfig = {
  name: 'Yuhoo.ai',
  shortName: 'Yuhoo',
  descriptiveName: 'Yuhoo AI & ERP Systems',
  url: (process.env.NEXT_PUBLIC_SITE_URL || 'https://yuhoo.ai').replace(/\/$/, ''),
  tagline: 'Smarter Business. Simpler Technology.',
  logo: '/yuhoo-logo.webp',
  icon: '/yuhoo-icon.png',
  // Shared-link preview. Deliberately a 1200x630 PNG: that is the shape every
  // platform crops to, and LinkedIn does not render WebP previews at all.
  ogImage: '/yuhoo-og.png',
  ogImageWidth: 1200,
  ogImageHeight: 630,
  email: 'info@yuhoo.ai',
} as const;
