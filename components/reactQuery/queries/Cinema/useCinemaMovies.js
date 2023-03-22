import { query } from "../query";
import { cinemaQueryKeys } from "../queryKeys/cinemaQueryKeys";

export const useCinemaMovies = (cinema) => {
  const cinemaMovies = query({
    queryKey: cinemaQueryKeys.cinemaMovies(cinema),
    url: "/api/cinemas/" + cinema + "/movies",
  });
  return cinemaMovies;
};
