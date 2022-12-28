/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
};

const env = {
  ROLES_CONTRACT_ADDRESS: "0x15412ceca0fe3a7031cab8465221d2f472d619be",
  CINEMA_CONTRACT_ADDRESS: "0x2255729e5f646dde2bdfc8d976903b3b142098d3",
  MOVIES_CONTRACT_ADDRESS: "0xba98dfc069ebe91f3564486daca117ac0efce742",
  TICKET_CONTRACT_ADDRESS: "0x94d6a69da39ee593a5a7995e0091f9b2cd6ff6db",
  TRANSACTIONS_CONTRACT_ADDRESS: "0x9afc87b5e92053bc696faf1b33231f30d66c6c0f",
  REGION_CONTRACT_ADDRESS: "0x4ce51e0390282e7db1bf300e34c6649119be3425",
};

module.exports = () => {
  nextConfig, env;

  return {
    env,
  };
};
