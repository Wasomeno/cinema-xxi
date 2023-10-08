import { useEffect } from "react"
import clsx from "clsx"
import { useDates } from "hooks/useDates"
import { twMerge } from "tailwind-merge"

import { useSelectedDate } from "./TicketContextProvider"

export function Dates() {
  const { selectDate, selectedDate } = useSelectedDate()
  const datesDetails = useDates(5)

  useEffect(() => {
    selectDate(datesDetails[0])
  }, [])

  return (
    <div className="w-full space-y-2 md:w-8/12">
      <h3 className="font-poppins text-xs font-medium md:text-sm lg:text-lg">
        Dates
      </h3>
      <div className="h-18 flex w-full items-center gap-2 overflow-y-hidden overflow-x-scroll lg:h-24">
        {datesDetails.map((details) => (
          <div
            key={details.date}
            onClick={() => selectDate(details)}
            className="flex flex-col items-center justify-center gap-1.5"
          >
            <button
              className={twMerge(
                clsx(
                  "h-10 w-10 cursor-pointer rounded-lg border bg-slate-200 transition duration-300 ease-in-out dark:border-slate-700 dark:bg-slate-800 lg:h-14 lg:w-14 lg:rounded-lg",
                  selectedDate?.date === details.date &&
                    "border-blue-200 bg-blue-300 text-slate-800 opacity-100 dark:border-blue-700 dark:bg-blue-800 dark:text-black"
                )
              )}
            >
              <span className="font-poppins text-xs font-medium dark:text-slate-100">
                {details.date}
              </span>
            </button>
            <span
              className={twMerge(
                "font-poppins text-xs opacity-50",
                selectedDate?.date === details.date && "opacity-100"
              )}
            >
              {details.day}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
