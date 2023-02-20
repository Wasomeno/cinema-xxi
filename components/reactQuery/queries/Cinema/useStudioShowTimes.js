import React from "react";
import { cinemaContract } from "../../../../hooks/useContract";
import { query } from "../../query";

export const useStudioShowTimes = ({ region, cinema, studio }) => {
  const contract = cinemaContract({ read: true });
  const result = query({
    queryKey: ["studioShowTimes", region, cinema, studio],
    queryFunction: async () =>
      await contract.getStudioShowTimes(region, cinema, studio),
  });
  return result;
};
