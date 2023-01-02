import { ethers } from "ethers";
import { cinemaContract } from "../../../../hooks/useContract";
import { createSideEffects } from "../createSideEffects";
import mutation from "../mutation";

export const addCinemaShowTime = ({ region, cinema, hour, minutes }) => {
  const contract = cinemaContract({ read: false });
  const timeInSeconds = hour * 3600 + minutes * 60;
  const { mutate } = mutation(async (event) => {
    event.preventDefault();
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const addShowTime = await contract.addShowTimes(region, cinema, [
      timeInSeconds,
    ]);
    const waitTransaction = await provider.waitForTransaction(addShowTime.hash);
    return waitTransaction;
  }, createSideEffects({ context: "add", object: "showtime" }));

  return mutate;
};
