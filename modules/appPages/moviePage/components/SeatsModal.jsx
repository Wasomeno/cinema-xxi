import { useEffect } from "react"
import { useDateTime } from "hooks/useDateTime"
import { useSkeleton } from "hooks/useSkeleton"
import { twMerge } from "tailwind-merge"

import { CenteredModalContainer } from "@/components/ModalContainer"
import { query } from "@/components/reactQuery/queries/query"

import SeatSkeleton from "./SeatSkeleton"

export default function SeatsModal({ title, closeModal, seats, seatsTotal }) {
  return (
    <CenteredModalContainer
      title={title}
      closeModal={closeModal}
      className="w-full items-center gap-4 overflow-y-scroll rounded-t-lg py-0 pt-4 lg:w-3/6 lg:rounded-lg"
    >
      <div className="flex w-full flex-1 flex-col justify-between gap-10">
        {seats}
        {seatsTotal}
      </div>
    </CenteredModalContainer>
  )
}

function Seats({
  setSeatsId,
  setSelectedSeats,
  selectedSeats,
  selectedDate,
  selectedShowtime,
}) {
  const seatSkeletons = useSkeleton(<SeatSkeleton />, 60)
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
  })

  function selectSeat(seatNumber) {
    setSelectedSeats((current) => [...current, seatNumber])
  }

  function deselectSeat(seatNumber) {
    setSelectedSeats((current) =>
      current.filter((currentSeatNumber) => currentSeatNumber !== seatNumber)
    )
  }

  function generateSeats() {
    let seats = []
    for (let i = 0; i < showtimeSeats.data?.studio.capacity; ++i) {
      seats[i] = i + 1
    }
    return seats
  }

  useEffect(() => {
    if (!showtimeSeats.isLoading) setSeatsId(showtimeSeats.data?.id)
  }, [showtimeSeats.isLoading])

  return (
    <div className="grid w-full grid-cols-12 gap-3">
      {showtimeSeats.isLoading
        ? seatSkeletons.map((skeleton) => skeleton)
        : generateSeats().map((seatNumber, index) => (
            <button
              key={index}
              disabled={showtimeSeats.data?.seats_taken.includes(seatNumber)}
              onClick={() => {
                selectedSeats.includes(seatNumber)
                  ? deselectSeat(seatNumber)
                  : selectSeat(seatNumber)
              }}
              className={twMerge(
                "col-span-2 h-8  cursor-pointer rounded-lg bg-slate-200 shadow-sm transition duration-200 disabled:cursor-default disabled:bg-opacity-40 disabled:text-opacity-40 dark:bg-slate-900 lg:col-span-1",
                selectedSeats.includes(seatNumber) &&
                  "bg-blue-200 dark:bg-blue-800"
              )}
            >
              <span className="m-auto text-xs lg:text-sm">{seatNumber}</span>
            </button>
          ))}
    </div>
  )
}

function SeatsTotal({ selectedSeats, selectedDate, onSeatsConfirmation }) {
  const dateTime = useDateTime({ date: selectedDate.date })

  function getTicketPriceTotal(day, seatsAmount) {
    const total = seatsAmount * (day > 5 ? 0.0012 : 0.001)
    return seatsAmount < 1 ? 0 : total
  }

  return (
    <div className="sticky bottom-0 flex w-full flex-col gap-4 border-t bg-white p-4 dark:border-slate-700 dark:bg-slate-800">
      <div className="flex items-center">
        <div className="flex w-3/6 flex-col items-center gap-2">
          <span className="text-xs lg:text-sm">Total price</span>
          <div className="flex h-8 items-center">
            <span className="text-base">
              {getTicketPriceTotal(dateTime.getDay(), selectedSeats.length)} ETH
            </span>
          </div>
        </div>
        <div className="flex w-3/6 flex-col items-center gap-2">
          <span className="text-xs lg:text-sm">Selected seats</span>
          <div className="flex items-center justify-center gap-2">
            {!selectedSeats.length ? (
              <span className="text-xs">No seats selected</span>
            ) : (
              selectedSeats.map((seatNumber, index) => (
                <span
                  key={index}
                  className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-200 text-xs dark:bg-blue-800"
                >
                  {seatNumber}
                </span>
              ))
            )}
          </div>
        </div>
      </div>
      <button
        disabled={selectedSeats.length < 1}
        onClick={onSeatsConfirmation}
        className="w-full rounded-lg border border-slate-400 p-3 font-poppins text-xs font-medium text-slate-800 shadow-md transition duration-200 hover:bg-blue-200 dark:border-slate-500 dark:text-slate-50 dark:hover:bg-slate-50 dark:hover:text-slate-900"
      >
        Confirm Seats
      </button>
    </div>
  )
}

SeatsModal.Seats = Seats
SeatsModal.SeatsTotal = SeatsTotal
