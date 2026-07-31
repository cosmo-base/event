/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production'

const nextConfig = {
  output: 'export',
  basePath: isProd ? '/event' : '',
  assetPrefix: isProd ? '/event/' : '',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
}

export default nextConfig
