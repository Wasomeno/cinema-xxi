import { ethers } from "ethers";
import {
  cinemaContract,
  moviesContract,
  rolesContract,
} from "../hooks/useContract";

export const fetchCinemaDetails = async (region, cinema) => {
  const contract = cinemaContract();
  const result = await contract.getCinemaDetails(region, cinema);
  return result.studiosAmount;
};

export const fetchShowTimes = async (region, cinema) => {
  const contract = cinemaContract();
  const result = await contract.getCinemaShowTimes(region, cinema);
  return result;
};

export const fetchStudioShowTimes = async (region, cinema, studio) => {
  const contract = cinemaContract();
  const result = await contract.getStudioShowTimes(region, cinema, studio);
  return result;
};

export const fetchRegions = async () => {
  const contract = cinemaContract();
  const result = await contract.getRegions();
  return result;
};

export const checkConnected = async (user) => {
  const contract = rolesContract();
  const result = await contract.adminToDetails(user);
  return result;
};

export const fetchAllMovies = async () => {
  const contract = moviesContract();
  const result = await contract.getMovies();
  return result;
};

export const fetchCinemaMovies = async (region, cinema) => {
  const contract = moviesContract();
  const result = await contract.getMoviesInCinema(region, cinema);
  return result;
};

export const fetchMovieDetails = async (movieId) => {
  const contract = moviesContract();
  const details = await contract.movieToDetails(movieId);
  return details;
};
