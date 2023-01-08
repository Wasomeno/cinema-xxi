import { cinemaContract } from "hooks/useContract";
import useMetamask from "hooks/useMetamask";
import { createSideEffects } from "../createSideEffects";
import mutation from "../mutation";

export const addStudioMovies = ({
  region,
  cinema,
  studio,
  movies,
  showtimes,
}) => {
  const contract = cinemaContract({ read: false });
  const movieIds = movies.map((movie) => movie.movieId);
  const { mutate } = mutation(async () => {
    const provider = useMetamask();
    const transaction = await contract.addMoviesToStudio(
      movieIds,
      region,
      cinema,
      studio,
      showtimes
    );
    return await provider.waitForTransaction(transaction.hash);
  }, createSideEffects({ context: "add", object: "movies" }));

  return mutate;
};
