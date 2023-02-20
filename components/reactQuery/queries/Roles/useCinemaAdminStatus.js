import { rolesContract } from "hooks/useContract";
import { query } from "../../query";

export function useCinemaAdminStatus(region, cinema, address) {
  const contract = rolesContract();
  const status = query({
    queryKey: ["cinemaAdminStatus", address],
    queryFunction: async () => {
      return await contract.isCinemaAdmin(region, cinema, address);
    },
  });

  return status;
}
