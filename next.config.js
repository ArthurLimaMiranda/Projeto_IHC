/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
      // Você pode adicionar outros hosts aqui se necessário
      {
        protocol: 'https',
        hostname: 'images.unsplash.com', // exemplo adicional
      },
    ],
  },
}

const withVideos = require('next-videos')

module.exports = withVideos(nextConfig)