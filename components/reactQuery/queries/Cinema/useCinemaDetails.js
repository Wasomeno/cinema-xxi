import { query } from "../../query";
import { cinemaKeys } from "./cinemaQueryKeysFactory";

export const useCinemaDetails = (cinema) => {
  const cinemaDetails = query({
    queryKey: cinemaKeys.cinemaDetails(cinema),
    url: "/api/cinemas/" + cinema,
  });

  return cinemaDetails;
};
