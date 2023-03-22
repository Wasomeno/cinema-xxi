import { useStudioDetails } from "./useStudioDetails";

export const useStudioSeats = (cinemaId, studioId) => {
  let seats = [];
  const studioDetails = useStudioDetails({
    cinemaId: cinemaId,
    studioId: studioId,
  });
  for (let i = 0; i < studioDetails.data?.capacity; i++) {
    seats.push(i + 1);
  }
  return seats;
};
