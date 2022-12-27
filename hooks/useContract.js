import { ethers } from "ethers";
import CinemaABI from "../abi/Cinema.json";
import RolesABI from "../abi/Roles.json";
import TicketABI from "../abi/Ticket.json";
import MoviesABI from "../abi/Movies.json";
import TransactionsABI from "../abi/Transactions.json";
import RegionABI from "../abi/Region.json";
import { useSigner } from "wagmi";

const createContract = (contractAddress, abi, readOnly) => {
  const provider = new ethers.providers.InfuraProvider(
    "goerli",
    "10d1de5267e944c0a6580f6a690283a7"
  );

  if (!readOnly) {
    const { data: signer } = useSigner();
    const contract = new ethers.Contract(contractAddress, abi, signer);
    return contract;
  }

  const contract = new ethers.Contract(contractAddress, abi, provider);
  return contract;
};

export const rolesContract = ({ read }) => {
  return createContract(process.env.ROLES_CONTRACT_ADDRESS, RolesABI.abi, read);
};

export const cinemaContract = ({ read }) => {
  return createContract(
    process.env.CINEMA_CONTRACT_ADDRESS,
    CinemaABI.abi,
    read
  );
};

export const regionContract = ({ read }) => {
  return createContract(
    process.env.REGION_CONTRACT_ADDRESS,
    RegionABI.abi,
    read
  );
};

export const ticketContract = ({ read }) => {
  return createContract(
    process.env.TICKET_CONTRACT_ADDRESS,
    TicketABI.abi,
    read
  );
};

export const moviesContract = ({ read }) => {
  return createContract(
    process.env.MOVIES_CONTRACT_ADDRESS,
    MoviesABI.abi,
    read
  );
};

export const transactionsContract = ({ read }) => {
  return createContract(
    process.env.TRANSACTIONS_CONTRACT_ADDRESS,
    TransactionsABI.abi,
    read
  );
};
