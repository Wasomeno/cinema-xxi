import { useContext } from "react";

import { adminDetailsContext } from "./adminDetailsContext";

export function useAdminDetailsContext() {
  const { adminDetails } = useContext(adminDetailsContext);
  return adminDetails;
}
