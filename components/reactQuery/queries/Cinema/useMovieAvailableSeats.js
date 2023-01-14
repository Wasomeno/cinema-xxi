import { ticketContract } from "hooks/useContract";
import { query } from "../../query";

export const useMovieAvailableSeats = ({
  region,
  cinema,
  studio,
  showtime,
}) => {
  const contract = ticketContract({ read: true });
  const availableSeats = query({
    queryKey: ["movieAvailableSeats", region, cinema, studio, showtime],
    queryFunction: async () =>
      await contract.getAvailableSeats(region, cinema, studio, showtime),
  });

  return availableSeats;
};
