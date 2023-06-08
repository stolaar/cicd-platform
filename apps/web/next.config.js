/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  serverRuntimeConfig: {
    PROJECT_ROOT: __dirname,
  },
  experimental: {
    externalDir: true,
    runtime: 'nodejs',
  },
  async rewrites() {
    return [
      {
        source: `${'/api'}/:ctrl*`,
        destination: `${process.env.BACKEND_URL}/:ctrl*`,
      },
    ]
  },
}

module.exports = nextConfig
