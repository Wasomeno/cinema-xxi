import {
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
} from "wagmi"

import RolesABI from "../abi/Roles.json"
import TicketABI from "../abi/Ticket.json"

const createContract = (contractAddress, abi) => {
  function read({ functionName, args }) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return useContractRead({
      abi,
      address: contractAddress,
      functionName,
      args,
    })
  }

  function write({ functionName, args }) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { config } = usePrepareContractWrite({
      abi,
      address: contractAddress,
      functionName,
      args,
    })
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return useContractWrite(config, {})
  }

  return { read, write }
}

export const rolesContract = createContract(
  process.env.ROLES_CONTRACT_ADDRESS,
  RolesABI.abi
)

export const ticketContract = createContract(
  process.env.TICKET_CONTRACT_ADDRESS,
  TicketABI.abi
)
