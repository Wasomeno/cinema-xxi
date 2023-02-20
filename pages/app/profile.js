import AnimatedContainer from "@/components/AnimatedContainer";
import { Paragraph, Title } from "@/components/shared/Texts";
import { AnimatePresence } from "framer-motion";
import useToggle from "hooks/useToggle";
import ActiveTicketList from "modules/userPages/profilePage/ActiveTicketList";
import TicketHistory from "modules/userPages/profilePage/TicketHistory";
import TicketPageTab from "modules/userPages/profilePage/TicketPageTab";
import React from "react";

const profile = () => {
  const [activeTab, toggleActiveTab] = useToggle(false);
  return (
    <AnimatedContainer className="p-4 w-full">
      <div className="text-center mb-2">
        <Title text="Ticket Details" />
      </div>
      <TicketPageTab activeTab={activeTab} toggleActiveTab={toggleActiveTab} />
      <AnimatePresence>
        {!activeTab ? <ActiveTicketList /> : <TicketHistory />}
      </AnimatePresence>
    </AnimatedContainer>
  );
};

export default profile;
