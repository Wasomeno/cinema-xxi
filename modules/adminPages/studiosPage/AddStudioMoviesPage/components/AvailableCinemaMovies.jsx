import { useSession } from "next-auth/react";

import { MovieListClickable } from "@/components/MovieListCard";
import { useCinemaMovies } from "@/components/reactQuery/queries/Cinema/useCinemaMovies";
import { Paragraph } from "@/components/shared/Texts";

export const AvailableCinemaMovies = ({ selectMovie }) => {
  const { data: sessionData } = useSession();
  const moviesInCinema = useCinemaMovies(sessionData.cinemaId);

  return (
    <div className="w-full">
      <div className="mb-2">
        <Paragraph size="xs">Cinema Movies</Paragraph>
      </div>
      <div className="flex h-40 flex-col items-center justify-start gap-4">
        {moviesInCinema.isLoading && (
          <div>
            <p className="font-poppins text-xs">Fetching movies</p>
          </div>
        )}

        {!moviesInCinema.isLoading && moviesInCinema.data?.movie.length < 1 && (
          <Paragraph size="sm">No active movies</Paragraph>
        )}

        {!moviesInCinema.isLoading &&
          moviesInCinema.data?.movie.length > 0 &&
          moviesInCinema.data?.movie.map((movie) => (
            <MovieListClickable
              key={movie.id}
              movie={movie}
              onClick={() => selectMovie(movie)}
            />
          ))}
      </div>
    </div>
  );
};
