import { useShowtimeTakenSeats } from "./useShowtimeTakenSeats";
import { useStudioSeats } from "./useStudioSeats";

export const useMovieAvailableSeats = ({
  selectedDate,
  cinemaId,
  studioId,
  showtimeId,
}) => {
  const studioSeats = useStudioSeats(cinemaId, studioId);
  const seatsTaken = useShowtimeTakenSeats({
    cinemaId: cinemaId,
    selectedDate: selectedDate,
    showtimeId: showtimeId,
    studioId: studioId,
  });
  return { seats: studioSeats, seatsTaken: seatsTaken };
};
