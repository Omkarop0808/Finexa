/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  images:{
    remotePatterns:[
      {
        protocol: 'https',
        hostname: 'randomuser.me',
      }
    ]
  },
  experimental:{
    serverActions:{
      bodySizeLimit:"5mb",
    },
  },
  // Add empty turbopack config to silence the warning
  turbopack: {},
  // Optimize edge function bundle size
  webpack: (config, { isServer, dev }) => {
    if (!isServer && !dev) {
      // Optimize for edge runtime
      config.resolve.alias = {
        ...config.resolve.alias,
        // Reduce bundle size by using lighter alternatives where possible
      };
    }
    return config;
  },
};

export default nextConfig;
