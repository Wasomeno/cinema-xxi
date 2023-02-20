/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
};

const env = {
  ROLES_CONTRACT_ADDRESS: "0x81f9062bdd9a28e522a54358256a108c7947675f",
  CINEMA_CONTRACT_ADDRESS: "0x264a999342c3ed9735d32b3ef857766e57b8b736",
  MOVIES_CONTRACT_ADDRESS: "0x7f5cf2ee641fdfa256da4bbfb8ca7d1ca93e5972",
  TICKET_CONTRACT_ADDRESS: "0x88a262421141d0d8a285a683548de489f54142d3",
  TRANSACTIONS_CONTRACT_ADDRESS: "0x3e4aff340ba27fcaf5e198a1f0c13ea828fdb912",
  REGION_CONTRACT_ADDRESS: "0xee5c6d903bc4b25421be5839b208d7cda5c55157",
};

module.exports = () => {
  nextConfig, env;

  return {
    env,
  };
};
