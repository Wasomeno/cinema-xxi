/** @type {import('next').NextConfig} */
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

const env = {
  ROLES_CONTRACT_ADDRESS: "0x6986f8ac26ed37c46dd8c166450d9a0cc464ade7",
  TICKET_CONTRACT_ADDRESS: "0x16cee9a9dd6e65ce9ec600f1b2bd0a7bf99dc6ff",
};

module.exports = withBundleAnalyzer({
  reactStrictMode: true,
  swcMinify: true,
  env: env,
});
