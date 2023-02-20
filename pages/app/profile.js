import { AnimatePresence } from "framer-motion";
import useToggle from "hooks/useToggle";
import ActiveTicketList from "modules/userPages/profilePage/ActiveTicketList";
import TicketHistory from "modules/userPages/profilePage/TicketHistory";
import TicketPageTab from "modules/userPages/profilePage/TicketPageTab";
import React from "react";

import AnimatedContainer from "@/components/AnimatedContainer";
import { Paragraph, Title } from "@/components/shared/Texts";

const Profile = () => {
  const [activeTab, toggleActiveTab] = useToggle(false);
  return (
    <AnimatedContainer className="w-full p-4">
      <div className="mb-2 text-center">
        <Title text="Ticket Details" />
      </div>
      <TicketPageTab activeTab={activeTab} toggleActiveTab={toggleActiveTab} />
      <AnimatePresence>
        {!activeTab ? <ActiveTicketList /> : <TicketHistory />}
      </AnimatePresence>
    </AnimatedContainer>
  );
};

export default Profile;
