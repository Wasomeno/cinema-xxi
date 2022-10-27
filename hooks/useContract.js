import { ethers } from "ethers";
import CinemaABI from "../abi/Cinema.json";
import RolesABI from "../abi/Roles.json";
import TicketABI from "../abi/Ticket.json";
import MoviesABI from "../abi/Movies.json";

export const rolesContract = () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const contract = new ethers.Contract(
    process.env.ROLES_CONTRACT_ADDRESS,
    RolesABI.abi,
    provider
  );
  return contract;
};

export const cinemaContract = () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const contract = new ethers.Contract(
    process.env.CINEMA_CONTRACT_ADDRESS,
    CinemaABI.abi,
    provider
  );
  return contract;
};

export const ticketContract = () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const contract = new ethers.Contract(
    process.env.TICKET_CONTRACT_ADDRESS,
    TicketABI.abi,
    provider
  );
  return contract;
};

export const moviesContract = () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const contract = new ethers.Contract(
    process.env.MOVIES_CONTRACT_ADDRESS,
    MoviesABI.abi,
    provider
  );
  return contract;
};
