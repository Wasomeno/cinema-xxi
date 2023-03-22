import { useQuery } from "@tanstack/react-query";
import { rolesContract } from "hooks/createContract";

export const useCinemaAdminDetails = ({ address }) => {
  const contract = rolesContract();
  const adminDetails = useQuery({
    queryKey: ["cinemaAdminDetails", address],
    queryFn: async () => await contract.adminDetails(address),
  });
  return adminDetails;
};
