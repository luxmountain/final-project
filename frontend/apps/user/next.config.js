import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@repo/ui", "@repo/types"],
  images: {
    remotePatterns: [{ hostname: "images.unsplash.com" }],
  },
  turbopack: {
    root: resolve(__dirname, "../../"),
  },
};

export default nextConfig;
