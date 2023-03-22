import { query } from "../query";

export const useShowtimeTakenSeats = ({
  cinemaId,
  showtimeId,
  selectedDate,
  studioId,
}) => {
  const seats = query({
    queryKey: ["takenSeats", cinemaId, studioId, selectedDate],
    url:
      "/api/cinemas/" +
      cinemaId +
      "/studios/" +
      studioId +
      "/showtimes/" +
      showtimeId +
      "/" +
      selectedDate +
      "/seats",
  });
  return seats;
};
