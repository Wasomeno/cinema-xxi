import { useAdminDetailsContext } from "context/AppContext";

import { query } from "../../query";
import { cinemaStudioKeys } from "./cinemaStudioQueryKeysFactory";

export const useCinemaStudios = () => {
  const adminDetails = useAdminDetailsContext();
  const cinemaStudios = query({
    queryKey: cinemaStudioKeys.allStudio,
    url: "/api/cinemas/" + adminDetails?.cinema + "/studios",
  });
  return cinemaStudios;
};
