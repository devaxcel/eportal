import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Lets `NEXT_DIST_DIR=.next-build npm run build` run beside a dev server without clobbering .next
  distDir: process.env.NEXT_DIST_DIR || ".next",
};

export default nextConfig;
