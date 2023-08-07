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
      className="w-full items-center gap-4 overflow-y-scroll rounded-t-lg lg:w-3/6 lg:rounded-lg"
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
                "col-span-2 h-8  cursor-pointer rounded-lg bg-slate-200 shadow-sm transition duration-200 disabled:cursor-default disabled:bg-opacity-40 disabled:text-opacity-40 dark:bg-slate-800 lg:col-span-1",
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
    <div className="flex h-32 w-full flex-col justify-around rounded-lg border bg-slate-100 p-4 dark:border-slate-500 dark:bg-slate-700">
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
                  className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-200 text-xs dark:bg-blue-800"
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
          className="w-3/6 rounded-lg bg-blue-200 p-2 font-poppins text-xs text-slate-800 transition duration-200 enabled:hover:bg-blue-300 disabled:bg-opacity-50 disabled:text-opacity-50 dark:bg-slate-50 dark:enabled:hover:bg-slate-300 md:text-sm"
        >
          Confirm Seats
        </button>
      </div>
    </div>
  )
}

SeatsModal.Seats = Seats
SeatsModal.SeatsTotal = SeatsTotal
