import React from "react";
import { rolesContract } from "../../../../hooks/useContract";
import { query } from "../../query";

export const useAdminDetails = ({ user }) => {
  const contract = rolesContract({ read: true });
  const result = query(
    ["adminDetails", user],
    contract.cinemaAdminDetails(user)
  );
  return result;
};
