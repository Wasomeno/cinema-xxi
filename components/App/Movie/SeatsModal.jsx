import { useEffect } from "react"
import { useDateTime } from "hooks/useDateTime"
import { useSkeleton } from "hooks/useSkeleton"
import { twMerge } from "tailwind-merge"

import { CenteredModal, ModalHeader } from "@/components/Modal"
import { query } from "@/components/reactQuery/queries/query"

import SeatSkeleton from "./SeatSkeleton"

export default function SeatsModal({ title, closeModal, seats, seatsTotal }) {
  return (
    <CenteredModal
      closeModal={closeModal}
      className="flex w-full flex-col gap-2 overflow-y-scroll rounded-t-lg bg-slate-50 p-0 dark:bg-slate-800 lg:w-3/6 lg:gap-4 lg:rounded-lg"
    >
      <ModalHeader title={title} className="p-4" closeModal={closeModal} />
      <div className="flex flex-1 flex-col justify-between overflow-x-scroll px-4">
        {seats}
      </div>

      {seatsTotal}
    </CenteredModal>
  )
}

function Seats({
  setSeatsId,
  setSelectedSeats,
  selectedSeats,
  selectedDate,
  selectedShowtime,
}) {
  const seatSkeletons = useSkeleton(<SeatSkeleton />, 4)
  const showtimeSeats = query({
    queryKey: [
      "showtimeSeats",
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
    let seatsSection = []
    let seatIndex = 0
    let otherIndex = 0
    for (let i = 0; i < showtimeSeats.data?.studio.capacity; ++i) {
      seatsSection[otherIndex] = i + 1
      otherIndex += 1
      if (i === (seatIndex + 1) * 15 - 1) {
        seats[seatIndex] = seatsSection
        seatsSection = []
        otherIndex = 0
        seatIndex += 1
      }
    }
    return seats
  }

  useEffect(() => {
    if (!showtimeSeats.isLoading) setSeatsId(showtimeSeats.data?.id)
  }, [showtimeSeats.isLoading])

  return (
    <div className="grid w-[500px] grid-cols-2 gap-10 lg:w-auto">
      {showtimeSeats.isLoading
        ? seatSkeletons.map((skeleton) => skeleton)
        : generateSeats().map((row, rowIndex) => (
            <div
              key={rowIndex}
              className="grid grid-cols-5 justify-items-center gap-2 lg:w-auto"
            >
              {row.map((seatNumber, seatIndex) => (
                <button
                  key={seatIndex}
                  disabled={showtimeSeats.data?.seats_taken.includes(
                    seatNumber
                  )}
                  onClick={() => {
                    selectedSeats.includes(seatNumber)
                      ? deselectSeat(seatNumber)
                      : selectSeat(seatNumber)
                  }}
                  className={twMerge(
                    "h-10 w-10 rounded-lg bg-slate-200 shadow-sm transition duration-200 disabled:cursor-default disabled:bg-opacity-50 disabled:text-opacity-40 dark:bg-slate-700 lg:col-span-1",
                    selectedSeats.includes(seatNumber) &&
                      "bg-blue-200 dark:bg-blue-800"
                  )}
                >
                  <span className="m-auto text-xs lg:text-sm">
                    {seatNumber}
                  </span>
                </button>
              ))}
            </div>
          ))}
    </div>
  )
}

function SeatsTotal({ selectedSeats, selectedDate, onSeatsConfirmation }) {
  const dateTime = useDateTime({ date: selectedDate.date })

  function getTicketPriceTotal(day, seatsAmount) {
    const total = seatsAmount * (day > 5 ? 0.0012 : 0.001)
    return seatsAmount < 1 ? 0 : total.toFixed(3)
  }

  return (
    <div className="dark:border-t-700 sticky flex w-full flex-col gap-4 border-t bg-white px-4 py-4 dark:border-slate-700 dark:bg-slate-800">
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
          <div className="grid max-h-16 grid-cols-5 justify-center gap-x-10 gap-y-2 overflow-scroll lg:grid-cols-6 lg:gap-x-2">
            {!selectedSeats.length ? (
              <span className="col-span-5 text-center text-xs lg:col-span-6">
                No seats selected
              </span>
            ) : (
              selectedSeats.map((seatNumber, index) => (
                <span
                  key={index}
                  className="flex h-8 w-8 items-center justify-center rounded-md bg-blue-200 text-xs dark:bg-blue-800"
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
        className="w-full rounded-lg border border-slate-400 p-3 font-poppins text-xs font-medium text-slate-800 shadow-md transition duration-200 enabled:hover:bg-blue-200 disabled:opacity-50 dark:border-slate-500 dark:text-slate-50 enabled:dark:hover:bg-blue-800 dark:disabled:opacity-50"
      >
        Confirm Seats
      </button>
    </div>
  )
}

SeatsModal.Seats = Seats
SeatsModal.SeatsTotal = SeatsTotal
