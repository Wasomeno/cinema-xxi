import { useContract, useProvider, useSigner } from "wagmi";

import RolesABI from "../abi/Roles.json";
import TicketABI from "../abi/Ticket.json";

const createContract = (contractAddress, abi) => {
  const { isLoading, data } = useSigner();
  const provider = useProvider();
  const contract = useContract({
    address: contractAddress,
    abi: abi,
    signerOrProvider: isLoading ? provider : data,
  });
  return contract;
};

export const rolesContract = () => {
  return createContract(process.env.ROLES_CONTRACT_ADDRESS, RolesABI.abi);
};

export const ticketContract = () => {
  return createContract(process.env.TICKET_CONTRACT_ADDRESS, TicketABI.abi);
};
