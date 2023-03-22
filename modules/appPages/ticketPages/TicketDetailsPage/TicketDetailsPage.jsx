import { useUserConnectionDetails } from "hooks/useUserConnectionDetails";
import moment from "moment";
import { useRouter } from "next/router";

import AnimatedContainer from "@/components/AnimatedContainer";
import ChevronLeft from "@/components/Icons/ChevronLeft";
import { useTicketDetails } from "@/components/reactQuery/queries/Ticket/useTicketDetails";

export const TicketDetailsPage = () => {
  const { user } = useUserConnectionDetails();
  const { query, back } = useRouter();
  const ticketDetails = useTicketDetails(query?.ticketId, user);

  return (
    <AnimatedContainer className="h-screen px-4 py-2 ">
      <div className="my-4 w-full">
        <div className="flex w-4/6 items-center justify-start gap-1">
          <button onClick={back} className="w-1/6">
            <ChevronLeft color="black" size="4" />
          </button>
          <span className="w-3/6 font-poppins text-xs">
            Transaction Details
          </span>
        </div>
      </div>
      <div className="flex h-full flex-col gap-4">
        <div className="flex h-2/6 items-center justify-evenly">
          <div className="h-full w-5/12">
            <div className="h-full w-full rounded-lg bg-slate-300" />
          </div>
          <div className="flex h-full w-6/12 items-center justify-center">
            <div className="flex flex-col gap-2">
              <h5 className="font-poppins text-sm">
                {ticketDetails.data?.movie.title}
              </h5>
              <p className="font-sans text-xs tracking-wider">
                {ticketDetails.data?.cinema.name}
              </p>
              <p className="font-sans text-xs tracking-wider">
                Studio {ticketDetails.data?.studio}
              </p>

              <p className="font-poppins text-xs">
                {moment(ticketDetails.data?.showtime * 1000).format("llll")}
              </p>
            </div>
          </div>
        </div>
        <div className="h-2/6">
          <div className="my-2 ml-2">
            <h5 className="font-poppins text-sm font-medium">
              Transaction Details
            </h5>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex justify-evenly">
              <span className="w-6/12 text-sm tracking-wide">Regular Seat</span>
              <span className="w-5/12 text-right text-sm tracking-wide">
                {ticketDetails.data?.total} ETH
              </span>
            </div>
            <div className="flex justify-evenly">
              <span className="w-6/12 text-sm tracking-wide">
                Transaction Fee
              </span>
              <span className="w-5/12 text-right text-sm tracking-wide">
                0.00001 ETH
              </span>
            </div>
          </div>
        </div>
      </div>
    </AnimatedContainer>
  );
};
