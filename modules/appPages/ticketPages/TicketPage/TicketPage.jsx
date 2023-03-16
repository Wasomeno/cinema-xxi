import useToggle from "hooks/useToggle";
import { useUserDetails } from "hooks/useUserDetails";
import moment from "moment";

import AnimatedContainer from "@/components/AnimatedContainer";
import DataContainer from "@/components/DataContainer";
import { userUserTransactions } from "@/components/reactQuery/queries/useUserTransactions";

import TicketPageTab from "./components/TicketPageTab";

export const TicketPage = () => {
  const unixTimeNow = moment().unix();
  const { isConnected } = useUserDetails();
  const userTransactions = userUserTransactions();
  const [activeTab, toggleActiveTab] = useToggle(false);

  return (
    <AnimatedContainer className="h-screen overflow-y-scroll p-4">
      {isConnected ? (
        <div className="flex flex-col items-center">
          <div className="w-full lg:w-4/6">
            <TicketPageTab
              activeTab={activeTab}
              toggleActiveTab={toggleActiveTab}
            />
          </div>
          <DataContainer
            className="flex w-full flex-col items-center justify-start gap-4"
            loading={userTransactions.isLoading}
            object="tickets"
          >
            {userTransactions.data?.transactions.length < 1 ? (
              <div className="flex h-72 w-full items-center justify-center">
                <p className="font-poppins text-xs">No Active Tickets</p>
              </div>
            ) : (
              userTransactions.data?.transactions.map((transaction) => (
                <>
                  {!activeTab && transaction.showtime > unixTimeNow && (
                    <div
                      key={transaction.id}
                      className="flex w-full items-center justify-center gap-2 rounded-md bg-slate-50 p-2"
                    >
                      <div className="w-2/6">
                        <div className="h-36 w-full rounded-md bg-slate-500" />
                      </div>
                      <div className="flex w-4/6 flex-col gap-2">
                        <p className="font-poppins text-sm">
                          {transaction.movie.title}
                        </p>
                        <p className="font-sans text-xs tracking-wide">
                          {transaction.cinema.name} , Studio{" "}
                          {transaction.studio}
                        </p>
                        <p className="font-sans text-xs tracking-wide">
                          {moment(transaction.showtime * 1000).format("llll")}
                        </p>
                        <p className="font-sans text-xs font-medium tracking-wide">
                          {transaction.ticketIds.length} Seats
                        </p>
                      </div>
                    </div>
                  )}
                  {activeTab && transaction.showtime < unixTimeNow && (
                    <div
                      key={transaction.id}
                      className="flex w-full items-center justify-center gap-2 rounded-md bg-slate-50 p-2"
                    >
                      <div className="w-2/6">
                        <div className="h-36 w-full rounded-md bg-slate-500" />
                      </div>
                      <div className="flex w-4/6 flex-col gap-2">
                        <p className="font-poppins text-sm">
                          {transaction.movie.title}
                        </p>
                        <p className="font-sans text-xs tracking-wide">
                          {transaction.cinema.name} , Studio{" "}
                          {transaction.studio}
                        </p>
                        <p className="font-sans text-xs tracking-wide">
                          {moment(transaction.showtime * 1000).format("llll")}
                        </p>
                        <p className="font-sans text-xs font-medium tracking-wide">
                          {transaction.ticketIds.length} Seats
                        </p>
                      </div>
                    </div>
                  )}
                </>
              ))
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
