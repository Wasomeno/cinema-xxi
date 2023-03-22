import moment from "moment";
import { createPortal } from "react-dom";

import AnimatedContainer from "@/components/AnimatedContainer";

import {
  useMoviePageActionContext,
  useMoviePageValueContext,
} from "../context/appMoviePageContext";
import SeatColumns from "./SeatColumns";
import SeatTotal from "./SeatTotal";

export const SeatsModal = () => {
  const { setModalState, clearSeats } = useMoviePageActionContext();
  const { selectedShowtime, selectedDate } = useMoviePageValueContext();

  const time = moment({ date: selectedDate })
    .add({ seconds: selectedShowtime.time })
    .format("llll");

  return createPortal(
    <>
      <AnimatedContainer
        className="fixed left-0 bottom-0 z-30 h-screen w-screen bg-black bg-opacity-70"
        onClick={() => {
          setModalState("");
          clearSeats();
        }}
      />
      <AnimatedContainer className="fixed bottom-0 left-1/2 z-40 h-5/6 w-full -translate-x-1/2 overflow-x-scroll rounded-t-lg bg-white lg:bottom-1/2 lg:top-1/2 lg:w-5/6 lg:-translate-y-1/2">
        <div className="flex items-center justify-center gap-5">
          <h5 className="p-2 font-poppins text-sm md:text-lg">
            {selectedShowtime.movie.title}
          </h5>
          <h5 className="p-2 font-poppins text-sm md:text-lg">{time}</h5>
        </div>
        <SeatColumns />
        <SeatTotal />
      </AnimatedContainer>
    </>,
    document.body
  );
};
