# Yuhoo.ai domain migration — Vercel / Supabase

New canonical origin: **https://www.yuhoo.ai**. Old origins: nexavoris.ai and www.nexavoris.ai.

## Detected environment

This repository is the Next.js Vercel-compatible application, backed by Supabase Auth/Postgres. README describes Bluehost DNS, Resend SMTP, the Vercel team/project, and a separate OpenAI Sites source repository. Those existing external account names are not renamed by this change. The old OpenAI checkout and Git remotes were not modified.

## Vercel and DNS

1. Deploy branch `codex/yuhoo-rebrand` from the existing GitHub repository to the existing Vercel project as a preview first. There is no need to rename the repository or create a new database.
2. Keep existing Supabase/Postgres secrets and `NEXAVORIS_ADMIN_EMAILS` unchanged. Add `NEXT_PUBLIC_SITE_URL=https://www.yuhoo.ai` to the production public environment before the production build. Protect preview deployments from indexing where appropriate.
3. Vercel → project Settings → Domains: add `www.yuhoo.ai` and `yuhoo.ai`. Use www as the serving domain, and redirect the apex to it.
4. At the authoritative DNS provider for yuhoo.ai (confirm whether it is Bluehost or another provider), add the exact www CNAME and apex A/ALIAS values Vercel displays. No IP or CNAME destination is invented here. Preserve MX, SPF, DKIM, DMARC, and unrelated TXT records.
5. Wait for Vercel domain verification and valid TLS certificates for both hostnames before cutover. Old HTTPS hostnames also require working TLS to redirect.

Official guide: https://vercel.com/docs/domains/set-up-custom-domain

## Permanent redirects

Configure both legacy hostnames as redirect domains on the Vercel project, targeting https://www.yuhoo.ai. Preserve paths and query strings, and use a permanent redirect. Verify the actual status in the Vercel UI; configure 301 if supported, otherwise Vercel/Next.js may use 308. Both must point directly to the canonical host without loops. HTTPS and HTTP aliases of the new domain should converge to www HTTPS.

Example: `https://www.nexavoris.ai/pricing?lang=es` → `https://www.yuhoo.ai/pricing?lang=es`.

The repository already implements a permanent **308** path redirect from `/how-nexavoris-works` to `/how-yuhoo-works`, preserving query parameters. Combining the old-host and old-path changes into one edge redirect is preferable when the host permits it. No host redirect is forced on localhost or preview deployments.

## Supabase authentication

Authentication → URL Configuration: set Site URL to https://www.yuhoo.ai. Add the production `/login/verify` redirect destination used by the application, and retain the actual existing Vercel production/preview and localhost allowlist entries. This application passes `next` and language query parameters; validate signup confirmation and password reset against the configured allowlist before launch. Do not guess new Vercel preview team/project patterns: keep the ones belonging to the existing deployment.

Preserve the email-token templates described in README; `/login/verify` deliberately requires the person to click before redeeming a token. Update email sender/display branding to Yuhoo.ai in Supabase/Resend. Confirm email stays enabled, and admin identity remains verified.

Official guide: https://supabase.com/docs/guides/auth/redirect-urls

## Email

Public address changed from info@nexavoris.ai to info@yuhoo.ai using the existing naming convention. Confirm that mailbox/alias is provisioned and tested before deployment. If Resend handles auth mail, verify yuhoo.ai there, install its supplied mail DNS records, and configure the verified sender in Supabase SMTP. Preserve unrelated company-mail MX records. Employee mailboxes and historical lead email data were not renamed. No live email was sent during testing.

## Stored SEO metadata

Review the optional `supabase/migrations/20260917120000_yuhoo_canonical_metadata.sql` and apply it after a backup if the existing admin SEO tables contain old canonical values. It updates expected canonical host metadata only. The old migration filename, table names, saved assessments, and staff/account data remain compatible.

## Search and external accounts

- Verify the new origin/domain in Google Search Console and Bing Webmaster Tools. Keep legacy properties active, submit the new sitemap, and validate canonical/hreflang tags after deployment.
- After permanent redirects are active, use the applicable Google Change of Address workflow: https://support.google.com/webmasters/answer/9370220
- Update Google Business Profile and owned directory/backlink website URLs, plus social display branding and profile URLs only after the accounts actually exist or are renamed.
- Preserve any externally managed analytics IDs; update property domain settings and annotations. No GA/GTM or search-verification ID was discovered in this checkout.
- Keep old domain registration, DNS, HTTPS, and redirects available during the transition. Monitor index coverage, broken links, sign-in/reset flows, and contact submission persistence.

## Launch verification

Run the documented lint, typecheck, restaurant, SQL, build, and SEO checks on the deployed preview. Then verify real authentication, contact/member APIs, administrator access, saved drafts/reports, and Supabase persistence using approved test accounts. These require real credentials and were not exercised locally.
