import moment from "moment";
import Link from "next/link";

import AnimatedContainer from "@/components/AnimatedContainer";

const TicketHistory = ({ transactions }) => {
  const unixTimeNow = moment().unix();
  const pastTransactions = transactions.filter(
    (transaction) => transaction.showtime < unixTimeNow
  );

  return (
    <AnimatedContainer className="flex max-h-full w-full flex-col items-center justify-start gap-4 overflow-y-scroll">
      {pastTransactions.length < 1 ? (
        <div className="flex h-72 w-full items-center justify-center">
          <p className="font-poppins text-xs">No Tickets</p>
        </div>
      ) : (
        pastTransactions.map((transaction) => (
          <Link
            key={transaction.id}
            href={"/app/tickets/" + transaction.id}
            className="flex w-full items-center justify-center gap-2 rounded-md bg-slate-50 p-2 dark:bg-slate-700 dark:text-slate-100 lg:w-3/6"
          >
            <div className="w-2/6 lg:w-3/12">
              <div className="h-36 w-full rounded-md bg-slate-500 lg:h-52" />
            </div>
            <div className="flex w-4/6 flex-col gap-2">
              <p className="font-poppins text-sm">{transaction.movie.title}</p>
              <p className="font-sans text-xs tracking-wide">
                {transaction.cinema.name} , Studio {transaction.studio}
              </p>
              <p className="font-sans text-xs tracking-wide">
                {moment(transaction.showtime * 1000).format("llll")}
              </p>
              <p className="font-sans text-xs font-medium tracking-wide">
                {transaction.ticketIds.length} Seats
              </p>
            </div>
          </Link>
        ))
      )}
    </AnimatedContainer>
  );
};

export default TicketHistory;
