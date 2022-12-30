import { moviesContract } from "../../../../hooks/useContract";
import useMetamask from "../../../../hooks/useMetamask";
import { useLoading, useToast } from "../../../../store/stores";
import mutation from "../mutation";

export const deleteMovieSides = () => {
  const [setLoading, setLoadingText] = useLoading();
  const [toastSuccess, toastError] = useToast();
  return {
    onMutate: () => {
      setLoadingText("Deleting");
      setLoading(true);
    },
    onError: (error) => {
      setLoading(false);
      toastError(error.reason);
    },
    onSuccess: () => {
      setLoading(false);
      toastSuccess("Movie Successfully Deleted");
    },
  };
};

export const deleteMovie = ({ movieId }) => {
  const contract = moviesContract({ read: false });
  const { mutate } = mutation(async () => {
    const provider = useMetamask();
    const transaction = await contract.deleteMovies([movieId]);
    return await provider.waitForTransaction(transaction.hash);
  }, deleteMovieSides());

  return mutate;
};
