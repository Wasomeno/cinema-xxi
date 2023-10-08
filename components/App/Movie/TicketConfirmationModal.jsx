import Image from "next/image"
import { useDateTime } from "hooks/useDateTime"

import { CenteredModal, ModalHeader } from "@/components/Modal"
import { useMintTicket } from "@/components/reactQuery/mutations/Ticket/useMintTicket"

import {
  useSeatsId,
  useSelectedDate,
  useSelectedSeats,
  useSelectedShowtime,
} from "./TicketContextProvider"

const TicketConfirmationModal = ({ closeModal }) => {
  const { selectedDate } = useSelectedDate()
  const { selectedShowtime } = useSelectedShowtime()
  const { selectedSeats } = useSelectedSeats()
  const { seatsId } = useSeatsId()

  const dateTime = useDateTime({
    date: selectedDate.date,
    month: selectedDate.month,
    hours: selectedShowtime.showtime.hour,
    minutes: selectedShowtime.showtime.minutes,
  })

  const mintTicketMutation = useMintTicket({
    total: 1,
    seatsId,
    selectedDate,
    selectedSeats,
    selectedShowtime,
  })

  function getTicketPriceTotal(day, seatsAmount) {
    const total = seatsAmount * (day > 5 ? 0.0012 : 0.001)
    return seatsAmount < 1 ? 0 : total
  }

  return (
    <CenteredModal
      closeModal={closeModal}
      className="flex h-5/6 w-full flex-col justify-between gap-4 bg-slate-50 dark:bg-slate-800 md:h-4/6 md:w-3/12 lg:h-4/6 lg:w-4/12"
    >
      <ModalHeader title="Ticket Details" closeModal={closeModal} />
      <div className="flex flex-1 flex-col gap-4">
        <div className="flex items-center gap-4">
          <div className="relative h-44 w-48 lg:h-52 lg:w-52">
            <Image
              src={selectedShowtime.movie.image_url}
              alt="movie-image"
              className="rounded-lg"
              fill
            />
          </div>
          <div className="flex w-5/6 flex-col gap-2">
            <h5 className="font-poppins text-sm font-medium">
              {selectedShowtime.movie.title}
            </h5>
            <p className="font-poppins text-xs">
              {selectedShowtime.cinema.name}, Studio{" "}
              {selectedShowtime.studio.studio}
            </p>
            <p className="font-poppins text-xs">
              {`${dateTime.toDateString()}, ${selectedShowtime.showtime.hour}:${
                selectedShowtime.showtime.minutes
              } PM`}
            </p>
          </div>
        </div>
        <div className="h-2/6">
          <h5 className="font-poppins text-sm font-medium">
            Transaction Details
          </h5>
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <p className="text-sm">{selectedSeats.length} Seats</p>
              <span className="flex items-center gap-2">
                {selectedSeats.map((seatNumber, index) => (
                  <span
                    key={index}
                    className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-200 px-2.5 text-xs tracking-wider dark:bg-blue-800"
                  >
                    {seatNumber}
                  </span>
                ))}
              </span>
            </div>
            <div className="flex justify-between">
              <p className="text-sm">Regular Seat</p>
              <p className="text-sm">
                {`${getTicketPriceTotal(
                  dateTime.getDay(),
                  selectedSeats.length
                )} ETH`}
              </p>
            </div>
            <div className="flex justify-between">
              <p className="text-sm">Transaction Fee</p>
              <p className="text-sm">0.0001 ETH</p>
            </div>
          </div>
        </div>
      </div>
      <button
        onClick={() => {
          closeModal()
          mintTicketMutation.mutate()
        }}
        className="w-full rounded-lg border border-slate-400 p-3 font-poppins text-xs font-medium text-slate-800 shadow-md transition duration-200 hover:bg-blue-200 dark:border-slate-500 dark:text-slate-50 dark:hover:bg-slate-50 dark:hover:text-slate-900 lg:text-sm"
      >
        Mint Tickets
      </button>
    </CenteredModal>
  )
}

export default TicketConfirmationModal
