import { ethers } from "ethers";
import CinemaABI from "../abi/Cinema.json";
import RolesABI from "../abi/Roles.json";
import TicketABI from "../abi/Ticket.json";
import MoviesABI from "../abi/Movies.json";
import TransactionsABI from "../abi/Transactions.json";
import { useContract, useProvider, useSigner } from "wagmi";

const createContract = (contractAddress, abi) => {
  const provider = useProvider();
  const { data: signer, isLoading } = useSigner();
  return useContract({
    address: contractAddress,
    abi: abi,
    signerOrProvider: !isLoading ? signer : provider,
  });
};

export const rolesContract = () =>
  createContract(process.env.ROLES_CONTRACT_ADDRESS, RolesABI.abi);

export const cinemaContract = () =>
  createContract(process.env.CINEMA_CONTRACT_ADDRESS, CinemaABI.abi);

export const ticketContract = () =>
  createContract(process.env.TICKET_CONTRACT_ADDRESS, TicketABI.abi);

export const moviesContract = () =>
  createContract(process.env.MOVIES_CONTRACT_ADDRESS, MoviesABI.abi);

export const transactionsContract = () =>
  createContract(
    process.env.TRANSACTIONS_CONTRACT_ADDRESS,
    TransactionsABI.abi
  );
