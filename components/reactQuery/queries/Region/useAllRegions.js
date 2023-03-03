import { query } from "../../query";
import { regionKeys } from "./regionKeysFactory";

export const useAllRegions = () => {
  const regions = query({
    queryKey: regionKeys.allRegion,
    url: "/api/regions",
  });
  return regions;
};
