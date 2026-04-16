/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        hostname: "cdn.dummyjson.com",
      },
    ],
  },
  // cacheComponents: true,
};

export default nextConfig;
