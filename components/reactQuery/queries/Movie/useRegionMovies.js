import { query } from "../query";
import { regionQueryKeys } from "../queryKeys/regionQueryKeys";

export const useRegionMovies = ({ regionId }) => {
  const regionMovies = query({
    queryKey: regionQueryKeys.regionMovies(regionId),
    url: "/api/regions/" + regionId + "/movies",
  });
  return regionMovies;
};
