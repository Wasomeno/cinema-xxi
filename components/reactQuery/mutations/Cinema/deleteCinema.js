import { regionQueryKeys } from "../../queries/queryKeys/regionQueryKeys";
import { createSideEffects } from "../createSideEffects";
import mutation from "../mutation";

export const deleteCinema = ({ regionId, cinemaIds }) => {
  const sideEffects = createSideEffects({
    context: "add",
    object: "cinema",
    invalidateQueries: true,
    queryKeys: regionQueryKeys.regionDetails(regionId),
  });
  const deleteCinemaMutation = mutation({
    url: "/api/cinemas",
    method: "DELETE",
    body: {
      cinemaIds: cinemaIds,
    },
    sideEffects: sideEffects,
  });
  return deleteCinemaMutation;
};
