import { query } from "../query";

export function useUserTransactions(user) {
  const userDetails = query({
    queryKey: ["userDetails", user],
    url: "/api/users/" + user,
  });
  return userDetails;
}
