import { useAdminDetailsContext } from "context/AppContext";

import { createSideEffects } from "../createSideEffects";
import mutation from "../mutation";

export function useAddStudio({ number, capacity }) {
  const adminDetails = useAdminDetailsContext();
  const sideEffects = createSideEffects({
    context: "add",
    object: "studio",
    redirect: true,
    redirectUrl: "/admin/studios",
  });

  const addStudioMutation = mutation({
    url: "/api/cinemas/" + adminDetails?.cinema + "/studios",
    method: "POST",
    body: {
      studioNumber: number,
      studioCapacity: capacity,
    },
    sideEffects: sideEffects,
  });

  return addStudioMutation;
}
