import { ethers } from "ethers";
import RolesABI from "../abi/Roles.json";
import TicketABI from "../abi/Ticket.json";
import { useSigner } from "wagmi";

const createContract = (contractAddress, abi) => {
  const { data: signer } = useSigner();
  const contract = new ethers.Contract(contractAddress, abi, signer);
  return contract;
};

export const rolesContract = () => {
  return createContract(process.env.ROLES_CONTRACT_ADDRESS, RolesABI.abi);
};

export const ticketContract = ({ read }) => {
  return createContract(process.env.TICKET_CONTRACT_ADDRESS, TicketABI.abi);
};
