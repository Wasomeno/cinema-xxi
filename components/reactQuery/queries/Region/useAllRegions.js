import { parseBytes32String } from "ethers/lib/utils.js";
import React from "react";
import { moviesContract, regionContract } from "../../../../hooks/useContract";
import { query } from "../../query";

export const useAllRegions = () => {
  return {
    data: [
      {
        id: 1,
        name: "Region 1",
        cinemaAmount: 10,
      },
      {
        id: 2,
        name: "Region 2",
        cinemaAmount: 10,
      },
      {
        id: 3,
        name: "Region 3",
        cinemaAmount: 10,
      },
      {
        id: 4,
        name: "Region 4",
        cinemaAmount: 10,
      },
      {
        id: 5,
        name: "Region 5",
        cinemaAmount: 10,
      },
    ],
    isLoading: false,
  };
};
