import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/seo';

// Private areas and the machinery behind them. The locale rewrite target is
// excluded so the language variants are only reached through their ?lang= URLs.
const privatePaths = [
  '/localized-content/',
  '/account',
  '/admin',
  '/api/',
  '/signin-with-chatgpt',
  '/signout-with-chatgpt',
  '/callback',
  '/login',
  '/register',
  '/forgot-password',
  '/reset-password',
  '/member',
  '/dashboard',
];

// Search and answer engines, named explicitly so the intent is on the record:
// we want to be read and cited by assistants, not just classic search. Every
// other crawler still matches the final `*` rule, which allows the same paths.
const crawlers = [
  'Googlebot',
  'Bingbot',
  'DuckDuckBot',
  'OAI-SearchBot', // ChatGPT search index
  'ChatGPT-User', // fetches a page when someone asks about it
  'PerplexityBot',
  'Claude-SearchBot',
  'Claude-User',
  'Google-Extended', // grounding for Gemini and AI Overviews
  'Applebot',
  '*',
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: crawlers.map((userAgent) => ({
      userAgent,
      allow: '/',
      disallow: privatePaths,
    })),
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
