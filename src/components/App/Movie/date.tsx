"use client"

import { useSelectedDate } from "@/stores/ticketStore"
import clsx from "clsx"
import { twMerge } from "tailwind-merge"

import { useDates } from "@/hooks/useDates"

export function Dates() {
  const dates = useDates(5)
  const { selectDate, selectedDate } = useSelectedDate(dates[0])
  return (
    <div className="w-full space-y-2 md:w-8/12">
      <h3 className="font-poppins text-xs font-medium md:text-sm lg:text-lg">
        Dates
      </h3>
      <div className="h-18 flex w-full items-center gap-2 overflow-y-hidden overflow-x-scroll lg:h-24">
        {dates.map((date) => (
          <div
            key={date.value}
            onClick={() => selectDate(date)}
            className="flex flex-col items-center justify-center gap-1.5"
          >
            <button
              className={twMerge(
                clsx(
                  "h-10 w-10 cursor-pointer rounded-lg border bg-slate-200 transition duration-300 ease-in-out dark:border-slate-700 dark:bg-slate-800 lg:h-14 lg:w-14 lg:rounded-lg",
                  selectedDate?.value === date.value &&
                    "border-blue-200 bg-blue-300 text-slate-800 opacity-100 dark:border-blue-700 dark:bg-blue-800 dark:text-black"
                )
              )}
            >
              <span className="font-poppins text-xs font-medium dark:text-slate-100">
                {date.value}
              </span>
            </button>
            <span
              className={twMerge(
                "font-poppins text-xs opacity-50",
                selectedDate?.value === date.value && "opacity-100"
              )}
            >
              {date.day}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
