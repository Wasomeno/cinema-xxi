import { ethers } from "ethers";
import { cinemaContract } from "../hooks/useContract";

export const fetchShowTimes = async (region, cinema) => {
  const contract = cinemaContract();
  const result = await contract.getCinemaDetails(12345, 1);
  return result;
};

export const fetchStudioShowTimes = async (region, cinema, studio) => {
  const contract = cinemaContract();
  const result = await contract.getStudioShowTimes(region, cinema, studio);
  return result;
};
