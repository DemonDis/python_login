/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    // mimeTypes: {
    //     ".json": "text/json"
    // },
    distDir: 'templates',
    swcMinify: true,
    assetPrefix: ".",
    basePath:'',
    trailingSlash: true,
    output: 'export',
    // experimental: {
    //     appDir: true,
    // },
    // outputFileTracingExcludes: {
    //     '/api/hello': ['./un-necessary-folder/**/*'],
    //   },
    //   outputFileTracingIncludes: {
    //     '/api/another': ['./necessary-folder/**/*'],
    //     '/api/login/\\[\\[\\.\\.\\.slug\\]\\]': [
    //       './node_modules/aws-crt/dist/bin/**/*',
    //     ],
    //   }
};

export default nextConfig;
