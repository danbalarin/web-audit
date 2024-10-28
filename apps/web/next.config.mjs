import "./src/env.mjs";

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ["lighthouse", "lighthouse/cli"],
  },
};

export default nextConfig;
