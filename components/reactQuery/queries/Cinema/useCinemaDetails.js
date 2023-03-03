import { useAdminDetailsContext } from "context/AppContext";

import { query } from "../../query";
import { cinemaKeys } from "./cinemaQueryKeysFactory";

export const useCinemaDetails = () => {
  const adminDetails = useAdminDetailsContext();
  const cinemaDetails = query({
    queryKey: cinemaKeys.cinemaDetails(adminDetails?.cinema),
    url: "/api/cinemas/" + adminDetails?.cinema,
  });

  return cinemaDetails;
};
