import type { Metadata } from 'next';

import { siteConfig } from '@/lib/site-config';
export const SITE_URL = siteConfig.url;

export const marketingRoutes = [
  '',
  '/ai-solutions',
  '/erp-solutions',
  '/website-design',
  '/ai-erp',
  '/equipment',
  '/industries',
  '/pricing',
  '/about',
  '/contact',
  '/free-account',
  '/assessment',
] as const;

export const resourceRoutes = [
  '/resources',
  '/resources/private-ai',
  '/resources/odoo-erp',
  '/resources/ai-erp',
  '/resources/business-automation',
  '/resources/comparisons',
  '/resources/guides',
  '/resources/industries/wholesale-distribution',
  '/resources/industries/hvac-field-service',
  '/resources/industries/construction',
  '/resources/industries/manufacturing',
  '/resources/industries/retail',
  '/resources/industries/professional-services',
] as const;

export const authorityRoutes = [
  '/case-studies', '/how-yuhoo-works',
  '/methodology/ai-erp-readiness', '/methodology/roi-calculator',
  '/trust', '/privacy', '/terms', '/industries/restaurants',
] as const;

export const publicRoutes = [...marketingRoutes, ...resourceRoutes] as const;
export const indexableRoutes = [...publicRoutes, ...authorityRoutes] as const;

export function authorityMetadata(title: string, description: string, path: string): Metadata {
  const metadata = pageMetadata(title, description, path);
  metadata.alternates = { canonical: `${SITE_URL}${path}` };
  return metadata;
}

export function localizedUrls(path = '') {
  const url = `${SITE_URL}${path || '/'}`;
  return {
    'x-default': url,
    'en-US': url,
    'zh-CN': `${url}?lang=zh-cn`,
    'zh-TW': `${url}?lang=zh-tw`,
    es: `${url}?lang=es`,
  };
}

export function pageMetadata(
  title: string,
  description: string,
  path: string,
): Metadata {
  const canonical = `${SITE_URL}${path || '/'}`;
  const fullTitle = (title.startsWith('Yuhoo |') || title.startsWith('Yuhoo.ai |')) ? title : `${title} | Yuhoo.ai`;
  return {
    title: (title.startsWith('Yuhoo |') || title.startsWith('Yuhoo.ai |')) ? { absolute: title } : title,
    description,
    alternates: { canonical, languages: localizedUrls(path) },
    openGraph: {
      title: fullTitle,
      description,
      url: canonical,
      siteName: 'Yuhoo.ai',
      type: 'website',
      locale: 'en_US',
      alternateLocale: ['zh_CN', 'zh_TW', 'es'],
      images: [
        {
          url: `${SITE_URL}${siteConfig.ogImage}`,
          width: siteConfig.ogImageWidth,
          height: siteConfig.ogImageHeight,
          alt: 'Yuhoo AI and ERP systems',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [`${SITE_URL}${siteConfig.ogImage}`],
    },
  };
}

export function localizedPageMetadata(
  title: string,
  description: string,
  path: string,
  locale: 'en' | 'zh-cn' | 'zh-tw' | 'es',
): Metadata {
  const metadata = pageMetadata(title, description, path);
  const urls = localizedUrls(path);
  const canonical = locale === 'zh-cn'
    ? urls['zh-CN']
    : locale === 'zh-tw'
      ? urls['zh-TW']
      : locale === 'es'
        ? urls.es
        : urls['en-US'];
  metadata.alternates = { canonical, languages: urls };
  if (metadata.openGraph) {
    metadata.openGraph.url = canonical;
    metadata.openGraph.locale = locale === 'zh-cn'
      ? 'zh_CN'
      : locale === 'zh-tw'
        ? 'zh_TW'
        : locale === 'es'
          ? 'es_ES'
          : 'en_US';
  }
  return metadata;
}
