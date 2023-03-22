import { rolesContract } from "hooks/createContract";
import { useQuery } from "wagmi";

export function useManagerStatus({ address }) {
  const contract = rolesContract();
  const managerStatus = useQuery({
    queryKey: ["managerStatus", address],
    queryFn: async () => {
      const status = await contract.isManager(address);
      return status;
    },
  });
  return managerStatus;
}
