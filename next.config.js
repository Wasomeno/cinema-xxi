/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
};

const env = {
  ROLES_CONTRACT_ADDRESS: "0x4de286ef2a3236e03f0ada8b4a0bdbf0c954e366",
  CINEMA_CONTRACT_ADDRESS: "0xC18886ADe889cd95B9195a4DAdB003B3028fdc63",
  MOVIES_CONTRACT_ADDRESS: "0x00088666a2cB34d1147d546E6D82408DF422261B",
  TICKET_CONTRACT_ADDRESS: "0x4DB71E022Ae7d145Bf59CB57Ec8D0A3f030BE37e",
};

module.exports = () => {
  nextConfig, env;

  return {
    env,
  };
};
