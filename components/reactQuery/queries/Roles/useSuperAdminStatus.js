import { useQuery } from "@tanstack/react-query";
import { rolesContract } from "../../../../hooks/useContract";

export const useSuperAdminStatus = (address) => {
  const contract = rolesContract();
  const result = useQuery(["superAdminStatus", address], async () => {
    return await contract.superAdminStatus(address);
  });
  return result;
};
