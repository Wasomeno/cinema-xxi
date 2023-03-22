import { query } from "../query";

export function useTicketDetails(ticketId, user) {
  const ticketDetails = query({
    queryKey: ["ticketDetails", ticketId, user],
    url: "/api/users/" + user + "/transactions/" + ticketId,
  });
  return ticketDetails;
}
