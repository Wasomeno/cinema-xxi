import React from "react";
import { cinemaContract } from "../../../../hooks/useContract";
import { query } from "../../query";

export const useStudioShowTimes = ({ region, cinema, studio }) => {
  const contract = cinemaContract();
  const result = query(
    ["studioShowTimes", region, cinema, studio],
    contract.getStudioShowTimes(region, cinema, studio)
  );
  return result;
};
