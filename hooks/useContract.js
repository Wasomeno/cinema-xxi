import { ethers } from "ethers";
import CinemaABI from "../abi/Cinema.json";
import RolesABI from "../abi/Roles.json";
import TicketABI from "../abi/Ticket.json";
import MoviesABI from "../abi/Movies.json";
import TransactionsABI from "../abi/Transactions.json";
import RegionABI from "../abi/Region.json";
import { useContract, useProvider, useSigner } from "wagmi";

const createContract = (contractAddress, abi) => {
  const provider = new ethers.providers.InfuraProvider(
    "goerli",
    "10d1de5267e944c0a6580f6a690283a7"
  );

  const contract = new ethers.Contract(contractAddress, abi, provider);
  return contract;
};

export const rolesContract = () =>
  createContract(process.env.ROLES_CONTRACT_ADDRESS, RolesABI.abi);

export const cinemaContract = () =>
  createContract(process.env.CINEMA_CONTRACT_ADDRESS, CinemaABI.abi);

export const regionContract = () =>
  createContract(process.env.REGION_CONTRACT_ADDRESS, RegionABI.abi);

export const ticketContract = () =>
  createContract(process.env.TICKET_CONTRACT_ADDRESS, TicketABI.abi);

export const moviesContract = () =>
  createContract(process.env.MOVIES_CONTRACT_ADDRESS, MoviesABI.abi);

export const transactionsContract = () =>
  createContract(
    process.env.TRANSACTIONS_CONTRACT_ADDRESS,
    TransactionsABI.abi
  );
