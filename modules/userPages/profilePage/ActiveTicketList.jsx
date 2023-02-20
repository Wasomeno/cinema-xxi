import AnimatedContainer from "@/components/AnimatedContainer";
import { useActiveTickets } from "@/components/reactQuery/queries/Ticket/useActiveTickets";

const ActiveTicketList = () => {
  const activeTickets = useActiveTickets();
  return <AnimatedContainer>Tests</AnimatedContainer>;
};

export default ActiveTicketList;
