import React from "react";
import { cinemaContract, moviesContract } from "../../../../hooks/useContract";
import { query } from "../../query";

export const useCinemaMovies = ({ region, cinema }) => {
  const contractCinema = cinemaContract({ read: true });
  const contractMovies = moviesContract({ read: true });

  const result = query({
    queryKey: ["cinemaMovies", region, cinema],
    queryFunction: async () => {
      const movieIds = await contractCinema.getCinemaMovies(region, cinema);
      const moviesDetails = Promise.all(
        movieIds.map(async (movieId) => {
          const details = await contractMovies.getMovieDetails(movieId);
          return { movieId: movieId, movieTitle: details.title };
        })
      );
      return moviesDetails;
    },
  });
  return result;
};
