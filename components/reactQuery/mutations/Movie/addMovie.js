import { ethers } from "ethers";
import React from "react";
import { moviesContract } from "../../../../hooks/useContract";
import useMetamask from "../../../../hooks/useMetamask";
import { useLoading, useToast } from "../../../../store/stores";
import mutation from "../mutation";

const addMovieSides = () => {
  const [setLoading, setLoadingText] = useLoading();
  const [toastSuccess, toastError] = useToast();
  return {
    onMutate: () => {
      setLoadingText("Adding New Movies");
      setLoading(true);
    },
    onSuccess: () => {
      setLoading(false);
      toastSuccess("Successfully added new movies");
    },
    onError: (error) => {
      setLoading(false);
      toastError(error.reason);
    },
  };
};

export const addMovie = ({ movieId, title, duration }) => {
  const contract = moviesContract({ read: false });
  const { mutate } = mutation(async (event) => {
    event.preventDefault();
    const provider = useMetamask();
    const titleBytes32 = ethers.utils.formatBytes32String(title);
    const transaction = await contract.addMovies(
      [movieId],
      [titleBytes32],
      [duration]
    );
    return await provider.waitForTransaction(transaction.hash);
  }, addMovieSides());

  return mutate;
};
