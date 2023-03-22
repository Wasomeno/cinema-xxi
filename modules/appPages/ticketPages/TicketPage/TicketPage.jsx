import useToggle from "hooks/useToggle";
import { useUserConnectionDetails } from "hooks/useUserConnectionDetails";

import AnimatedContainer from "@/components/AnimatedContainer";
import DataContainer from "@/components/DataContainer";
import { useUserTransactions } from "@/components/reactQuery/queries/User/useUserTransactions";

import ActiveTicketList from "./components/ActiveTicketList";
import TicketHistory from "./components/TicketHistory";
import TicketPageTab from "./components/TicketPageTab";

export const TicketPage = () => {
  const { user, isConnected } = useUserConnectionDetails();
  const userTransactions = useUserTransactions(user);
  const [activeTab, toggleActiveTab] = useToggle(false);

  return (
    <AnimatedContainer className="relative h-screen overflow-y-scroll">
      {isConnected ? (
        <div className="flex flex-col items-center">
          <div className="sticky top-0 z-10 h-10 w-full lg:w-4/6">
            <TicketPageTab
              activeTab={activeTab}
              toggleActiveTab={toggleActiveTab}
            />
          </div>
          <DataContainer
            className="flex w-full flex-col items-center justify-start gap-4 p-4"
            loading={userTransactions.isLoading}
            object="tickets"
          >
            {!activeTab && (
              <ActiveTicketList
                transactions={userTransactions.data?.transactions}
              />
            )}
            {activeTab && (
              <TicketHistory
                transactions={userTransactions.data?.transactions}
              />
            )}
          </DataContainer>
        </div>
      ) : (
        <div className="flex h-4/6 items-center justify-center">
          <p className="font-poppins text-sm">Connect Your Wallet First</p>
        </div>
      )}
    </AnimatedContainer>
  );
};
