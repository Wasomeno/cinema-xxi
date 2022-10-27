/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
};

const env = {
  ROLES_CONTRACT_ADDRESS: "0x4f9eF1f5217824122A5C1156DeF7C228F12cE2a8",
  CINEMA_CONTRACT_ADDRESS: "0xE74c9Af874ef149B1d71fcd9E664012a58F35f57",
  MOVIES_CONTRACT_ADDRESS: "0x1C0b2F345330afB974Ae568a0b1C7e74709ad38c",
  TICKET_CONTRACT_ADDRESS: "0x20fE2eA02acE803b8CFf6329904B45AEE01C3569",
};

module.exports = () => {
  nextConfig, env;

  return {
    env,
  };
};
