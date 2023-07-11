import { useDateTime } from "hooks/useDateTime";

import {
  useMoviePageActionContext,
  useMoviePageValueContext,
} from "../context/appMoviePageContext";

const SeatTotal = ({ selectedSeats, selectedDate, onSeatsConfirmation }) => {
  const dateTime = useDateTime({ date: selectedDate.date });

  function getTicketPriceTotal(day, seatsAmount) {
    const total = seatsAmount * (day > 5 ? 0.0012 : 0.001);
    return seatsAmount < 1 ? 0 : total;
  }

  return (
    <div className="flex w-full flex-col justify-around rounded-lg border bg-slate-100 p-4 lg:w-4/6">
      <div className="flex items-start">
        <div className="flex h-20 w-3/6 flex-col items-center gap-2">
          <span className="text-sm">Total price</span>
          <span className="text-xs lg:text-sm">
            {getTicketPriceTotal(dateTime.getDay(), selectedSeats.length)} ETH
          </span>
        </div>
        <div className="flex w-3/6 flex-col items-center gap-2">
          <span className="text-sm">Selected seats</span>
          <div className="flex items-center justify-center gap-2">
            {!selectedSeats.length ? (
              <span className="text-xs">No seats selected</span>
            ) : (
              selectedSeats.map((seatNumber, index) => (
                <span
                  key={index}
                  className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-200 text-xs"
                >
                  {seatNumber}
                </span>
              ))
            )}
          </div>
        </div>
      </div>
      <div className="text-center">
        <button
          disabled={selectedSeats.length < 1}
          onClick={() => {
            setModalState("ticket");
          }}
          className="w-3/6 rounded-lg bg-blue-200 p-2 font-poppins text-xs text-slate-800 transition duration-200 enabled:hover:bg-blue-300  disabled:bg-opacity-50 disabled:text-opacity-50 md:text-sm"
        >
          Confirm Seats
        </button>
      </div>
    </div>
  );
};

export default SeatTotal;
