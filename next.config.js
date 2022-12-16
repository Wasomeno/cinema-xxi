/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
};

const env = {
  ROLES_CONTRACT_ADDRESS: "0x00728401b226924c5dad6eb5103f9617b53383f5",
  CINEMA_CONTRACT_ADDRESS: "0xd5a6d5764f0b6899d346a08244e13333996199cd",
  MOVIES_CONTRACT_ADDRESS: "0xdc8c95b1c19889ae8999f3059730d2971ad6b5f6",
  TICKET_CONTRACT_ADDRESS: "0xe17e2e180a0a52130f3c07599dbbfbc23c8db93a",
  TRANSACTIONS_CONTRACT_ADDRESS: "0xe61ea27368c7b8940be07760a71d7f51ab0a33eb",
};

module.exports = () => {
  nextConfig, env;

  return {
    env,
  };
};
