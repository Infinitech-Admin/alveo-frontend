/** @type {import('next').NextConfig} */

// Import the PWA wrapper
const withPWA = require("@ducanh2912/next-pwa").default({
  dest: "public", // generated sw files go to /public
  register: true, // auto-register the service worker
  skipWaiting: true, // immediately activate new SW
  disable: process.env.NODE_ENV === "development", // disable in dev
  cacheOnFrontEndNav: true,
  aggressiveFrontEndNavCaching: true,
  reloadOnOnline: true,
  workboxOptions: {
    navigateFallback: "/offline.html", // fallback page when offline
    // you can add runtimeCaching rules here if needed
  },
});

const nextConfig = {
  reactStrictMode: true,

  // Tells Next.js 16 you're aware next-pwa injects a webpack config,
  // and that Turbopack should proceed anyway. Empty object = default
  // Turbopack behavior, just silences the mismatch error.
  turbopack: {},

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.alveoland.com.ph", // no protocol, no trailing slash
        port: "",
        pathname: "/assets/**",
      },
    ],
  },

  typescript: {
    ignoreBuildErrors: true,
  },
};

// Wrap config with PWA
module.exports = withPWA(nextConfig);
