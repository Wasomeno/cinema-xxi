import { query } from "../../query";
import { cinemaStudioKeys } from "./cinemaStudioQueryKeysFactory";

export const useStudioDetails = ({ region, cinemaId, studioId }) => {
  const studioDetails = query({
    queryKey: cinemaStudioKeys.studioDetails(studioId, cinemaId),
    url: "/api/cinemas/" + cinemaId + "/studios/" + studioId,
  });
  return studioDetails;
};
