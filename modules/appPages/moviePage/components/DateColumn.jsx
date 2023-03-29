import clsx from "clsx";
import { twMerge } from "tailwind-merge";

import { Paragraph } from "@/components/shared/Texts";

import {
  useMoviePageActionContext,
  useMoviePageValueContext,
} from "./context/appMoviePageContext";

export const DateColumn = () => {
  const { datesDetails, selectedDate } = useMoviePageValueContext();
  const { setSelectedDate } = useMoviePageActionContext();
  const dayIndexToString = {
    0: "Sunday",
    1: "Monday",
    2: "Tuesday",
    3: "Wednesday",
    4: "Thursday",
    5: "Friday",
    6: "Saturday",
  };
  return (
    <div className="my-4 flex flex-col items-center">
      <div className="w-5/6">
        <h3 className="m-1 text-center font-poppins text-xs font-medium md:text-sm lg:m-2 xl:m-2">
          Schedules
        </h3>
        <div className="h-18 my-2 flex w-full items-center justify-center gap-2 overflow-y-hidden overflow-x-scroll p-1 lg:justify-center xl:h-24 xl:justify-center">
          {datesDetails.map((details, index) => (
            <div
              key={details.date}
              className="flex flex-col items-center justify-center gap-3"
            >
              <p className="font-poppins text-xs">
                {dayIndexToString[details.day].slice(0, 3)}
              </p>
              <button
                key={index}
                onClick={() => setSelectedDate(details.date)}
                className={twMerge(
                  clsx(
                    "h-10 w-10 cursor-pointer rounded-lg border-2 border-slate-700 transition duration-300 ease-in-out dark:border-slate-400 dark:bg-slate-600 lg:h-14 lg:w-14 lg:rounded-lg",
                    selectedDate === details.date &&
                      "bg-slate-600 text-white dark:bg-slate-200 dark:text-slate-800"
                  )
                )}
              >
                <Paragraph size="xs" style="medium">
                  {details.date}
                </Paragraph>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
