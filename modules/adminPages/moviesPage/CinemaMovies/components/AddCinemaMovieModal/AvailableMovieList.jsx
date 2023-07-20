import { useSkeleton } from "hooks/useSkeleton";
import { useSession } from "next-auth/react";
import { HiCheckCircle } from "react-icons/hi2";

import { useAllMovies } from "@/components/reactQuery/queries/Movie/useAllMovies";
import { query } from "@/components/reactQuery/queries/query";
import { cinemaQueryKeys } from "@/components/reactQuery/queries/queryKeys/cinemaQueryKeys";

export const AvailableMovieList = ({
  selectedMovies,
  selectMovie,
  deselectMovie,
}) => {
  const allMovies = useAllMovies();

  const { data: session } = useSession();
  const cinemaMovies = query({
    queryKey: cinemaQueryKeys.cinemaMovies(session.user?.cinemaId),
    url: `/api/cinemas/${session.user.cinemaId}/movies`,
  });

  console.log(allMovies.data, cinemaMovies.data);

  const skeletons = useSkeleton(
    <div className="h-10 w-full animate-pulse rounded-lg bg-slate-300 lg:h-12" />,
    5
  );
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
                if (selectedMovies.includes(movie.id)) {
                  deselectMovie(movie.id);
                } else {
                  selectMovie(movie.id);
                }
              }}
              className="relative disabled:opacity-50 disabled:cursor-default flex w-full cursor-pointer items-center justify-center rounded-lg border bg-slate-50 p-3 shadow-sm"
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
  );
};
