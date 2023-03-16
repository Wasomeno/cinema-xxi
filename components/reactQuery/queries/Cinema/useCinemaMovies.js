import { useAdminDetailsContext } from "context/AppContext";

import { query } from "../../query";
import { cinemaKeys } from "./cinemaQueryKeysFactory";

export const useCinemaMovies = (cinema) => {
  const cinemaMovies = query({
    queryKey: cinemaKeys.cinemaMovies(cinema),
    url: "/api/cinemas/" + cinema + "/movies",
  });
  return cinemaMovies;
};
