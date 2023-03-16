import { regionKeys } from "../../queries/Region/regionKeysFactory";
import { createSideEffects } from "../createSideEffects";
import mutation from "../mutation";

export const addCinema = ({ regionId, cinemaName, studioCapacities }) => {
  const sideEffects = createSideEffects({
    context: "add",
    object: "cinema",
    redirect: true,
    redirectUrl: "/manager/region/" + regionId,
    invalidateQueries: true,
    queryKeys: regionKeys.regionDetails(regionId),
  });
  const studioDetails = studioCapacities.map((capacity, index) => ({
    studio: parseInt(index + 1),
    capacity: parseInt(capacity),
  }));

  const addCinemaMutation = mutation({
    url: "/api/cinemas",
    body: {
      cinemaName: cinemaName,
      regionId: parseInt(regionId),
      studioDetails: studioDetails,
    },
    method: "POST",
    sideEffects: sideEffects,
  });

  return addCinemaMutation;
};
