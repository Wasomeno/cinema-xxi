import { useMutation, useQuery } from "@tanstack/react-query";
import { ethers } from "ethers";
import React, { useContext, useEffect, useState } from "react";
import { MoonLoader } from "react-spinners";
import { appContext } from "../../../context/AppContext";
import { fetchAllMovies, fetchCinemaMovies } from "../../../fetchers/fetchers";
import { moviesContract } from "../../../hooks/useContract";
import { useSetLoading, useToast } from "../../../store/stores";

const addMovies = () => {
  const adminDetails = useContext(appContext).adminDetails;
  const [selectedMovies, setSelectedMovies] = useState([]);
  const [setLoading, setLoadingText] = useSetLoading();
  const [toastSuccess, toastError] = useToast();
  const fetchedMovies = useQuery(["allMovies"], () => fetchAllMovies());
  const fetchedCinemaMovies = useQuery(
    ["moviesInCinema", adminDetails.region, adminDetails.cinema],
    () => fetchCinemaMovies(adminDetails.region, adminDetails.cinema)
  );
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

  const selectMovie = (index) => {
    setSelectedMovies((currentSelected) => [
      ...currentSelected,
      parseInt(index),
    ]);
  };

  const deselectMovie = (selectedIndex) => {
    setSelectedMovies((currentSelected) =>
      currentSelected.filter((movie, index) => {
        return index !== selectedIndex;
      })
    );
  };

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

  useEffect(() => {}, [
    fetchedCinemaMovies.isLoading,
    addMoviesMutation.isSuccess,
  ]);

  return (
    <div className="w-screen h-5/6 p-4">
      <div className="text-center m-2">
        <h1 className="font-poppins text-2xl font-semibold">Add Movies</h1>
      </div>
      <div className="flex justify-around h-full">
        <div className="w-2/6 h-5/6 bg-slate-100 shadow-slate-300 shadow-lg rounded-lg p-2">
          <h2 className="font-poppins font-medium text-lg text-center m-2">
            Movies Available
          </h2>
          <div className="flex flex-col h-full items-center">
            {fetchedCinemaMovies.isLoading ? (
              <>
                <p className="font-poppins m-2 my-3">Fetching Movies</p>
                <MoonLoader
                  loading={fetchedMovies.isLoading}
                  size={25}
                  color={"black"}
                />
              </>
            ) : (
              <div className="flex flex-col items-center">
                {fetchedMovies.data.map((movie, index) => (
                  <button
                    key={index}
                    onClick={() => selectMovie(index)}
                    className="font-poppins font-normal text-center text-sm m-2 p-2 shadow-md bg-slate-200 rounded-lg w-full transition duration-300 ease-in-out hover:bg-white"
                  >
                    {ethers.utils.parseBytes32String(movie)}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="w-3/12 h-5/6 bg-slate-100 shadow-slate-300 shadow-lg rounded-lg p-2">
          <h2 className="font-poppins font-medium text-lg text-center m-2">
            Selected Movies
          </h2>
          {selectedMovies.length === 0 ? (
            <div className="flex h-5/6 items-center justify-center">
              <h3 className="font-poppins">No Movies Selected</h3>
            </div>
          ) : (
            <div className="flex flex-col items-center h-5/6">
              {selectedMovies.map((movie, index) => (
                <button
                  key={index}
                  onClick={() => deselectMovie(index)}
                  className="font-poppins font-normal text-center text-sm m-2 p-2 shadow-md bg-slate-200 rounded-lg w-full transition duration-300 ease-in-out hover:bg-red-200"
                >
                  {ethers.utils.parseBytes32String(fetchedMovies.data[movie])}
                </button>
              ))}
            </div>
          )}
          <div className="text-center">
            <button
              className="w-5/6 bg-slate-900 text-white text-sm font-poppins font-medium p-2 text-center rounded-xl"
              onClick={() => addMoviesMutation.mutate()}
            >
              Add Movies
            </button>
          </div>
        </div>
        <div className="w-2/6 h-5/6 bg-slate-100 shadow-slate-300 shadow-lg rounded-lg">
          <h2 className="font-poppins font-medium text-lg text-center m-2">
            Current Movies
          </h2>
          <div className="flex flex-col items-center h-full">
            {fetchedCinemaMovies.isLoading ? (
              <>
                <p className="font-poppins m-2 my-3">Fetching Movies</p>
                <MoonLoader
                  loading={fetchedMovies.isLoading}
                  size={25}
                  color={"black"}
                />
              </>
            ) : (
              fetchedCinemaMovies.data.map((movie, index) => (
                <button
                  key={index}
                  onClick={() => selectMovie(index)}
                  className="font-poppins font-normal text-center text-sm m-2 p-2 shadow-md bg-slate-200 rounded-lg w-full transition duration-300 ease-in-out hover:bg-white"
                >
                  {movie}
                </button>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default addMovies;
