/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  typescript: {
    // Skip type checking during build
    ignoreBuildErrors: true,
  },
  eslint: {
    // Skip ESLint during build
    ignoreDuringBuilds: true,
  },
  // Optimize image handling
  images: {
    unoptimized: true, // Skip image optimization
  },
  // Reduce bundle size
  swcMinify: true,
  // Disable source maps in production
  productionBrowserSourceMaps: false,
  // Experimental features to speed up build
  experimental: {
    // Increase page data limit
    largePageDataBytes: 128 * 1000,
    // Skip type checking
    skipTypeChecking: true,
    // Optimize packages
    optimizePackageImports: ["lucide-react", "recharts"],
    // Removed: optimizeCss: true
  },
}

module.exports = nextConfig
