/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '54321',
        pathname: '**'
      }
    ]
  },
  experimental: {
    typedRoutes: true,
  },
};

export default nextConfig;
