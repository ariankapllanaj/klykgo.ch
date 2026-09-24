/** @type {import('next').NextConfig} */
const isGitHubPages = process.env.GITHUB_ACTIONS === 'true';
const repositoryName = process.env.GITHUB_REPOSITORY?.split('/')[1] ?? '';
const isUserOrOrganizationSite = repositoryName.endsWith('.github.io');
const basePath = isGitHubPages && repositoryName && !isUserOrOrganizationSite
  ? `/${repositoryName}`
  : '';

const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  trailingSlash: true,
  // Project Pages lives under /<repository>; custom domains and user Pages use the root.
  basePath,
  images: { unoptimized: true },
  env: { NEXT_PUBLIC_BASE_PATH: basePath }
};
export default nextConfig;
