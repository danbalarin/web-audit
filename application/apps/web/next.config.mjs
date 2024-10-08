import "./src/env.mjs";

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@repo/ui"],
  experimental: {
    serverComponentsExternalPackages: ["lighthouse"],
  },
  // Alternative to serverComponentsExternalPackages because it's broken in monorepos at this time
  webpack: (config) => {
    config.externals.push({
      lighthouse: "commonjs lighthouse",
      "puppeteer-core": "commonjs puppeteer-core",
    });
    return config;
  },
};

export default nextConfig;
