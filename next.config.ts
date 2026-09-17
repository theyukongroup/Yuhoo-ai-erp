import type { NextConfig } from 'next';

// oxlint is used instead of ESLint in this project (see .oxlintrc.json);
// there is no ESLint config here on purpose.
const nextConfig: NextConfig = {
  outputFileTracingRoot: process.cwd(),
  async redirects() {
    return [{ source: '/how-nexavoris-works', destination: '/how-yuhoo-works', permanent: true }];
  },
};

export default nextConfig;
