import { useState } from "react"
import clsx from "clsx"
import { motion } from "framer-motion"
import { useDateTime } from "hooks/useDateTime"
import moment from "moment"
import { HiChevronRight } from "react-icons/hi2"

import { useSelectedDate, useSelectedShowtime } from "./TicketContextProvider"

export function AvailableCinema({ children }) {
  return (
    <div className="w-full space-y-2 md:w-8/12">
      <h4 className="font-poppins text-xs font-medium md:text-sm lg:text-lg">
        Available Cinemas
      </h4>
      <div className="flex w-full flex-col items-center justify-start gap-2">
        {children}
      </div>
    </div>
  )
}

export function Cinema({ cinema, children }) {
  const [isTabOpen, setIsTabOpen] = useState(false)
  return (
    <>
      <div
        onClick={() => setIsTabOpen(!isTabOpen)}
        className="flex w-full items-center justify-between rounded-lg border bg-slate-100 p-2 px-4 dark:border-slate-800 dark:bg-slate-900"
      >
        <h5 className="font-poppins text-xs font-medium md:text-sm">
          {cinema.name}
        </h5>
        <div
          className={clsx("transition duration-300", isTabOpen && "rotate-90")}
        >
          <HiChevronRight size="16" />
        </div>
      </div>
      <motion.div
        animate={{
          height: isTabOpen ? "4rem" : "0rem",
          opacity: isTabOpen ? "100%" : "0%",
        }}
        transition={{
          duration: 0.25,
          bounce: false,
        }}
        className="flex w-full items-center gap-2.5 rounded-lg border bg-slate-100 p-2 dark:border-slate-800 dark:bg-slate-900"
      >
        {children}
      </motion.div>
    </>
  )
}

function Showtime({ showtime, onClick }) {
  const { selectShowtime } = useSelectedShowtime()
  const { selectedDate } = useSelectedDate()
  const dateTime = useDateTime({})

  function getParsedTime() {
    const timeNow = moment().set({
      date: selectedDate.date,
      month: selectedDate.month,
      hour: showtime.hour,
      minute: showtime.minute,
    })
    return timeNow.unix() * 1000
  }

  return (
    <motion.button
      disabled={getParsedTime() < dateTime.getTime()}
      initial={{ display: "hidden" }}
      animate={{ display: "inline-block" }}
      transition={{ bounce: false, delay: 0.05 }}
      exit={{ display: "hidden" }}
      onClick={() => onClick(selectShowtime)}
      className="rounded-md bg-slate-200 p-2 px-3 text-center font-poppins text-xs shadow-sm transition duration-200 ease-in-out hover:bg-slate-300 disabled:opacity-50 dark:bg-slate-800 dark:hover:bg-slate-700 md:text-sm"
    >
      {showtime.hour} :{showtime.minutes}
    </motion.button>
  )
}

Cinema.Showtime = Showtime
