import { useAdminDetailsContext } from "context/AppContext";

import { query } from "../../query";
import { cinemaKeys } from "./cinemaQueryKeysFactory";

export const useCinemaMovies = () => {
  const adminDetails = useAdminDetailsContext();
  const cinemaMovies = query({
    queryKey: cinemaKeys.cinemaMovies(adminDetails?.cinema),
    url: "/api/cinemas/" + adminDetails?.cinema + "/movies",
  });
  return cinemaMovies;
};
