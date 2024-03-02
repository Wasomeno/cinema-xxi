import { Movie } from "@prisma/client"
import { useQuery } from "@tanstack/react-query"
import { useSession } from "next-auth/react"
import { HiCheckCircle } from "react-icons/hi2"

import { useSkeleton } from "@/hooks/useSkeleton"
import { useAllMovies } from "@/components/reactQuery/queries/Movie/useAllMovies"
import { cinemaQueryKeys } from "@/components/reactQuery/queries/queryKeys/cinemaQueryKeys"

type AvailableMovieListProps = {
  selectedMovies: string[]
  selectMovie: (id: string) => void
  deselectMovie: (id: string) => void
}

export const AvailableMovieList = ({
  selectedMovies,
  selectMovie,
  deselectMovie,
}: AvailableMovieListProps) => {
  const allMovies = useAllMovies()

  const { data: session } = useSession()
  const cinemaMovies = useQuery<Movie[]>({
    queryKey: cinemaQueryKeys.cinemaMovies(session?.user?.cinema?.id),
    queryFn: () =>
      fetch(`/api/cinemas/${session?.user.cinema?.id}/movies`).then(
        (response) => response.json()
      ),
  })

  const skeletons = useSkeleton(
    <div className="h-10 w-full animate-pulse rounded-lg bg-slate-300 dark:bg-slate-600 lg:h-12" />,
    5
  )

  return (
    <div className="flex h-5/6 flex-col gap-2">
      {allMovies.isLoading
        ? skeletons.map((skeleton) => skeleton)
        : allMovies.data?.map((movie) => (
            <button
              type="button"
              key={movie.id}
              disabled={cinemaMovies.data?.some(
                (cinemaMovie) => cinemaMovie.id === movie.id
              )}
              onClick={() => {
                selectedMovies.includes(movie.id)
                  ? deselectMovie(movie.id)
                  : selectMovie(movie.id)
              }}
              className="relative flex w-full cursor-pointer items-center justify-center rounded-lg border bg-slate-50 p-3 shadow-sm disabled:cursor-default disabled:opacity-50 dark:border-slate-700 dark:bg-slate-800"
            >
              {selectedMovies.includes(movie.id) && (
                <span className="absolute left-10">
                  <HiCheckCircle className="text-green-600" size="25" />
                </span>
              )}
              <span className="text-center text-xs tracking-wide lg:text-sm">
                {movie.title}
              </span>
            </button>
          ))}
    </div>
  )
}
