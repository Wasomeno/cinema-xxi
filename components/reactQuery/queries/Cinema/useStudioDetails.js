import { query } from "../query";
import { cinemaStudioQueryKeys } from "../queryKeys/cinemaStudioQueryKeys";

export const useStudioDetails = ({ cinemaId, studioId }) => {
  const studioDetails = query({
    queryKey: cinemaStudioQueryKeys.studioDetails(studioId, cinemaId),
    url: "/api/cinemas/" + cinemaId + "/studios/" + studioId,
  });
  return studioDetails;
};
