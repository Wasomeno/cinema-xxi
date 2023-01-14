import { parseBytes32String } from "ethers/lib/utils.js";
import React from "react";
import { regionContract } from "../../../../hooks/useContract";
import { query } from "../../query";

export const useAllRegions = () => {
  const contract = regionContract({ read: true });
  const result = query({
    queryKey: ["allRegions"],
    queryFunction: async () => {
      const regionIds = await contract.getRegions();
      const regions = Promise.all(
        regionIds.map(async (regionId) => {
          const { _name, _cinemasAmount } = await contract.getRegionsDetails(
            regionId
          );
          return {
            id: parseInt(regionId),
            name: parseBytes32String(_name),
            cinemaAmount: parseInt(_cinemasAmount),
          };
        })
      );
      return regions;
    },
  });
  return result;
};
