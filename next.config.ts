import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  // Step 5: 301 Redirects สำหรับย้าย URL เดิมจากเว็บ PHP (isuzuchiangmai.com) มาที่ URL ใหม่
  async redirects() {
    return [
      // ตัวอย่าง (นำ URL จริงจาก sitemap.xml เดิมมาเติมที่นี่ก่อนขึ้น Production):
      // {
      //   source: "/old-promotion-page",
      //   destination: "/promotions",
      //   permanent: true,
      // },
    ];
  },
};

export default nextConfig;
