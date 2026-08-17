/** @type {import('next').NextConfig} */

const repositoryName = process.env.GITHUB_REPOSITORY?.split('/')[1] ?? '';
const isGitHubPagesBuild = process.env.GITHUB_ACTIONS === 'true';
const isUserOrOrgPagesRepo = repositoryName.endsWith('.github.io');

// GitHub project pages are served from /<repository-name>/.
// For username.github.io repositories (or local development), the site is served from /.
const basePath = isGitHubPagesBuild && repositoryName && !isUserOrOrgPagesRepo
  ? `/${repositoryName}`
  : '';

const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  trailingSlash: true,
  basePath,
  images: {
    unoptimized: true
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath
  }
};

export default nextConfig;
