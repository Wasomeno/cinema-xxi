/** @type {import('next').NextConfig} */
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
})

const env = {
  ROLES_CONTRACT_ADDRESS: "0x6986f8ac26ed37c46dd8c166450d9a0cc464ade7",
  TICKET_CONTRACT_ADDRESS: "0x16cee9a9dd6e65ce9ec600f1b2bd0a7bf99dc6ff",
  NEXTAUTH_SECRET: "5c3d24485bb838879e06f5bebca5652f",
}

module.exports = withBundleAnalyzer({
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "m.media-amazon.com",
        port: "",
        pathname: "/images/**",
      },
      {
        protocol: "https",
        hostname: "media.21cineplex.com",
        port: "",
        pathname: "/webcontent/**",
      },
      {
        protocol: "https",
        hostname: "ymudtpspkdopgzrtzevt.supabase.co",
        port: "",
        pathname: "/storage/**",
      },
    ],
  },
  reactStrictMode: true,
  swcMinify: true,
  env: env,
})
