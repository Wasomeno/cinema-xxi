import { query } from "../../query";
import { regionKeys } from "../Region/regionKeysFactory";

export const useRegionMovies = ({ regionId }) => {
  const regionMovies = query({
    queryKey: regionKeys.regionMovies(regionId),
    url: "/api/regions/" + regionId + "/movies",
  });
  return regionMovies;
};
