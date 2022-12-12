import { useMutation } from "@tanstack/react-query";
import { ethers } from "ethers";
import React, { useContext, useState } from "react";
import { MoonLoader } from "react-spinners";
import AvailableMovies from "../../../components/Admin/Movie/AvailableMovies";
import MoviesInCinema from "../../../components/Admin/Movie/MoviesInCinema";
import SelectedMovies from "../../../components/Admin/Movie/SelectedMovies";
import AnimatedContainer from "../../../components/AnimatedContainer";
import { appContext } from "../../../context/AppContext";
import { moviesContract } from "../../../hooks/useContract";
import { useSetLoading, useToast } from "../../../store/stores";

const addMovies = () => {
  const adminDetails = useContext(appContext).adminDetails;
  const [selectedMovies, setSelectedMovies] = useState([]);
  const [setLoading, setLoadingText] = useSetLoading();
  const [toastSuccess, toastError] = useToast();

  const addMoviesMutation = useMutation(() => addMoviesToCinema(), {
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
  });

  const addMoviesToCinema = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contract = moviesContract();
    const moviesToAdd = selectedMovies.map((movie) => parseInt(movie + 1));
    const addMovies = await contract.addMoviesToCinema(
      adminDetails.region,
      adminDetails.cinema,
      moviesToAdd
    );
    const waitTransaction = await provider.waitForTransaction(addMovies.hash);
    return waitTransaction;
  };

  return (
    <AnimatedContainer className="w-screen h-5/6 p-2">
      <div className="text-center m-2">
        <h1 className="font-poppins text-2xl font-semibold align-middle">
          Add Movies
        </h1>
      </div>
      <div className="flex justify-center items-center h-full w-full flex-wrap gap-2">
        <AvailableMovies
          selectedMovies={selectedMovies}
          setSelectedMovies={setSelectedMovies}
        />
        <SelectedMovies
          selectedMovies={selectedMovies}
          setSelectedMovies={setSelectedMovies}
        />
        <MoviesInCinema adminDetails={adminDetails} />
        <div className="h-10 w-full flex justify-center">
          <button
            className="w-5/6 bg-slate-900 text-white text-sm font-poppins font-medium p-2 text-center rounded-xl"
            onClick={() => addMoviesMutation.mutate()}
          >
            Add Movies
          </button>
        </div>
      </div>
    </AnimatedContainer>
  );
};

export default addMovies;
