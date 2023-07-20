import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { HiXMark } from "react-icons/hi2";

import AnimatedContainer from "@/components/AnimatedContainer";
import { ModalContainer } from "@/components/ModalContainer";
import mutation from "@/components/reactQuery/mutations/mutation";
import { useSideEffects } from "@/components/reactQuery/mutations/useSideEffects";

import { CinemaMovieSelectableList } from "./CinemaMovieSelectableList";
import { CinemaShowtimeSelectableList } from "./CinemaShowtimeSelectableList";

export const AddStudioShowtimeModal = ({ closeModal }) => {
  const [selectedMovie, setSelectedMovie] = useState(0);
  const [selectedShowtime, setSelectedShowtime] = useState(0);

  const { data: sessionData } = useSession();
  const { query: urlQuery } = useRouter();

  const sideEffects = useSideEffects({
    text: "Adding Studio Showtime",
    queryKeys: ["studioShowtimes", urlQuery.studioId],
  });

  const addStudioShowtime = mutation({
    url: `/api/cinemas/${sessionData?.user.cinemaId}/studios/${urlQuery.studioId}/showtimes`,
    method: "POST",
    body: { showtimeId: selectedShowtime, movieId: selectedMovie },
    sideEffects,
  });

  return (
    <ModalContainer closeModal={closeModal}>
      <AnimatedContainer className="fixed inset-x-1/2 inset-y-1/2 z-30 h-full w-full -translate-x-1/2 -translate-y-1/2 rounded-lg bg-slate-100 px-6 py-4 shadow-md dark:bg-slate-700 lg:h-5/6 lg:w-4/6">
        <div className="mb-4 mt-2 flex items-center justify-between">
          <h3 className="font-poppins text-sm tracking-wider lg:text-lg">
            Add Studio Showtime
          </h3>
          <button onClick={closeModal}>
            <HiXMark size="20" />
          </button>
        </div>
        <div className="relative flex h-5/6 w-full snap-x snap-proximity justify-start gap-4 overflow-x-scroll lg:justify-center">
          <CinemaMovieSelectableList
            cinemaId={sessionData?.user.cinemaId}
            selectMovie={(movieId) => setSelectedMovie(movieId)}
            selectedMovie={selectedMovie}
          />
          <CinemaShowtimeSelectableList
            cinemaId={sessionData?.user.cinemaId}
            selectShowtime={(showtimeId) => setSelectedShowtime(showtimeId)}
            selectedShowtime={selectedShowtime}
          />
        </div>
        <div className="mt-4 text-center">
          <button
            disabled={!selectedMovie || !selectedShowtime}
            onClick={() => {
              addStudioShowtime.mutate();
              closeModal();
            }}
            className="w-4/6 rounded-lg border border-slate-300 bg-green-100 py-2 font-poppins text-sm shadow-sm disabled:opacity-50"
          >
            Submit
          </button>
        </div>
      </AnimatedContainer>
    </ModalContainer>
  );
};
