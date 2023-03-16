import { useUserDetails } from "hooks/useUserDetails";

import { query } from "../query";

export function userUserTransactions() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { user } = useUserDetails();
  const userDetails = query({
    queryKey: ["userDetails", user],
    url: "/api/users/" + user,
  });
  return userDetails;
}
