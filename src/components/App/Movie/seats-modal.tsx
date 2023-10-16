"use client"

import { useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"
import { useQuery } from "@tanstack/react-query"
import { twMerge } from "tailwind-merge"

import { useDateTime } from "@/hooks/useDateTime"
import { useSkeleton } from "@/hooks/useSkeleton"
import { CenteredModal, ModalHeader } from "@/components/modal"

import SeatSkeleton from "./SeatSkeleton"
import {
  useSeatsId,
  useSelectedDate,
  useSelectedSeats,
  useSelectedShowtime,
} from "./ticket-context-provider"

export default function SeatsModal() {
  const { selectedShowtime } = useSelectedShowtime()
  const pathname = usePathname()
  const router = useRouter()
  return (
    <CenteredModal
      closeModal={() => router.replace(pathname)}
      className="flex w-full flex-col gap-2 overflow-y-scroll rounded-t-lg bg-slate-50 p-0 dark:bg-slate-800 lg:w-3/6 lg:gap-4 lg:rounded-lg"
    >
      <ModalHeader
        closeModal={() => router.replace(pathname)}
        title={selectedShowtime?.movie.title}
        className="p-4"
      />
      <div className="flex flex-1 flex-col justify-between overflow-x-scroll px-4">
        <Seats />
      </div>

      <SeatsTotal />
    </CenteredModal>
  )
}

function Seats() {
  const { setSeatsId } = useSeatsId()
  const { selectedDate } = useSelectedDate()
  const { selectedShowtime } = useSelectedShowtime()
  const { selectedSeats, selectSeat, deselectSeat } = useSelectedSeats()

  const seatSkeletons = useSkeleton(<SeatSkeleton />, 4)
  const showtimeSeats = useQuery(
    [
      "showtimeSeats",
      selectedShowtime?.studio.cinemaId,
      selectedShowtime?.studio.id,
      selectedShowtime?.id,
      selectedDate?.date,
    ],
    () =>
      fetch(
        `/api/cinemas/${selectedShowtime?.studio.cinema.id}/studios/${selectedShowtime?.studio.id}/showtimes/${selectedShowtime?.id}/${selectedDate?.date}/seats`
      ).then((response) => response.json())
  )

  function generateSeats() {
    const array = Array(showtimeSeats.data?.studio.capacity)

    let seats: number[][] = [[]]
    let seatRowIndex = 0

    for (let key of array.keys()) {
      seats[seatRowIndex][key] = key + 1
      if ((key + 1) % 15 === 0) {
        seats.push([])
        seatRowIndex++
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
                    selectedSeats?.includes(seatNumber)
                      ? deselectSeat(seatNumber)
                      : selectSeat(seatNumber)
                  }}
                  className={twMerge(
                    "h-10 w-10 rounded-lg bg-slate-200 shadow-sm transition duration-200 disabled:cursor-default disabled:bg-opacity-50 disabled:text-opacity-40 dark:bg-slate-700 lg:col-span-1",
                    selectedSeats?.includes(seatNumber) &&
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

function SeatsTotal() {
  const { selectedDate } = useSelectedDate()
  const { selectedSeats } = useSelectedSeats()
  const dateTime = useDateTime({ date: selectedDate?.date })

  const pathnmame = usePathname()
  const router = useRouter()

  function getTicketPriceTotal(day: number, seatsAmount: number) {
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
              {getTicketPriceTotal(dateTime.getDay(), selectedSeats?.length)}{" "}
              ETH
            </span>
          </div>
        </div>
        <div className="flex w-3/6 flex-col items-center gap-2">
          <span className="text-xs lg:text-sm">Selected seats</span>
          <div className="grid max-h-16 grid-cols-5 justify-center gap-x-10 gap-y-2 overflow-scroll lg:grid-cols-6 lg:gap-x-2">
            {!selectedSeats?.length ? (
              <span className="col-span-5 text-center text-xs lg:col-span-6">
                No seats selected
              </span>
            ) : (
              selectedSeats?.map((seatNumber, index) => (
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
        disabled={(selectedSeats?.length as number) < 1}
        onClick={() => router.replace(`${pathnmame}?confirmation=true`)}
        className="w-full rounded-lg border border-slate-400 p-3 font-poppins text-xs font-medium text-slate-800 shadow-md transition duration-200 enabled:hover:bg-blue-200 disabled:opacity-50 dark:border-slate-500 dark:text-slate-50 enabled:dark:hover:bg-blue-800 dark:disabled:opacity-50"
      >
        Confirm Seats
      </button>
    </div>
  )
}
