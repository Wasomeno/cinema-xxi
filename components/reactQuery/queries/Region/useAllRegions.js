import { query } from "../query";
import { regionQueryKeys } from "../queryKeys/regionQueryKeys";

export const useAllRegions = () => {
  const regions = query({
    queryKey: regionQueryKeys.allRegion,
    url: "/api/regions",
  });
  return regions;
};
