/** @type {import('next').NextConfig} */

const removeImports = require("next-remove-imports")({});

const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.imgur.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

module.exports = removeImports(nextConfig);
