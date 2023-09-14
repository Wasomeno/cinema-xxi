import { useSkeleton } from "hooks/useSkeleton"
import { IoCheckmarkCircle } from "react-icons/io5"

import { query } from "@/components/reactQuery/queries/query"
import { cinemaQueryKeys } from "@/components/reactQuery/queries/queryKeys/cinemaQueryKeys"

export const CinemaShowtimeSelectableList = ({
  cinemaId,
  selectShowtime,
  selectedShowtime,
}) => {
  const cinemaShowtimes = query({
    queryKey: cinemaQueryKeys.cinemaShowtimes(cinemaId),
    url: "/api/cinemas/" + cinemaId + "/showtimes",
    enabledCondition: cinemaId !== undefined,
  })

  const skeletons = useSkeleton(
    <div className="flex justify-center border-b p-2">
      <div className="w-3/6 animate-pulse rounded-lg bg-slate-300 lg:h-[18px]" />
    </div>,
    5
  )

  return (
    <div className="flex snap-center flex-col gap-1.5 lg:flex-1">
      <h5 className="text-sm">Select Showtime</h5>
      <div className="flex h-full w-80 flex-col rounded-lg border bg-slate-50 dark:border-slate-600 dark:bg-slate-800 lg:w-full">
        {cinemaShowtimes.isLoading && skeletons.map((skeleton) => skeleton)}
        {!cinemaShowtimes.isLoading &&
          cinemaShowtimes.data?.map((showtime) => (
            <button
              onClick={() => selectShowtime(showtime.id)}
              key={showtime.id}
              className="relative border-b p-2 text-sm dark:border-b-slate-700"
            >
              {selectedShowtime === showtime.id && (
                <span className="absolute left-5 top-1/2 -translate-y-1/2">
                  <IoCheckmarkCircle size="16" className="text-green-600" />
                </span>
              )}
              {showtime.hour}:{showtime.minutes}
            </button>
          ))}
      </div>
    </div>
  )
}
