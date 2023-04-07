import { useSession } from "next-auth/react";

import { createSideEffects } from "../createSideEffects";
import mutation from "../mutation";

export function useAddStudio({ number, capacity }) {
  const { data: sessionData } = useSession();
  const sideEffects = createSideEffects({
    context: "add",
    object: "studio",
    redirect: true,
    redirectUrl: "/admin/studios",
  });

  const addStudioMutation = mutation({
    url: "/api/cinemas/" + sessionData.cinemaId + "/studios",
    method: "POST",
    body: {
      studioNumber: number,
      studioCapacity: capacity,
    },
    sideEffects: sideEffects,
  });

  return addStudioMutation;
}
