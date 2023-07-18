import { useDateTime } from "hooks/useDateTime";
import Image from "next/image";

import AnimatedContainer from "@/components/AnimatedContainer";
import { ModalContainer } from "@/components/ModalContainer";
import { useMintTicket } from "@/components/reactQuery/mutations/Ticket/useMintTicket";

const TicketConfirmationModal = ({
  closeModal,
  seatsId,
  selectedDate,
  selectedSeats,
  selectedShowtime,
}) => {
  const dateTime = useDateTime({
    date: selectedDate.date,
    month: selectedDate.month,
    hours: selectedShowtime.showtime.hour,
    minutes: selectedShowtime.showtime.minutes,
  });

  const mintTicketMutation = useMintTicket({
    total: 1,
    seatsId,
    selectedDate,
    selectedSeats,
    selectedShowtime,
  });

  function getTicketPriceTotal(day, seatsAmount) {
    const total = seatsAmount * (day > 5 ? 0.0012 : 0.001);
    return seatsAmount < 1 ? 0 : total;
  }

  return (
    <ModalContainer closeModal={closeModal}>
      <AnimatedContainer className="fixed bottom-0 z-40 h-5/6 w-full rounded-t-lg bg-slate-100 p-4 dark:bg-slate-800 md:left-1/2 md:top-1/2 md:h-4/6 md:w-3/12 md:-translate-x-1/2 md:-translate-y-1/2 md:rounded-lg lg:w-4/12">
        <div className="flex h-full flex-col gap-4">
          <div className="my-2">
            <h5 className="font-poppins text-sm font-medium">Ticket Details</h5>
          </div>
          <div className="flex h-2/6 items-center justify-between">
            <div className="relative h-full w-4/12">
              <Image
                src={selectedShowtime.movie.image_url}
                alt="movie-image"
                fill
                className="rounded-lg"
              />
            </div>
            <div className="flex h-full w-7/12 items-center justify-center">
              <div className="flex w-5/6 flex-col gap-2">
                <h5 className="font-poppins text-sm font-medium">
                  {selectedShowtime.movie.title}
                </h5>
                <p className="font-poppins text-xs">
                  {selectedShowtime.cinema.name}, Studio{" "}
                  {selectedShowtime.studio.studio}
                </p>
                <p className="font-poppins text-xs">
                  {`${dateTime.toDateString()}, ${
                    selectedShowtime.showtime.hour
                  }:${selectedShowtime.showtime.minutes} PM`}
                </p>
              </div>
            </div>
          </div>
          <div className="h-2/6">
            <div className="my-2">
              <h5 className="font-poppins text-sm font-medium">
                Transaction Details
              </h5>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <p className="text-sm">{selectedSeats.length} Seats</p>
                <span className="flex items-center gap-2">
                  {selectedSeats.map((seatNumber, index) => (
                    <span
                      key={index}
                      className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-200 px-2.5 text-xs tracking-wider"
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
          <div className="flex h-1/6 items-end">
            <button
              onClick={() => {
                closeModal();
                mintTicketMutation.mutate();
              }}
              className="w-full rounded-lg border border-slate-400 p-3 font-poppins text-sm font-medium text-slate-800 shadow-md transition duration-200 hover:bg-blue-200 dark:text-slate-50"
            >
              Mint Tickets
            </button>
          </div>
        </div>
      </AnimatedContainer>
    </ModalContainer>
  );
};

export default TicketConfirmationModal;
