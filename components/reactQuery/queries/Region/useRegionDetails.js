import { parseBytes32String } from "ethers/lib/utils.js";
import { regionContract } from "../../../../hooks/useContract";
import { query } from "../../query";

export const useRegionDetails = ({ region }) => {
  return {
    data: {
      name: "region 1",
      cinemas: [
        { id: 1, name: "cinema 1" },
        { id: 2, name: "cinema 2" },
        { id: 3, name: "cinema 3" },
        { id: 4, name: "cinema 4" },
      ],
    },
  };
};
