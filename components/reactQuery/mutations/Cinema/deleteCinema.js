import { regionKeys } from "../../queries/Region/regionKeysFactory";
import { createSideEffects } from "../createSideEffects";
import mutation from "../mutation";

export const deleteCinema = ({ regionId, cinemaIds }) => {
  const sideEffects = createSideEffects({
    context: "add",
    object: "cinema",
    invalidateQueries: true,
    queryKeys: regionKeys.regionDetails(regionId),
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
