import { AnimatePresence } from "framer-motion";
import { useSelectDeselect } from "hooks/useSelectDeselect";
import React, { useEffect } from "react";
import AnimatedContainer from "./AnimatedContainer";
import DataContainer from "./DataContainer";
import { mintTickets } from "./reactQuery/mutations/Ticket/mintTickets";
import { useMovieAvailableSeats } from "./reactQuery/queries/Cinema/useMovieAvailableSeats";
import { Paragraph } from "./shared/Texts";

const SeatsModal = ({
  show,
  setShow,
  region,
  cinema,
  studio,
  showtime,
  movie,
}) => {
  const availableSeats = useMovieAvailableSeats({
    region: region,
    cinema: cinema,
    studio: studio,
    showtime: showtime,
  });
  const [selectedSeats, selectSeat, deselectSeat] = useSelectDeselect([]);

  const mintTicketsMutation = mintTickets({
    region: region,
    cinema: cinema,
    studio: studio,
    showtime: showtime,
    seatNumbers: selectedSeats,
    movie: movie,
    total: getTotal(),
  });

  const isSeatSelected = (seat) => {
    const result = selectedSeats.includes(seat);
    return result ? deselectSeat(seat) : selectSeat(seat);
  };

  function getTotal() {
    const total = selectedSeats.length * 0.001;
    return selectedSeats.length < 1 ? 0 : total;
  }

  useEffect(() => {}, [selectedSeats]);

  return (
    <AnimatePresence>
      {show && (
        <>
          <AnimatedContainer
            className="w-full h-full bg-black bg-opacity-70 absolute right-0 top-0"
            onClick={() => setShow(false)}
          />
          <AnimatedContainer className="w-full h-5/6 bg-white rounded-t-xl absolute bottom-0 left-1/2 -translate-x-1/2 lg:left-36 xl:left-36 z-20">
            <div className="w-screen lg:w-full xl:w-full flex items-center">
              <div className="mx-auto">
                <h1 className="p-2 font-poppins text-base  font-medium lg:text-xl">
                  {parseInt(showtime)}
                </h1>
              </div>
            </div>

            <div className="w-screen relative">
              <DataContainer
                className="p-3 flex flex-wrap justify-center gap-3 lg:w-full max-w-screen-xl"
                loading={availableSeats.isLoading}
                object="seats"
              >
                {availableSeats.data?.map((seat, index) => (
                  <button
                    key={index}
                    onClick={() => isSeatSelected(parseInt(seat))}
                    className={
                      "p-2 rounded-lg w-8 h-8 transition duration-150 ease-in-out hover:scale-105 " +
                      (selectedSeats.includes(parseInt(seat))
                        ? "bg-blue-400"
                        : "bg-slate-500")
                    }
                  >
                    <h5 className="font-poppins font-medium text-center text-sm text-white">
                      {parseInt(seat)}
                    </h5>
                  </button>
                ))}
              </DataContainer>
            </div>

            <div className="w-5/6 mx-auto my-4 h-8 lg:w-full bg-slate-700 rounded-full p-2 text-center">
              <p className="font-poppins text-white text-sm">Screen</p>
            </div>
            <div className="fixed w-5/6 h-32 p-2 border-2 border-blue-100 shadow-md rounded-md bottom-4 left-1/2 -translate-x-1/2">
              <div className="h-4/6 flex justify-center items-start">
                <div className="w-6/12">
                  <div className="text-center mb-2">
                    <Paragraph text="Total" size="xs" style="medium" />
                  </div>
                  <div className="text-center">
                    <Paragraph text={getTotal() + " ETH"} size="xs" />
                  </div>
                </div>
                <div className="w-6/12">
                  <div className="text-center mb-2">
                    <Paragraph text="Selected Seats" size="xs" style="medium" />
                  </div>
                  <div className="flex justify-center gap-3 items-center">
                    {selectedSeats.length < 1 ? (
                      <Paragraph text="No Selected Seats" size="xs" />
                    ) : (
                      selectedSeats.map((seat) => (
                        <div onClick={() => deselectSeat(seat)}>
                          <Paragraph text={seat} size="xs" />
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
              <div className="h-2/6 text-center">
                <button
                  disabled={selectedSeats.length < 1}
                  onClick={() => mintTicketsMutation()}
                  className="text-xs disabled:bg-slate-500 disabled:text-slate-400 font-poppins p-2 w-3/6 rounded-md bg-slate-900 text-white"
                >
                  Submit
                </button>
              </div>
            </div>
          </AnimatedContainer>
        </>
      )}
    </AnimatePresence>
  );
};

export default SeatsModal;
