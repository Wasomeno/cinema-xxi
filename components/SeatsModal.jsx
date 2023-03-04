import { AnimatePresence } from "framer-motion";
import { useSelectDeselect } from "hooks/useSelectDeselect";
import React, { useEffect } from "react";

import AnimatedContainer from "./AnimatedContainer";
import DataContainer from "./DataContainer";
import { useMovieAvailableSeats } from "./reactQuery/queries/Cinema/useMovieAvailableSeats";
import { Paragraph } from "./shared/Texts";

const SeatsModal = ({
  toggleShowSeatsModal,
  toggleTicketConfirmationModal,
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

  const isSeatSelected = (seat) => {
    const result = selectedSeats.includes(seat);
    return result ? deselectSeat(seat) : selectSeat(seat);
  };

  function getTotal() {
    const total = selectedSeats.length * 0.001;
    return selectedSeats.length < 1 ? 0 : total;
  }

  return (
    <>
      <AnimatedContainer
        className="fixed left-0 bottom-0 z-30 h-screen w-screen bg-black bg-opacity-70"
        onClick={() => toggleShowSeatsModal()}
      />
      <AnimatedContainer className="fixed bottom-0 left-1/2 z-40 h-5/6 w-full -translate-x-1/2 rounded-t-lg bg-white lg:bottom-1/2 lg:top-1/2 lg:w-5/6 lg:-translate-y-1/2">
        <div className="flex items-center justify-center gap-5">
          <div className="">
            <h5 className="p-2 font-poppins md:text-lg">
              Cinema {parseInt(cinema)}
            </h5>
          </div>
          <div>
            <h5 className="p-2 font-poppins md:text-lg">
              {parseInt(showtime)}
            </h5>
          </div>
        </div>

        <div className="relative">
          <DataContainer
            className="flex flex-wrap justify-center gap-3 p-3"
            loading={false}
            object="seats"
          >
            {availableSeats.data?.map((seat, index) => (
              <button
                key={index}
                onClick={() => isSeatSelected(parseInt(seat))}
                className={
                  "h-8 w-8 rounded-lg p-2 transition duration-150 ease-in-out hover:scale-105 " +
                  (selectedSeats.includes(parseInt(seat))
                    ? "bg-blue-400"
                    : "bg-slate-500")
                }
              >
                <h5 className="text-center font-poppins text-sm font-medium text-white">
                  {parseInt(seat)}
                </h5>
              </button>
            ))}
          </DataContainer>
        </div>

        <div className="mx-auto my-4 h-8 w-5/6 rounded-full bg-slate-700 p-2 text-center lg:w-5/6">
          <p className="font-poppins text-sm text-white">Screen</p>
        </div>
        <div className="fixed bottom-4 left-1/2 flex h-44 w-5/6 -translate-x-1/2 flex-col justify-around rounded-md border-2 border-blue-100 p-2 shadow-md">
          <div className="flex h-4/6 items-start justify-center">
            <div className="w-6/12">
              <div className="mb-2 text-center">
                <Paragraph size="xs" style="medium">
                  Total
                </Paragraph>
              </div>
              <div className="text-center">
                <Paragraph size="xs">{getTotal() + " ETH"}</Paragraph>
              </div>
            </div>
            <div className="w-6/12">
              <div className="mb-2 text-center">
                <Paragraph size="xs" style="medium">
                  Selected Seats
                </Paragraph>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-3">
                {selectedSeats.length < 1 ? (
                  <Paragraph size="xs">No Seats Selected</Paragraph>
                ) : (
                  selectedSeats.map((seat) => (
                    <div
                      key={seat}
                      className="flex h-8 w-8 items-center justify-center rounded-md bg-blue-400"
                      onClick={() => deselectSeat(seat)}
                    >
                      <Paragraph size="xs">{seat}</Paragraph>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
          <div className="text-center">
            <button
              disabled={selectedSeats.length < 1}
              onClick={() => {
                toggleShowSeatsModal();
                toggleTicketConfirmationModal();
              }}
              className="w-3/6 rounded-md bg-slate-900 p-2 font-poppins text-xs text-white disabled:bg-slate-500 disabled:text-slate-400"
            >
              Confirm Tickets
            </button>
          </div>
        </div>
      </AnimatedContainer>
    </>
  );
};

export default SeatsModal;
