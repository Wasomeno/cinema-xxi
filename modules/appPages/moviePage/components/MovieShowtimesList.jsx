import { AnimatePresence } from "framer-motion";
import moment from "moment";
import { useState } from "react";

import DataContainer from "@/components/DataContainer";
import ChevronRight from "@/components/Icons/ChevronRight";
import { useRegionMovieShowtimes } from "@/components/reactQuery/queries/Cinema/useRegionMovieShowtimes";

import {
  useMoviePageActionContext,
  useMoviePageValueContext,
} from "./context/appMoviePageContext";

export const MovieShowtimesList = ({ movieShowtimes }) => {
  const { setSelectedShowtime, setModalState } = useMoviePageActionContext();
  const { selectedDate } = useMoviePageValueContext();
  const [activeShowtimeTab, setActiveShowtimeTab] = useState(null);

  function parseShowtime(time) {
    const parsedShowtime = moment({ date: selectedDate })
      .startOf("day")
      .add({ seconds: time });
    return {
      hour: parsedShowtime.hour(),
      minutes: parsedShowtime.minutes(),
      showtime: parsedShowtime,
    };
  }

  function toggleActiveShowtimetab(index) {
    setActiveShowtimeTab((currentActive) =>
      currentActive !== null ? null : index
    );
  }

  const selectShowtime = (showtime) => {
    setSelectedShowtime(showtime);
    setModalState("seats");
  };

  return (
    <div className="my-2 flex flex-col items-center">
      <div className="w-full md:w-8/12 ">
        <div className="text-center">
          <h4 className=" text-center font-poppins text-xs font-medium md:text-sm lg:m-2 xl:m-2">
            Available Cinemas
          </h4>
        </div>

        <div className="flex flex-col items-center justify-start">
          {movieShowtimes.map((cinema, index) => (
            <div className="w-10/12" key={cinema.id}>
              {cinema.showtimes.length > 0 && (
                <div
                  onClick={() => toggleActiveShowtimetab(index)}
                  key={parseInt(cinema)}
                  className="my-2 flex w-full cursor-pointer items-center justify-between rounded-xl bg-slate-300 p-2 px-4 dark:bg-slate-600"
                >
                  <h5 className="font-poppins text-xs font-medium md:text-sm">
                    {cinema.name}
                  </h5>
                  <div className={"transition duration-200 ease-in-out"}>
                    <ChevronRight size="4" />
                  </div>
                </div>
              )}

              <AnimatePresence>
                {activeShowtimeTab === index && (
                  <div className="my-2 flex items-center gap-4 rounded-xl bg-slate-200 p-2 dark:bg-slate-500">
                    {cinema.showtimes.map((showtime) => (
                      <button
                        key={index}
                        disabled={
                          parseShowtime(showtime.time).showtime.unix() <
                          moment().unix()
                        }
                        onClick={() => selectShowtime(showtime)}
                        className="my-2 rounded-lg bg-slate-50 p-2 px-3 text-center font-poppins text-xs transition duration-200 ease-in-out hover:bg-blue-300 disabled:bg-gray-300 disabled:text-gray-500 dark:bg-slate-600 md:text-sm"
                      >
                        {parseShowtime(showtime.time).hour} :
                        {parseShowtime(showtime.time).minutes}
                      </button>
                    ))}
                  </div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
