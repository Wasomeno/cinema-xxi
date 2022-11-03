import React, { useEffect, useState } from "react";
import SeatsModal from "../../../components/SeatsModal";
import { motion } from "framer-motion";
import { QueryCache, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { fetchMovieDetails } from "../../../fetchers/fetchers";
import { ethers } from "ethers";

const Movie = () => {
  const { movieId } = useRouter().query;
  const fetchedMovieDetails = useQuery(
    ["movieDetails", movieId],
    () => fetchMovieDetails(movieId),
    { staleTime: 50000 }
  );
  const [cinemaShow, setCinemaShow] = useState([false, false, false, false]);
  const [dates, setDates] = useState([22, 23, 24, 25, 26, 27]);
  const [selectedDate, setSelectedDate] = useState(dates[0]);
  const [showSeats, setShowSeats] = useState(false);

  const toggleShowCinema = (showIndex) => {
    setCinemaShow((currentCinemas) =>
      currentCinemas.map((show, index) => {
        if (showIndex === index) return !show;
        return show;
      })
    );
  };

  const queryCache = new QueryCache({
    onError: (error) => {
      console.log(error);
    },
    onSuccess: (data) => {
      console.log(data);
    },
  });

  const query = queryCache.findAll(["regions"]);

  useEffect(() => {
    console.log(query);
  }, [fetchedMovieDetails.status]);

  return (
    <div className="w-full rounded-xl flex flex-col items-center ">
      <div className="flex justify-center m-4">
        <h1 className="font-poppins text-2xl font-semibold p-2 md:text-3xl sm:text-2xl lg:text-4xl">
          {fetchedMovieDetails.status !== "loading"
            ? ethers.utils.parseBytes32String(fetchedMovieDetails.data?.title)
            : "Title"}
        </h1>
      </div>
      <div className="flex h-56 lg:h-60 xl:h-60 justify-around items-center w-full lg:w-4/6 xl:w-4/6">
        <div className="h-5/6 lg:h-full xl:h-full w-2/6">
          <div className="h-full md:h-4/6 lg:h-5/6 xl:h-full w-full bg-slate-400 rounded-xl"></div>
        </div>
        <div className="h-5/6 w-3/6">
          <div className="m-2 mb-4">
            <div className="flex justify-start m-2">
              <h2 className="font-poppins font-medium text-lg md:text-xl lg:text-xl">
                Details
              </h2>
            </div>
            <div className="flex justify-start m-2">
              <p className="font-sans text-sm lg:text-base xl:text-base">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="m-2 w-3/6">
        <h3 className="font-poppins text-sm lg:text-lg xl:text-lg font-medium text-center m-1 lg:m-2 xl:m-2">
          Schedules
        </h3>
        <div className="flex gap-2 justify-start lg:justify-center xl:justify-center items-center h-20 lg:h-24 xl:h-24 max-w-7xl overflow-x-scroll overflow-y-hidden">
          {dates.map((date, index) => (
            <button
              key={index}
              onClick={() => setSelectedDate(date)}
              className={
                date === selectedDate
                  ? "w-12 h-12 lg:w-16 xl:w-16 lg:h-16 xl:h-16 transition duration-300 ease-in-out bg-slate-600 rounded-lg lg:rounded-xl text-white"
                  : "w-12 h-12 lg:w-16 xl:w-16 lg:h-16 xl:h-16 transition duration-300 ease-in-out border-2 border-slate-600 rounded-lg lg:rounded-xl cursor-pointer"
              }
            >
              <h5 className="text-center p-2 font-poppins">{date}</h5>
            </button>
          ))}
        </div>
      </div>
      <div className="my-6 w-10/12">
        <h4 className="font-poppins text-base lg:text-lg xl:text-lg mb-4 font-medium text-center">
          Available Cinemas
        </h4>
        <div className="flex flex-col items-center h-auto justify-start">
          {/* {cinemas.map((cinema, index) => (
            <div className="w-10/12" onClick={() => toggleShowCinema(index)}>
              <div
                key={index}
                className="w-full bg-slate-300 p-2 m-2 rounded-xl"
              >
                <h5 className="font-poppins font-medium text-sm lg:text-base xl:text-base">
                  {cinema}
                </h5>
              </div>
              <motion.div
                hidden={cinemaShow[index] ? false : true}
                className="w-full p-2 m-2 bg-slate-200 rounded-xl"
              >
                <h5 className="font-poppins m-2">Cinema Details</h5>
                {showTimes[index].map((showTime, index) => (
                  <button
                    key={index}
                    onClick={() => setShowSeats((current) => !current)}
                    className="w-20 text-center p-3 m-2 bg-slate-500 rounded-xl font-poppins transition duration-300 ease-in-out hover:bg-slate-300 hover:scale-105"
                  >
                    {showTime}
                  </button>
                ))}
              </motion.div>
            </div>
          ))} */}
        </div>
      </div>
      <SeatsModal show={showSeats} setShow={setShowSeats} />
    </div>
  );
};

export default Movie;
