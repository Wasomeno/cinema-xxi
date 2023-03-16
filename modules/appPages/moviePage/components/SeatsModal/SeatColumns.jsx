import { useEffect } from "react";

import DataContainer from "@/components/DataContainer";
import { useMovieAvailableSeats } from "@/components/reactQuery/queries/Cinema/useMovieAvailableSeats";

import {
  useMoviePageActionContext,
  useMoviePageValueContext,
} from "../context/appMoviePageContext";

const SeatColumns = () => {
  const { selectSeat, deselectSeat, setSeatsId } = useMoviePageActionContext();
  const { selectedShowtime, selectedSeats, selectedDate } =
    useMoviePageValueContext();

  const showtimeSeats = useMovieAvailableSeats({
    cinemaId: selectedShowtime.cinema.id,
    selectedDate: selectedDate,
    studioId: selectedShowtime.studio.id,
    showtimeId: selectedShowtime.id,
  });

  const isSeatSelected = (seat) => {
    const result = selectedSeats.includes(seat);
    return result ? deselectSeat(seat) : selectSeat(seat);
  };

  const seatLayoutClass = {
    15: "grid h-48 w-72 grid-cols-5 gap-2",
    30: "grid h-48 w-96 grid-cols-10 gap-2",
  };

  useEffect(() => {
    setSeatsId(showtimeSeats.seatsTaken.data?.id);
  }, [showtimeSeats.seatsTaken.isLoading, selectedDate]);

  return (
    <div className="flex flex-col items-center overflow-x-scroll">
      <DataContainer
        className="relative flex w-11/12 justify-center gap-2.5 overflow-x-scroll p-3"
        loading={false}
        object="seats"
      >
        {showtimeSeats.seats.map((seats, index) => (
          <div key={index} className={seatLayoutClass[seats.length]}>
            {seats.map((seat, index) => (
              <button
                key={index}
                disabled={showtimeSeats.seatsTaken.data?.seatsTaken.includes(
                  seat
                )}
                onClick={() => isSeatSelected(parseInt(seat))}
                className={
                  "col-span-1 rounded-lg p-2 transition duration-150 ease-in-out" +
                  " " +
                  (selectedSeats.includes(parseInt(seat))
                    ? "bg-blue-400 text-white"
                    : showtimeSeats.seatsTaken.data?.seatsTaken.includes(seat)
                    ? "bg-slate-700 text-gray-300"
                    : "bg-slate-500 text-white hover:scale-105")
                }
              >
                <h5 className="text-center font-poppins text-sm font-medium">
                  {parseInt(seat)}
                </h5>
              </button>
            ))}
          </div>
        ))}
      </DataContainer>
      <div className="mx-auto my-4 h-8 w-5/6 rounded-full bg-slate-700 p-2 text-center lg:w-5/6">
        <p className="font-poppins text-sm text-white">Screen</p>
      </div>
    </div>
  );
};

export default SeatColumns;
