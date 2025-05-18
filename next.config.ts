/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'source.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
      },
      {
        protocol: 'https',
        hostname: 'img.freepik.com',
      },
      {
        protocol: 'https',
        hostname: 'cdn.pixabay.com',
      }
    ],
  },
};

module.exports = nextConfig;
