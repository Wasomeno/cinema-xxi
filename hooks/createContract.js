import { useContract, useProvider, useSigner } from "wagmi";

import RolesABI from "../abi/Roles.json";
import TicketABI from "../abi/Ticket.json";

const createContract = (contractAddress, abi) => {
  const provider = useProvider();
  const contract = useContract({
    address: contractAddress,
    abi: abi,
    signerOrProvider: provider,
  });
  return contract;
};

export const rolesContract = () => {
  return createContract(process.env.ROLES_CONTRACT_ADDRESS, RolesABI.abi);
};

export const ticketContract = ({ read }) => {
  return createContract(process.env.TICKET_CONTRACT_ADDRESS, TicketABI.abi);
};
