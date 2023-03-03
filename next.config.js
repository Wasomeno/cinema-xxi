/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
};

const env = {
  ROLES_CONTRACT_ADDRESS: "0xc6b856c1826167a6193d3e7a1325e69e8b5f21f9",
  TICKET_CONTRACT_ADDRESS: "0xb4f5b73f91e256da07ea21b7fac9323e633f8cd0",
};

module.exports = () => {
  nextConfig, env;

  return {
    env,
  };
};
