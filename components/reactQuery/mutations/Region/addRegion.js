import { createSideEffects } from "../createSideEffects";
import mutation from "../mutation";

export const addRegion = ({ regionName }) => {
  const sideEffects = createSideEffects({
    context: "add",
    object: "region",
    redirect: true,
    redirectUrl: "/manager/region",
  });
  const addRegionMutation = mutation({
    url: "/api/regions",
    body: { regionName: regionName },
    method: "POST",
    sideEffects,
  });
  return addRegionMutation;
};
