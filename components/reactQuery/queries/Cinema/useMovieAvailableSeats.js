import { useStudioDetails } from "./useStudioDetails";
import { useTakenSeats } from "./useTakenSeats";

export const useMovieAvailableSeats = ({
  region,
  selectedDate,
  cinemaId,
  studioId,
  showtimeId,
}) => {
  let seats = [];
  let column = [];
  const seatsTaken = useTakenSeats({
    cinemaId: cinemaId,
    selectedDate: selectedDate,
    showtimeId: showtimeId,
    studioId: studioId,
  });
  const studioDetails = useStudioDetails({
    region: region,
    cinemaId: cinemaId,
    studioId: studioId,
  });
  for (let i = 0; i < studioDetails.data?.capacity; i++) {
    if (i <= 14) {
      column.push(i + 1);
      if (i === 14) {
        seats.push(column);
        column = [];
      }
    } else if (i > 14 && i <= 44) {
      column.push(i + 1);
      if (i === 44) {
        seats.push(column);
        column = [];
      }
    } else {
      column.push(i + 1);
      if (i === 59) {
        seats.push(column);
      }
    }
  }
  return { seats: seats, seatsTaken: seatsTaken };
};
