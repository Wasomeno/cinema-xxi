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

  useEffect(() => {
    setSeatsId(showtimeSeats.seatsTaken.data?.id);
  }, [showtimeSeats.seatsTaken.isLoading, selectedDate]);

  return (
    <div className="flex flex-col items-center overflow-x-scroll">
      <DataContainer
        className="grid w-11/12 grid-cols-8 flex-wrap justify-center gap-2.5 overflow-x-scroll p-3 md:w-9/12 lg:w-7/12"
        loading={false}
        object="seats"
      >
        {showtimeSeats.seats.map((seat, index) => (
          <button
            key={index}
            disabled={showtimeSeats.seatsTaken.data?.seatsTaken.includes(seat)}
            onClick={() => isSeatSelected(parseInt(seat))}
            className={
              "col-span-1 rounded-lg p-2 text-center font-poppins text-sm font-medium transition duration-150 ease-in-out" +
              " " +
              (selectedSeats.includes(parseInt(seat))
                ? "bg-blue-400 text-slate-900 shadow-md backdrop-blur-md dark:text-slate-100"
                : showtimeSeats.seatsTaken.data?.seatsTaken.includes(seat)
                ? "bg-slate-400 text-gray-300"
                : "border border-slate-600 hover:scale-105 dark:border-slate-100")
            }
          >
            <h5 className="">{parseInt(seat)}</h5>
          </button>
        ))}
      </DataContainer>
      <div className="mx-auto my-4 w-5/6 rounded-full bg-slate-700 p-2 text-center dark:bg-slate-300 md:w-9/12 lg:w-7/12">
        <p className="font-poppins text-xs text-slate-50 lg:text-sm">Screen</p>
      </div>
    </div>
  );
};

export default SeatColumns;
