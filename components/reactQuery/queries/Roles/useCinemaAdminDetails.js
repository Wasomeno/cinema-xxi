import { useQuery } from "@tanstack/react-query";
import { rolesContract } from "hooks/createContract";

export const useCinemaAdminDetails = ({ admin }) => {
  const contract = rolesContract();
  const adminDetails = useQuery({
    queryKey: ["cinemaAdminDetails", admin],
    queryFn: async () => await contract.adminDetails(admin),
  });
  return adminDetails;
};
