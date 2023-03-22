import { query } from "../query";
import { regionQueryKeys } from "../queryKeys/regionQueryKeys";

export const useRegionDetails = ({ region }) => {
  const regionDetails = query({
    queryKey: regionQueryKeys.regionDetails(region),
    url: "/api/regions/" + region,
  });

  return regionDetails;
};
