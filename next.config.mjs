/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  trailingSlash: true,
  // Hostpoint serves the domain root, including builds made in GitHub Actions.
  basePath: '',
  images: { unoptimized: true },
  env: { NEXT_PUBLIC_BASE_PATH: '' }
};
export default nextConfig;
