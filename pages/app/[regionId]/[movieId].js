import React, { useState } from "react";
import { motion } from "framer-motion";
import SeatsModal from "../../../components/SeatsModal";
import { useRouter } from "next/router";
import { useMovieDetails } from "@/components/reactQuery/queries/Movie/useMovieDetails";
import { Paragraph, Title } from "@/components/shared/Texts";
import { useRegionMovieShowtimes } from "@/components/reactQuery/queries/Cinema/useCinemaMovieShowtimes";
import DataContainer from "@/components/DataContainer";

const Movie = () => {
  const { regionId, movieId } = useRouter().query;
  const fetchedMovieDetails = useMovieDetails({ movieId: movieId });
  const fetchedMovieShowtimes = useRegionMovieShowtimes({
    region: regionId,
    movie: movieId,
  });

  const [cinemaShow, setCinemaShow] = useState([false, false, false, false]);
  const [selectedShowtime, setSelectedShowtime] = useState(0);
  const [selectedCinema, setSelectedCinema] = useState(0);
  const [selectedStudio, setSelectedStudio] = useState(0);
  const [selectedDate, setSelectedDate] = useState(getDatesArray()[0]);
  const [showSeats, setShowSeats] = useState(false);

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
    setShowSeats(true);
    setSelectedShowtime(showtime),
      setSelectedStudio(studio),
      setSelectedCinema(cinema);
  };

  const toggleShowCinema = (showIndex) => {
    setCinemaShow((currentCinemas) =>
      currentCinemas.map((show, index) => {
        if (showIndex === index) return !show;
        return show;
      })
    );
  };

  return (
    <div className="w-full rounded-xl flex flex-col items-center overflow-y-scroll">
      <div className="flex justify-center m-2 p-2">
        <Title text={fetchedMovieDetails.data?.title} />
      </div>
      <div className="flex h-56 lg:h-60 xl:h-60 justify-center gap-4 items-center lg:w-4/6 xl:w-4/6">
        <div className="h-5/6 w-4/12 lg:h-full xl:h-full">
          <div className="h-full md:h-4/6 lg:h-5/6 xl:h-full w-full bg-slate-400 rounded-xl"></div>
        </div>
        <div className="h-5/6 w-6/12">
          <div className="m-2 mb-4">
            <div className="flex justify-start m-2">
              <h2 className="font-poppins text-sm font-medium md:text-xl lg:text-xl">
                Details
              </h2>
            </div>
            <div className="flex justify-start m-2">
              <Paragraph
                size="xs"
                text="Lorem ipsum dolor sit amet, 
                consectetur adipiscing elit, sed 
                do eiusmod tempor incididunt ut 
                labore et dolore magna aliqua."
              />
            </div>
          </div>
        </div>
      </div>
      <div className="m-2 w-4/6">
        <h3 className="font-poppins text-xs lg:text-lg xl:text-lg font-medium text-center m-1 lg:m-2 xl:m-2">
          Schedules
        </h3>
        <div className="flex w-full gap-2 justify-start my-2 p-1 lg:justify-center xl:justify-center items-center h-18 lg:h-24 xl:h-24 overflow-x-scroll overflow-y-hidden">
          {getDatesArray().map((date, index) => (
            <button
              key={index}
              onClick={() => setSelectedDate(date)}
              className={
                "w-10 h-10 lg:w-16 xl:w-16 lg:h-16 xl:h-16 transition duration-300 ease-in-out border-2 border-slate-600 rounded-lg lg:rounded-xl cursor-pointer " +
                (selectedDate === date && "bg-slate-600 text-white")
              }
            >
              <Paragraph size="xs" style="medium" text={date} />
            </button>
          ))}
        </div>
      </div>
      <div className="my-2 w-10/12">
        <h4 className="font-poppins text-xs lg:text-lg xl:text-lg font-medium text-center">
          Available Cinemas
        </h4>
        <DataContainer
          className="flex flex-col items-center justify-start"
          loading={fetchedMovieShowtimes.isLoading}
          object="cinemas"
        >
          {fetchedMovieShowtimes.data?.cinemaInRegion.map((cinema, index) => (
            <div className="w-10/12" onClick={() => toggleShowCinema(index)}>
              <div
                key={parseInt(cinema)}
                className="w-full bg-slate-300 p-2 m-2 rounded-xl"
              >
                <h5 className="font-poppins font-medium text-sm lg:text-base xl:text-base">
                  {parseInt(cinema)}
                </h5>
              </div>
              <motion.div className="w-full p-2 m-2 bg-slate-200 rounded-xl">
                <Paragraph text="Showtimes" size="xs" />
                {fetchedMovieShowtimes.data?.cinemaShowtimes[index].map(
                  (studioShowtime) =>
                    studioShowtime.showtimes.map((showtime) => (
                      <button
                        key={index}
                        onClick={() =>
                          selectShowtime(
                            showtime,
                            studioShowtime.studio,
                            cinema
                          )
                        }
                        className="text-center text-xs p-2 m-2 bg-green-100 rounded-lg font-poppins transition duration-300 ease-in-out hover:bg-slate-300 hover:scale-105"
                      >
                        {parseInt(showtime)}
                      </button>
                    ))
                )}
              </motion.div>
            </div>
          ))}
        </DataContainer>
        <div className="h-20" />
      </div>
      <SeatsModal
        show={showSeats}
        setShow={setShowSeats}
        region={regionId}
        cinema={selectedCinema}
        studio={selectedStudio}
        showtime={selectedShowtime}
        movie={movieId}
      />
    </div>
  );
};

export default Movie;
