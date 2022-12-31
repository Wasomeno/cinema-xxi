import { rolesContract } from "../../../../hooks/useContract";

export const useCinemaAdmins = async ({ regionId, cinemaId }) => {
  const contract = rolesContract({ read: true });
  const admins = await contract.getCinemaAdmins(regionId, cinemaId);
  return JSON.parse(JSON.stringify(admins));
};
