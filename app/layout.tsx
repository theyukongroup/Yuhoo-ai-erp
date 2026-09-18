import type { Metadata } from 'next';
import { headers } from 'next/headers';
import { Manrope, Geist_Mono } from 'next/font/google';
import Image from 'next/image';
import { ArrowUpRight, Mail, MapPin, Phone } from 'lucide-react';
import {
  LanguageRuntime,
  LanguageSelector,
} from '@/components/language-runtime';
import { SITE_URL } from '@/lib/seo';
import { chatGPTSignInPath, getChatGPTUser } from '@/app/chatgpt-auth';
import { isBootstrapAdminEmail } from '@/lib/auth';
import { MobileNavigation } from '@/components/mobile-navigation';
import { isLocale, languageTags } from '@/lib/i18n';
import './globals.css';
import './extended.css';
import './pricing.css';
import './equipment.css';
import './theme-v2.css';
import './industries.css';
import './about.css';
import './resources.css';
import './authority.css';
import './member.css';
import './restaurants.css';
import './yuhoo-theme.css';

const sans = Manrope({ variable: '--font-sans', subsets: ['latin'] });
const mono = Geist_Mono({ variable: '--font-mono', subsets: ['latin'] });
export const metadata: Metadata = {
  title: {
    default: 'Yuhoo.ai | AI & ERP Systems',
    template: '%s | Yuhoo.ai',
  },
  description:
    'Private enterprise AI, ERP implementation, and intelligent business automation for growing companies.',
  metadataBase: new URL(SITE_URL),
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  category: 'business technology services',
  icons: {
    icon: [
      { url: '/yuhoo-icon.png', type: 'image/png', sizes: '160x181' },
      { url: '/yuhoo-icon.png', type: 'image/png', sizes: '160x181' },
    ],
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    title: 'Yuhoo AI & ERP Systems',
    description: 'One integrated operating system for your business.',
    url: SITE_URL,
    siteName: 'Yuhoo.ai',
    locale: 'en_US',
    alternateLocale: ['zh_CN', 'zh_TW', 'es'],
    type: 'website',
    images: [
      {
        url: '/yuhoo-og.png',
        width: 1200,
        height: 630,
        alt: 'Yuhoo AI & ERP Systems',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Yuhoo AI & ERP Systems',
    description: 'Private AI, ERP, and automation for operational businesses.',
    images: ['/yuhoo-og.png'],
  },
};
const nav = [
  ['AI Solutions', '/ai-solutions'],
  ['ERP Solutions', '/erp-solutions'],
  ['Website Design', '/website-design'],
  ['AI + ERP', '/ai-erp'],
  ['Equipment', '/equipment'],
  ['Industries', '/industries'],
  ['Resources', '/resources'],
  ['Pricing', '/pricing'],
  ['About', '/about'],
];

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const localeHeader = (await headers()).get('x-nexavoris-locale');
  const documentLanguage = isLocale(localeHeader)
    ? languageTags[localeHeader]
    : 'en-US';
  const member = await getChatGPTUser();
  return (
    <html lang={documentLanguage} suppressHydrationWarning>
      <body className={`${sans.variable} ${mono.variable}`}>
        <a className="skip-link" href="#main-content">
          Skip to main content
        </a>
        <LanguageRuntime />
        <header>
          <a className="brand logo-brand" href="/" aria-label="Yuhoo home">
            <Image
              src="/yuhoo-logo.webp"
              alt="Yuhoo AI & ERP Systems"
              width={210}
              height={67}
              priority
            />
          </a>
          <nav className="desktop-navigation" aria-label="Primary navigation">
            {nav.map(([label, href]) => <a key={label} href={href}>{label}</a>)}
          </nav>
          <LanguageSelector />
          <a
            className="member-header-link"
            href={
              member
                ? isBootstrapAdminEmail(member.email)
                  ? '/admin'
                  : '/account'
                : chatGPTSignInPath('/account')
            }
            target={member ? undefined : '_top'}
          >
            {member
              ? isBootstrapAdminEmail(member.email)
                ? 'Admin'
                : 'My Account'
              : 'Sign In'}
          </a>
          <a className="nav-cta desktop-assessment" href="/assessment">
            Get Your Assessment <ArrowUpRight size={16} />
          </a>
          <MobileNavigation
            signedIn={Boolean(member)}
            accountHref={chatGPTSignInPath('/account')}
          />
        </header>
        <div id="main-content">{children}</div>
        <footer>
          <div className="footer-company">
            <a
              className="logo-brand footer-logo"
              href="/"
              aria-label="Yuhoo home"
            >
              <Image
                src="/yuhoo-logo.webp"
                alt="Yuhoo AI & ERP Systems"
                width={205}
                height={66}
              />
            </a>
            <p>Smarter Business. Simpler Technology.</p>
          </div>
          <address className="footer-contact">
            <a href="/ai-solutions">Private AI</a>
            <a href="/erp-solutions">Odoo ERP</a>
            <a href="/website-design">Website Design</a>
            <a href="/equipment">Equipment</a>
            <a href="/resources">Resources</a>
            <a href="/free-account">Free Business Account</a>
            <a href="/how-yuhoo-works">How Yuhoo Works</a>
            <a href="/case-studies">Case Studies</a>
            <a href="/trust">Trust &amp; Data Practices</a>
            <span>
              <MapPin size={16} />
              <span>
                13366 Murphy Road
                <br />
                Stafford, TX 77477
              </span>
            </span>
            <a href="tel:+12812588000">
              <Phone size={16} />
              281-258-8000
            </a>
            <a href="mailto:info@yuhoo.ai">
              <Mail size={16} />
              info@yuhoo.ai
            </a>
          </address>
          <span className="footer-copyright">
            © 2026 Yuhoo.ai. All rights reserved.
            {' · '}<a href="/privacy">Privacy</a>{' · '}<a href="/terms">Terms</a>
          </span>
        </footer>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@graph': [
                {
                  '@type': ['Organization', 'ProfessionalService'],
                  '@id': `${SITE_URL}/#organization`,
                  name: 'Yuhoo AI & ERP Systems',
                  alternateName: 'Yuhoo',
                  url: SITE_URL,
                  logo: `${SITE_URL}/yuhoo-logo.webp`,
                  image: `${SITE_URL}/yuhoo-logo.webp`,
                  email: 'info@yuhoo.ai',
                  telephone: '+1-281-258-8000',
                  address: {
                    '@type': 'PostalAddress',
                    streetAddress: '13366 Murphy Road',
                    addressLocality: 'Stafford',
                    addressRegion: 'TX',
                    postalCode: '77477',
                    addressCountry: 'US',
                  },
                  areaServed: { '@type': 'Country', name: 'United States' },
                  knowsAbout: [
                    'Private enterprise AI',
                    'ERP consulting and implementation',
                    'Odoo implementation',
                    'AI ERP integration',
                    'Business process automation',
                    'Website design and development',
                  ],
                  hasOfferCatalog: {
                    '@type': 'OfferCatalog',
                    name: 'Yuhoo business technology services',
                    itemListElement: [
                      'Private enterprise AI solutions',
                      'ERP consulting and Odoo implementation',
                      'AI and ERP integration',
                      'Business workflow automation',
                      'Website design and development',
                    ].map((name) => ({
                      '@type': 'Offer',
                      itemOffered: { '@type': 'Service', name },
                    })),
                  },
                },
                {
                  '@type': 'WebSite',
                  '@id': `${SITE_URL}/#website`,
                  url: SITE_URL,
                  name: 'Yuhoo.ai',
                  publisher: { '@id': `${SITE_URL}/#organization` },
                  inLanguage: ['en-US', 'zh-CN', 'zh-TW', 'es'],
                },
              ],
            }),
          }}
        />
      </body>
    </html>
  );
}
