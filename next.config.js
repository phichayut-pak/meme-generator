/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['i.imgflip.com']
  },
  env: {
    USERNAME: process.env.API_USERNAME,
    PASSWORD: process.env.API_PASSWORD
  },

}

module.exports = nextConfig
