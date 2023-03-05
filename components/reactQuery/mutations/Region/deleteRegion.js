import { regionKeys } from "../../queries/Region/regionKeysFactory";
import { createSideEffects } from "../createSideEffects";
import mutation from "../mutation";

export function deleteRegion({ regionIds }) {
  const sideEffects = createSideEffects({
    context: "delete",
    object: "region",
    invalidateQueries: true,
    queryKeys: regionKeys.allRegion,
  });
  const deleteRegionMutation = mutation({
    url: "/api/regions",
    method: "DELETE",
    body: {
      regionIds: regionIds,
    },
    sideEffects: sideEffects,
  });

  return deleteRegionMutation;
}