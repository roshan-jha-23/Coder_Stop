// next.config.mjs
/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  images: {
    domains: [
      "avatars.githubusercontent.com",
      "assets.leetcode.com",
      "userpic.codeforces.org",
      "media.licdn.com",
      "images.unsplash.com",
      "plus.unsplash.com",
      "encrypted-tbn0.gstatic.com",
    ],
  },
  async rewrites() {
    return [
      {
        source: "/api/fetchDailyProblem",
        destination: "https://alfa-leetcode-api.vercel.app/daily",
      },
    ];
  },
};

export default nextConfig;
