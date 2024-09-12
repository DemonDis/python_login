/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    // mimeTypes: {
    //     ".json": "text/json"
    // },
    distDir: 'templates',
    swcMinify: true,
    // assetPrefix: "./",
    trailingSlash: true,
    output: 'export',
    // basePath: '/static',
    // distDir: 'build',
    // rewrites() {
    //     return [
    //       { source: '/_next/:path*', destination: '/next/:path*' }
    //     ]
    // },
    generateBuildId: async () => {
      if (process.env.BUILD_ID) {
        return process.env.BUILD_ID;
      } else {
        return `${new Date().getTime()}`;
      }
    },
    
};

export default nextConfig;
