import { AnimatePresence } from "framer-motion";
import useToggle from "hooks/useToggle";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useState } from "react";

import DataContainer from "@/components/DataContainer";
import ChevronRight from "@/components/Icons/ChevronRight";
import { useRegionMovieShowtimes } from "@/components/reactQuery/queries/Cinema/useCinemaMovieShowtimes";
import { useMovieDetails } from "@/components/reactQuery/queries/Movie/useMovieDetails";
import { Paragraph, Title } from "@/components/shared/Texts";

const Movie = () => {
  const { regionId, movieId } = useRouter().query;
  const fetchedMovieDetails = useMovieDetails({ movieId: movieId });
  const fetchedMovieShowtimes = useRegionMovieShowtimes({
    region: regionId,
    movie: movieId,
  });

  const SeatsModal = dynamic(() => import("@/components/SeatsModal"));
  const TicketConfirmationModal = dynamic(() =>
    import("@/components/TicketConfirmationModal")
  );

  const createArray = () => {
    let array = [];
    for (let i = 0; i < fetchedMovieShowtimes.data.showtimes.length; ++i) {
      array.push(false);
    }
    return array;
  };

  const [selectedShowtime, setSelectedShowtime] = useState(0);
  const [selectedCinema, setSelectedCinema] = useState(0);
  const [selectedStudio, setSelectedStudio] = useState(0);
  const [selectedDate, setSelectedDate] = useState(getDatesArray()[0]);
  const [showSeatsModal, toggleShowSeatsModal] = useToggle(false);
  const [showCinemaShowtimes, setShowCinemaShowtimes] = useState(createArray());
  const [showTicketConfirmationModal, toggleTicketConfirmationModal] =
    useToggle(false);

  function toggleCinemaShowtimes(index) {
    let currentStateArray = showCinemaShowtimes;
    currentStateArray[index] = !currentStateArray[index];
    setShowCinemaShowtimes([...currentStateArray]);
  }

  function getDatesArray() {
    let array = [];
    const dateNow = Date.now();
    for (let i = 0; i < 5; ++i) {
      let date = new Date(dateNow + 86400000 * i);
      array.push(date.getDate());
    }
    return array;
  }

  const selectShowtime = (showtime, studio, cinema) => {
    toggleShowSeatsModal();
    setSelectedShowtime(showtime),
      setSelectedStudio(studio),
      setSelectedCinema(cinema);
  };

  return (
    <div className="h-screen">
      <div className="my-4 text-center">
        <Title>{fetchedMovieDetails.data?.title}</Title>
      </div>
      <div className="flex w-full items-start justify-center gap-5 ">
        <div className="flex w-4/12 justify-center p-2 sm:h-full sm:w-3/12 md:h-full md:w-4/12 lg:h-full lg:w-4/12 xl:w-3/12">
          <div className="h-44 w-full rounded-lg bg-slate-400 sm:h-52 md:h-64 md:w-4/6 lg:h-80" />
        </div>
        <div className="flex w-4/12 flex-col gap-4 p-2">
          <div>
            <p className="font-inter mb-2 text-xs font-semibold md:text-sm lg:text-base">
              Synopsis
            </p>
            <p className="overflow-hidden text-ellipsis font-poppins text-xs tracking-wide"></p>
          </div>
          <div className="w-full">
            <p className="font-inter mb-2 text-xs font-semibold md:text-sm lg:text-base">
              Casts
            </p>
          </div>
        </div>
      </div>
      <div className="m-2 flex flex-col items-center">
        <div className="w-5/6">
          <h3 className="m-1 text-center font-poppins text-xs font-medium md:text-sm lg:m-2 lg:text-lg xl:m-2 xl:text-lg">
            Schedules
          </h3>
          <div className="h-18 my-2 flex w-full items-center justify-center gap-2 overflow-y-hidden overflow-x-scroll p-1 lg:h-24 lg:justify-center xl:h-24 xl:justify-center">
            {getDatesArray().map((date, index) => (
              <button
                key={index}
                onClick={() => setSelectedDate(date)}
                className={
                  "h-10 w-10 cursor-pointer rounded-lg border-2 border-slate-600 transition duration-300 ease-in-out lg:h-16 lg:w-16 lg:rounded-xl xl:h-16 xl:w-16 " +
                  (selectedDate === date && "bg-slate-600 text-white")
                }
              >
                <Paragraph size="xs" style="medium" text={date} />
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="my-2 flex flex-col items-center">
        <div className="w-10/12 md:w-8/12 ">
          <div className="text-center">
            <h4 className=" text-center font-poppins text-xs font-medium md:text-base lg:m-2 lg:text-lg xl:m-2 xl:text-lg">
              Available Cinemas
            </h4>
          </div>

          <DataContainer
            className="flex flex-col items-center justify-start"
            loading={fetchedMovieShowtimes.isLoading}
            object="showtimes"
          >
            {fetchedMovieShowtimes.data.cinemas.map((cinema, index) => (
              <div className="w-10/12" key={index}>
                <div
                  onClick={() => toggleCinemaShowtimes(index)}
                  key={parseInt(cinema)}
                  className="my-2 flex w-full cursor-pointer items-center justify-between rounded-xl bg-slate-300 p-2"
                >
                  <h5 className="font-poppins text-xs font-medium md:text-sm lg:text-base xl:text-base">
                    Cinema {parseInt(cinema)}
                  </h5>
                  <div
                    className={
                      (showCinemaShowtimes[index] ? "rotate-90" : "") +
                      " transition duration-200 ease-in-out"
                    }
                  >
                    <ChevronRight size="4" />
                  </div>
                </div>
                <AnimatePresence>
                  {showCinemaShowtimes[index] && (
                    <div className="my-2 flex items-center gap-4 rounded-xl bg-slate-200 p-2">
                      {fetchedMovieShowtimes.data.showtimes[index].map(
                        (studioShowtime) => (
                          <button
                            key={index}
                            onClick={() =>
                              selectShowtime(studioShowtime, 1, cinema)
                            }
                            className="my-2 rounded-lg bg-blue-200 p-2 px-3 text-center font-poppins text-xs transition duration-200 ease-in-out hover:bg-blue-300 md:text-sm"
                          >
                            {parseInt(studioShowtime)}
                          </button>
                        )
                      )}
                    </div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </DataContainer>
        </div>
      </div>

      <AnimatePresence>
        {showSeatsModal && (
          <SeatsModal
            toggleShowSeatsModal={toggleShowSeatsModal}
            toggleTicketConfirmationModal={toggleTicketConfirmationModal}
            region={regionId}
            cinema={selectedCinema}
            studio={selectedStudio}
            showtime={selectedShowtime}
            movie={movieId}
          />
        )}

        {showTicketConfirmationModal && (
          <TicketConfirmationModal
            toggleShowConfirmationModal={toggleTicketConfirmationModal}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Movie;
