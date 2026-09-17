-- Optional brand metadata migration. Review and run against the existing database
-- after a backup; this checkout does not apply migrations automatically.
-- Preserve assessment scores, accounts, staff roles, historical leads, and URLs.
UPDATE seo_indexing_status
SET expected_canonical = replace(
  replace(expected_canonical, 'https://www.nexavoris.ai', 'https://www.yuhoo.ai'),
  'https://nexavoris.ai', 'https://www.yuhoo.ai'
)
WHERE expected_canonical LIKE 'https://nexavoris.ai%'
   OR expected_canonical LIKE 'https://www.nexavoris.ai%';
