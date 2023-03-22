import { useQuery } from "@tanstack/react-query";
import { useUserConnectionDetails } from "hooks/useUserConnectionDetails";

export const useActiveTickets = () => {
  const { user } = useUserConnectionDetails();
  const activeTickets = useQuery({
    queryKey: ["activeTickets", user],
    queryFn: async () => {
      return await contract.getUserTicketsDetails(user);
    },
  });
  return activeTickets;
};
