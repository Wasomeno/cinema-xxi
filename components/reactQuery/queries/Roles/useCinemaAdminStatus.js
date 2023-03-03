import { useQuery } from "@tanstack/react-query";
import { rolesContract } from "hooks/createContract";

export function useCinemaAdminStatus({ address }) {
  const contract = rolesContract();
  const adminStatus = useQuery({
    queryKey: ["adminStatus", address],
    queryFn: async () => {
      const status = await contract.isAdmin(address);
      return status;
    },
  });
  return adminStatus;
}
