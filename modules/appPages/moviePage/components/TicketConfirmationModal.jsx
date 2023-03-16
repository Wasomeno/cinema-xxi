import moment from "moment";

import AnimatedContainer from "@/components/AnimatedContainer";
import { mintTicket } from "@/components/reactQuery/mutations/Ticket/mintTicket";

import {
  useMoviePageActionContext,
  useMoviePageValueContext,
} from "./context/appMoviePageContext";

const TicketConfirmationModal = () => {
  const { selectedDate, selectedSeats, selectedShowtime } =
    useMoviePageValueContext();
  const { setModalState } = useMoviePageActionContext();
  const showtimeMoment = moment({ date: selectedDate }).add({
    seconds: selectedShowtime.time,
  });

  function getTotal() {
    const total =
      selectedSeats.length * (showtimeMoment.day() > 5 ? 0.0012 : 0.001);
    return selectedSeats.length < 1 ? 0 : total;
  }

  const mintTicketMutation = mintTicket({
    total: getTotal(),
  });

  return (
    <>
      <AnimatedContainer
        className="fixed left-0 bottom-0 z-30 h-screen w-screen bg-black bg-opacity-70"
        onClick={() => setModalState("")}
      />
      <AnimatedContainer className="fixed bottom-0 z-40 h-5/6 w-full rounded-t-lg bg-slate-800 p-4 text-slate-50 md:top-1/2 md:left-1/2 md:h-4/6 md:w-3/12 md:-translate-x-1/2 md:-translate-y-1/2 md:rounded-lg">
        <div className="flex h-full flex-col gap-4">
          <div className="my-2">
            <h5 className="font-poppins text-sm font-medium">
              Ticket Order Details
            </h5>
          </div>
          <div className="flex h-2/6 items-center justify-evenly">
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
              <div className="flex justify-between">
                <p className="text-sm">{selectedSeats.length} Seats</p>
                <span className="flex items-center gap-2">
                  {selectedSeats.map((seat, index) => (
                    <p key={index} className="text-sm">
                      {seat}
                    </p>
                  ))}
                </span>
              </div>
              <div className="flex justify-between">
                <p className="text-sm">Regular Seat</p>
                <p className="text-sm">{getTotal()} ETH</p>
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
              className="w-full rounded-lg bg-slate-100 p-3 font-poppins text-sm font-medium text-slate-800"
            >
              Mint Tickets
            </button>
          </div>
        </div>
      </AnimatedContainer>
    </>
  );
};

export default TicketConfirmationModal;
