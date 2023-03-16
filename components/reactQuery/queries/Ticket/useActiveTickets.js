import { useQuery } from "@tanstack/react-query";
import { ticketContract } from "hooks/createContract";
import { useUserDetails } from "hooks/useUserDetails";

export const useActiveTickets = () => {
  const { user } = useUserDetails();
  const activeTickets = useQuery({
    queryKey: ["activeTickets", user],
    queryFn: async () => {
      return await contract.getUserTicketsDetails(user);
    },
  });
  return activeTickets;
};
