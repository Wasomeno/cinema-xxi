import React from "react";
import { regionContract } from "../../../../hooks/useContract";
import { query } from "../../query";

export const useAllRegions = () => {
  const contract = regionContract();
  const result = query({
    queryKey: ["allRegions"],
    queryFunction: async () => await contract.getRegions(),
  });
  return result;
};
