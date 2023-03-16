import { useEffect } from "react";

import AnimatedContainer from "@/components/AnimatedContainer";

import {
  useMoviePageActionContext,
  useMoviePageValueContext,
} from "../context/appMoviePageContext";
import SeatColumns from "./SeatColumns";
import SeatTotal from "./SeatTotal";

export const SeatsModal = () => {
  const { setModalState } = useMoviePageActionContext();
  const { selectedShowtime } = useMoviePageValueContext();

  return (
    <>
      <AnimatedContainer
        className="fixed left-0 bottom-0 z-30 h-screen w-screen bg-black bg-opacity-70"
        onClick={() => setModalState("")}
      />
      <AnimatedContainer className="fixed bottom-0 left-1/2 z-40 h-5/6 w-full -translate-x-1/2 overflow-x-scroll rounded-t-lg bg-white lg:bottom-1/2 lg:top-1/2 lg:w-5/6 lg:-translate-y-1/2">
        <div className="flex items-center justify-center gap-5">
          <div className="">
            <h5 className="p-2 font-poppins md:text-lg">
              {selectedShowtime.cinemaId}
            </h5>
          </div>
          <div>
            <h5 className="p-2 font-poppins md:text-lg">
              {selectedShowtime.time}
            </h5>
          </div>
        </div>
        <SeatColumns />
        <SeatTotal />
      </AnimatedContainer>
    </>
  );
};
