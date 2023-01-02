import { cinemaContract } from "hooks/useContract";
import useMetamask from "hooks/useMetamask";
import { createSideEffects } from "../createSideEffects";
import mutation from "../mutation";

export const addCinemaMovies = ({ region, cinema, movies }) => {
  const contract = cinemaContract({ read: false });
  const movieIds = movies.map((movie) => movie.movieId);
  const { mutate } = mutation(async () => {
    const provider = useMetamask();
    const transaction = await contract.addMoviesToCinema(
      region,
      cinema,
      movieIds
    );
    return await provider.waitForTransaction(transaction.hash);
  }, createSideEffects({ context: "add", object: "movie" }));

  return mutate;
};
