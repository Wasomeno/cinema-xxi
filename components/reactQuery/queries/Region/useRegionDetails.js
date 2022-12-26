import { regionContract } from "../../../../hooks/useContract";
import { query } from "../../query";

export const useRegionDetails = ({ region }) => {
  const contract = regionContract();
  const result = query({
    queryKey: ["regionDetails", region],
    queryFunction: async () => await contract.getRegionsDetails(region),
  });
  return result;
};
