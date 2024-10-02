import "./src/env.mjs";

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@repo/ui"],
  experimental: {
    serverComponentsExternalPackages: ["lighthouse", "lighthouse/cli"],
  },
};

export default nextConfig;
