import { useTicketPriceTotal } from "hooks/useTicketPriceTotal";
import moment from "moment";
import { createPortal } from "react-dom";

import AnimatedContainer from "@/components/AnimatedContainer";
import { mintTicket } from "@/components/reactQuery/mutations/Ticket/mintTicket";

import {
  useMoviePageActionContext,
  useMoviePageValueContext,
} from "./context/appMoviePageContext";

const TicketConfirmationModal = () => {
  const { selectedDate, selectedSeats, selectedShowtime } =
    useMoviePageValueContext();
  const { setModalState, clearSeats } = useMoviePageActionContext();
  const showtimeMoment = moment({ date: selectedDate }).add({
    seconds: selectedShowtime.time,
  });
  const priceTotal = useTicketPriceTotal(
    showtimeMoment.day(),
    selectedSeats.length
  );

  const mintTicketMutation = mintTicket({
    total: priceTotal,
  });

  return createPortal(
    <>
      <AnimatedContainer
        className="fixed left-0 bottom-0 z-30 h-screen w-screen bg-black bg-opacity-70"
        onClick={() => {
          let clearSeatsTimeout = setTimeout(() => clearSeats(), 1000);
          setModalState("");
        }}
      />
      <AnimatedContainer className="fixed bottom-0 z-40 h-5/6 w-full rounded-t-lg bg-slate-100 p-4 dark:bg-slate-800 md:top-1/2 md:left-1/2 md:h-4/6 md:w-3/12 md:-translate-x-1/2 md:-translate-y-1/2 md:rounded-lg lg:w-4/12">
        <div className="flex h-full flex-col gap-4">
          <div className="my-2">
            <h5 className="font-poppins text-sm font-medium">
              Ticket Order Details
            </h5>
          </div>
          <div className="flex h-2/6 items-center justify-between">
            <div className="h-full w-4/12">
              <div className="h-full w-full rounded-lg bg-slate-300" />
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
                  {showtimeMoment.format("llll")}
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
                  {selectedSeats.map((seat, index) => (
                    <span
                      key={index}
                      className="rounded-md bg-blue-400 p-2 px-2.5 text-xs tracking-wider"
                    >
                      {seat}
                    </span>
                  ))}
                </span>
              </div>
              <div className="flex justify-between">
                <p className="text-sm">Regular Seat</p>
                <p className="text-sm">{priceTotal} ETH</p>
              </div>
              <div className="flex justify-between">
                <p className="text-sm">Transaction Fee</p>
                <p className="text-sm">0.00001 ETH</p>
              </div>
            </div>
          </div>
          <div className="flex h-1/6 items-end">
            <button
              onClick={() => {
                setModalState("");
                mintTicketMutation.mutate();
              }}
              className="w-full rounded-lg border border-slate-400 p-3 font-poppins text-sm font-medium text-slate-800 shadow-md backdrop-blur-md dark:text-slate-50"
            >
              Mint Tickets
            </button>
          </div>
        </div>
      </AnimatedContainer>
    </>,
    document.body
  );
};

export default TicketConfirmationModal;
