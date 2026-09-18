import type { MetadataRoute } from 'next';
import { authorityRoutes, localizedUrls, publicRoutes, SITE_URL } from '@/lib/seo';

export default function sitemap(): MetadataRoute.Sitemap {
  // Build time, which is when the content last changed: the site is static
  // apart from the member area, and every content edit ships as a deployment.
  const lastModified = new Date();
  const localized = publicRoutes.flatMap((route) => {
    const canonical = `${SITE_URL}${route || '/'}`;
    const entries = [
      canonical,
      `${canonical}?lang=zh-cn`,
      `${canonical}?lang=zh-tw`,
      `${canonical}?lang=es`,
    ];
    return entries.map((url) => ({
      url,
      lastModified,
      changeFrequency:
        route === '' ? ('weekly' as const) : ('monthly' as const),
      priority: route === '' ? 1 : 0.8,
      alternates: { languages: localizedUrls(route) },
    }));
  });
  return [...localized, ...authorityRoutes.map((route) => ({ url: `${SITE_URL}${route}`, lastModified, changeFrequency: 'monthly' as const, priority: 0.7 }))];
}
