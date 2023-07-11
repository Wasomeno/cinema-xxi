import { useDateTime } from "hooks/useDateTime";
import { useSkeleton } from "hooks/useSkeleton";
import { useEffect } from "react";
import { HiXMark } from "react-icons/hi2";
import { twMerge } from "tailwind-merge";

import AnimatedContainer from "@/components/AnimatedContainer";
import { ModalContainer } from "@/components/ModalContainer";
import { query } from "@/components/reactQuery/queries/query";

import SeatSkeleton from "./SeatSkeleton";

export default function SeatsModal({ title, closeModal, seats, seatsTotal }) {
  return (
    <ModalContainer closeModal={closeModal}>
      <AnimatedContainer className="fixed bottom-0 left-1/2 z-40 flex h-5/6 w-full -translate-x-1/2 flex-col items-center justify-between gap-4 overflow-y-scroll rounded-t-lg bg-slate-50 p-6 dark:bg-slate-700 lg:bottom-1/2 lg:top-1/2 lg:w-5/6 lg:-translate-y-1/2 lg:rounded-lg">
        <button onClick={closeModal} className="absolute right-2 top-2 p-2">
          <HiXMark className="h-5 w-5 lg:h-6 lg:w-6" />
        </button>
        <div className="flex flex-col items-center justify-center gap-4">
          <h5 className="font-poppins text-sm lg:text-lg">{title}</h5>
          {seats}
        </div>
        {seatsTotal}
      </AnimatedContainer>
    </ModalContainer>
  );
}

function Seats({
  setSeatsId,
  setSelectedSeats,
  selectedSeats,
  selectedDate,
  selectedShowtime,
}) {
  const seatSkeletons = useSkeleton(<SeatSkeleton />, 60);
  const showtimeSeats = query({
    queryKey: [
      "takenSeats",
      selectedShowtime.cinema.id,
      selectedShowtime.studio.id,
      selectedShowtime.studioShowtimeId,
      selectedDate.date,
    ],
    url:
      "/api/cinemas/" +
      selectedShowtime.cinema.id +
      "/studios/" +
      selectedShowtime.studio.id +
      "/showtimes/" +
      selectedShowtime.studioShowtimeId +
      "/" +
      selectedDate.date +
      "/seats",
  });

  function clearSeats() {
    setSelectedSeats([]);
  }

  function selectSeat(seatNumber) {
    setSelectedSeats((current) => [...current, seatNumber]);
  }

  function deselectSeat(seatNumber) {
    setSelectedSeats((current) =>
      current.filter((currentSeatNumber) => currentSeatNumber !== seatNumber)
    );
  }

  function generateSeats() {
    let seats = [];
    for (let i = 0; i < showtimeSeats.data?.studio.capacity; ++i) {
      seats[i] = i + 1;
    }
    return seats;
  }

  useEffect(() => {
    setSeatsId(showtimeSeats.data?.id);
    return () => {
      clearSeats();
    };
  }, []);

  return (
    <div className="flex w-full flex-col items-center overflow-x-scroll lg:w-4/6">
      <div className="flex flex-wrap items-center justify-center gap-3">
        {showtimeSeats.isLoading
          ? seatSkeletons.map((skeleton) => skeleton)
          : generateSeats().map((seatNumber, index) => (
              <button
                key={index}
                disabled={showtimeSeats.data?.seats_taken.includes(seatNumber)}
                onClick={() => {
                  selectedSeats.includes(seatNumber)
                    ? deselectSeat(seatNumber)
                    : selectSeat(seatNumber);
                }}
                className={twMerge(
                  "h-10 w-10 cursor-pointer rounded-lg bg-slate-200 text-slate-800 shadow-sm transition duration-200 disabled:cursor-default disabled:bg-opacity-40 disabled:text-opacity-40",
                  selectedSeats.includes(seatNumber) && "bg-blue-200"
                )}
              >
                <span className="m-auto text-sm">{seatNumber}</span>
              </button>
            ))}
      </div>
    </div>
  );
}

function SeatsTotal({ selectedSeats, selectedDate, onSeatsConfirmation }) {
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
          onClick={onSeatsConfirmation}
          className="w-3/6 rounded-lg bg-blue-200 p-2 font-poppins text-xs text-slate-800 transition duration-200 enabled:hover:bg-blue-300  disabled:bg-opacity-50 disabled:text-opacity-50 md:text-sm"
        >
          Confirm Seats
        </button>
      </div>
    </div>
  );
}

SeatsModal.Seats = Seats;
SeatsModal.SeatsTotal = SeatsTotal;
