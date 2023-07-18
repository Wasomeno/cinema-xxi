import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { HiXMark } from "react-icons/hi2";
import { IoCheckmarkCircle } from "react-icons/io5";

import AnimatedContainer from "@/components/AnimatedContainer";
import { ModalContainer } from "@/components/ModalContainer";
import mutation from "@/components/reactQuery/mutations/mutation";
import { useSideEffects } from "@/components/reactQuery/mutations/useSideEffects";
import { query } from "@/components/reactQuery/queries/query";
import { cinemaQueryKeys } from "@/components/reactQuery/queries/queryKeys/cinemaQueryKeys";

export const EditStudioShowtimeModal = ({ showtimeDetails, closeModal }) => {
  const [selectedMovie, setSelectedMovie] = useState(0);
  const [selectedShowtime, setSelectedShowtime] = useState(0);

  const { data: sessionData } = useSession();
  const { query: urlQuery } = useRouter();

  const cinemaShowtimes = query({
    queryKey: cinemaQueryKeys.cinemaShowtimes(sessionData?.user.cinemaId),
    url: "/api/cinemas/" + sessionData?.user.cinemaId + "/showtimes",
    enabledCondition: sessionData?.user !== undefined,
  });

  const cinemaMovies = query({
    queryKey: cinemaQueryKeys.cinemaMovies(sessionData?.user.cinemaId),
    url: "/api/cinemas/" + sessionData?.user.cinemaId + "/movies",
    enabledCondition: sessionData?.user.cinemaId !== undefined,
  });

  const sideEffects = useSideEffects({
    text: "Updating Studio Showtime",
    queryKeys: ["studioShowtimes", urlQuery.studioId],
  });

  const updateStudioShowtime = mutation({
    url: `/api/cinemas/${sessionData?.user.cinemaId}/studios/${urlQuery.studioId}/showtimes/${showtimeDetails.id}`,
    method: "PATCH",
    body: { showtimeId: selectedShowtime, movieId: selectedMovie },
    sideEffects,
  });

  useEffect(() => {
    setSelectedMovie(showtimeDetails.movieId);
    setSelectedShowtime(showtimeDetails.showtimeId);
  }, [showtimeDetails]);

  if (cinemaMovies.isLoading) return;
  return (
    <ModalContainer closeModal={closeModal}>
      <AnimatedContainer className="fixed inset-x-1/2 inset-y-1/2 z-30 h-full w-full -translate-x-1/2  -translate-y-1/2 rounded-lg bg-slate-100 px-6 py-4 shadow-md dark:bg-slate-700 lg:h-5/6 lg:w-4/6">
        <div className="mb-4 mt-2 flex items-center justify-between">
          <h3 className="font-poppins text-sm tracking-wider lg:text-lg">
            Edit Studio Showtimes
          </h3>
          <button onClick={closeModal}>
            <HiXMark size="20" />
          </button>
        </div>
        <div className="relative flex h-5/6 w-full snap-x snap-proximity justify-start gap-4 overflow-x-scroll lg:justify-center">
          <div className="flex flex-1 snap-center flex-col gap-1.5">
            <h5 className="text-sm">Select movie</h5>
            <div className="flex h-full w-80 flex-col rounded-lg border bg-slate-50 lg:w-full">
              {cinemaMovies.data.map((movie) => (
                <button
                  onClick={() => setSelectedMovie(movie.id)}
                  key={movie.id}
                  className="relative border-b p-2 text-sm"
                >
                  {selectedMovie === movie.id && (
                    <span className="absolute left-5 top-1/2 -translate-y-1/2">
                      <IoCheckmarkCircle size="16" className="text-green-600" />
                    </span>
                  )}
                  {movie.title}
                </button>
              ))}
            </div>
          </div>
          <div className="flex snap-center flex-col gap-1.5 lg:flex-1">
            <h5 className="text-sm">Select Showtime</h5>
            <div className="flex h-full w-80 flex-col rounded-lg border bg-slate-50 lg:w-full">
              {cinemaShowtimes.data.map((showtime) => (
                <button
                  onClick={() => setSelectedShowtime(showtime.id)}
                  key={showtime.id}
                  className="relative border-b p-2 text-sm"
                >
                  {selectedShowtime === showtime.id && (
                    <span className="absolute left-5 top-1/2 -translate-y-1/2">
                      <IoCheckmarkCircle size="16" className="text-green-600" />
                    </span>
                  )}
                  {showtime.hour}:{showtime.minutes}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-4 text-center">
          <button
            onClick={() => {
              updateStudioShowtime.mutate();
              closeModal();
            }}
            className="w-4/6 rounded-lg border border-slate-300 bg-green-100 py-2 font-poppins text-sm shadow-sm"
          >
            Submit
          </button>
        </div>
      </AnimatedContainer>
    </ModalContainer>
  );
};
