import { query } from "../../query";
import { regionKeys } from "./regionKeysFactory";

export const useRegionDetails = ({ region }) => {
  const regionDetails = query({
    queryKey: regionKeys.regionDetails(region),
    url: "/api/regions/" + region,
  });

  return regionDetails;
};
