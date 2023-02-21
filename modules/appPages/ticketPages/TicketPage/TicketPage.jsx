import useToggle from "hooks/useToggle";

import AnimatedContainer from "@/components/AnimatedContainer";

import TicketPageTab from "./components/TicketPageTab";

export const TicketPage = () => {
  const [activeTab, toggleActiveTab] = useToggle(false);
  return (
    <AnimatedContainer className="h-screen p-4">
      <div className="flex justify-center">
        <div className="w-full lg:w-4/6">
          <TicketPageTab
            activeTab={activeTab}
            toggleActiveTab={toggleActiveTab}
          />
        </div>
      </div>
    </AnimatedContainer>
  );
};
