import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.piyolamarket.uz',
      }, {
        protocol: 'https',
        hostname: 'cdn.xurmomarket.uz',
      },
    ],
  },
};

export default withNextIntl(nextConfig);
