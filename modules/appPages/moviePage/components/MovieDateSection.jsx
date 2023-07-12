import clsx from "clsx";
import { useDates } from "hooks/useDates";
import { useEffect } from "react";
import { twMerge } from "tailwind-merge";

export default function MovieDateSection({ selectedDate, setSelectedDate }) {
  const datesDetails = useDates(5);

  useEffect(() => {
    setSelectedDate(datesDetails[0]);
  }, []);

  return (
    <div className="w-11/12 space-y-2 md:w-8/12">
      <h3 className="font-poppins text-xs font-medium md:text-sm lg:text-lg">
        Dates
      </h3>
      <div className="h-18 flex w-full items-center gap-2 overflow-y-hidden overflow-x-scroll lg:h-24">
        {datesDetails.map((details) => (
          <div
            key={details.date}
            onClick={() => setSelectedDate(details)}
            className="flex flex-col items-center justify-center gap-1.5"
          >
            <button
              className={twMerge(
                clsx(
                  "h-10 w-10 cursor-pointer rounded-lg border border-slate-500 transition duration-300 ease-in-out dark:border-slate-400 dark:bg-slate-600 lg:h-14 lg:w-14 lg:rounded-lg",
                  selectedDate?.date === details.date &&
                    "bg-blue-200 text-slate-800 dark:bg-slate-200 dark:text-slate-800"
                )
              )}
            >
              <span className="font-poppins text-xs font-medium tracking-wider">
                {details.date}
              </span>
            </button>
            <span className="font-poppins text-xs">{details.day}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
