import { ethers } from "ethers";
import React from "react";
import { moviesContract } from "../../../../hooks/useContract";
import { useLoading, useToast } from "../../../../store/stores";
import mutation from "../mutation";

const addMovieSides = () => {
  const [setLoading, setLoadingText] = useLoading();
  const [toastSuccess, toastError] = useToast();
  return {
    onMutate: () => {
      setLoadingText("Adding " + selectedMovies.length + " Movies");
      setLoading(true);
    },
    onSuccess: () => {
      setLoading(false);
      toastSuccess("Successfully added " + selectedMovies.length + " movies");
    },
    onError: (error) => {
      setLoading(false);
      toastError(error.reason);
    },
  };
};

const addMovie = ({ movieId, title, duration }) => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const contract = moviesContract({ read: false });
  const addMovies = mutation(async () => {
    const transaction = await contract.addMovies(
      [movieId],
      [title],
      [duration]
    );
    return await provider.waitForTransaction(transaction.hash);
  }, addMovieSides());

  return addMovies;
};

export default addMovie;
