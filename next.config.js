/** @type {import('next').NextConfig} */
const withPWA = require("next-pwa")
const runtimeCaching = require("next-pwa/cache")

const nextConfig = {
  reactStrictMode: true,
}

//module.exports = nextConfig, withPWA
;(module.exports = withPWA({
  pwa: {
    dest: "public",
    runtimeCaching,
    register: true,
    skipWaiting: true,
    disable: process.env.NODE_ENV === "development",
  },
})),
  nextConfig
