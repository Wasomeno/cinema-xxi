import { useSkeleton } from "hooks/useSkeleton"
import { IoCheckmarkCircle } from "react-icons/io5"

import { query } from "@/components/reactQuery/queries/query"
import { cinemaQueryKeys } from "@/components/reactQuery/queries/queryKeys/cinemaQueryKeys"

export const CinemaMovieSelectableList = ({
  cinemaId,
  selectMovie,
  selectedMovie,
}) => {
  const cinemaMovies = query({
    queryKey: cinemaQueryKeys.cinemaMovies(cinemaId),
    url: "/api/cinemas/" + cinemaId + "/movies",
    enabledCondition: cinemaId !== undefined,
  })

  const skeletons = useSkeleton(
    <div className="flex justify-center border-b p-2">
      <div className="w-3/6 animate-pulse rounded-lg bg-slate-300 lg:h-[18px]" />
    </div>,
    5
  )

  return (
    <div className="flex flex-1 snap-center flex-col gap-1.5">
      <h5 className="text-sm">Select movie</h5>
      <div className="flex h-full w-80 flex-col rounded-lg border bg-slate-50 dark:border-slate-600 dark:bg-slate-800 lg:w-full">
        {cinemaMovies.isLoading && skeletons.map((skeleton) => skeleton)}
        {!cinemaMovies.isLoading &&
          cinemaMovies.data?.map((movie) => (
            <button
              onClick={() => selectMovie(movie.id)}
              key={movie.id}
              className="relative border-b p-2 text-sm dark:border-slate-700"
            >
              {selectedMovie === movie.id && (
                <span className="absolute left-5 top-1/2 -translate-y-1/2">
                  <IoCheckmarkCircle size="16" className="text-green-600" />
                </span>
              )}
              {movie.title}
            </button>
          ))}
      </div>
    </div>
  )
}
