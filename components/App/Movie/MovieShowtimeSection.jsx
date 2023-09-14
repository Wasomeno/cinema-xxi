import { useState } from "react"
import { AnimatePresence } from "framer-motion"
import { useDateTime } from "hooks/useDateTime"
import { HiChevronRight } from "react-icons/hi2"

export default function MovieShowtimeSection({ children }) {
  return (
    <div className="w-11/12 space-y-2 md:w-8/12">
      <h4 className="font-poppins text-xs font-medium md:text-sm lg:text-lg">
        Available Cinemas
      </h4>
      <div className="flex w-full flex-col items-center justify-start gap-2">
        {children}
      </div>
    </div>
  )
}

function CinemaCard({ cinema, children }) {
  const [tabOpen, setTabOpen] = useState(false)
  return (
    <>
      <div
        onClick={() => setTabOpen((current) => !current)}
        className="flex w-full items-center justify-between rounded-lg border bg-slate-100 p-2 px-4 dark:border-slate-800 dark:bg-slate-900"
      >
        <h5 className="font-poppins text-xs font-medium md:text-sm">
          {cinema.name}
        </h5>
        <div className={"transition duration-200 ease-in-out"}>
          <HiChevronRight size="16" />
        </div>
      </div>
      <AnimatePresence>
        {tabOpen && (
          <div className="flex w-full items-center gap-2.5 rounded-lg border bg-slate-100 p-2 dark:border-slate-800 dark:bg-slate-900">
            {children}
          </div>
        )}
      </AnimatePresence>
    </>
  )
}

function ShowtimeCard({ showtime, selectedDate, onClick }) {
  const dateTime = useDateTime({})

  function parseShowtime(hour, minute) {
    const timeNow = new Date()
    timeNow.setDate(selectedDate.date)
    timeNow.setMonth(selectedDate.month)
    timeNow.setHours(hour)
    timeNow.setMinutes(minute)
    return timeNow.getTime()
  }
  return (
    <button
      disabled={
        parseShowtime(showtime.hour, showtime.minutes) < dateTime.getTime()
      }
      onClick={onClick}
      className="rounded-md bg-slate-200 p-2 px-3 text-center font-poppins text-xs shadow-sm transition duration-200 ease-in-out hover:bg-slate-300 disabled:opacity-50 dark:bg-slate-800 dark:hover:bg-slate-700 md:text-sm"
    >
      {showtime.hour} :{showtime.minutes}
    </button>
  )
}

MovieShowtimeSection.CinemaCard = CinemaCard
MovieShowtimeSection.ShowtimeCard = ShowtimeCard
