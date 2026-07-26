/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    // Serve resized AVIF/WebP instead of the full-size source JPEGs.
    formats: ['image/avif', 'image/webp'],
    // Card widths actually used by the product grid, so no oversized variants.
    imageSizes: [96, 128, 200, 256, 384],
    minimumCacheTTL: 31536000,
  },
}

export default nextConfig
