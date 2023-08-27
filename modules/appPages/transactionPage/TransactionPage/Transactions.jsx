import { useState } from "react"
import { useSkeleton } from "hooks/useSkeleton"
import { useUserConnectionDetails } from "hooks/useUserConnectionDetails"
import { RxCrossCircled } from "react-icons/rx"
import { twMerge } from "tailwind-merge"

import AnimatedContainer from "@/components/AnimatedContainer"
import { query } from "@/components/reactQuery/queries/query"
import { WalletNotConnected } from "@/components/WalletNotConnected"

import {
  TransactionCard,
  TransactionCardSkeleton,
} from "./components/TransactionCard"
import { TransactionDetailsModal } from "./components/TransactionDetailsModal"

export const Transactions = () => {
  const [activeTab, setActiveTab] = useState("tickets")

  const { user, isConnected } = useUserConnectionDetails()
  const transactions = query({
    queryKey: ["transactions"],
    url: `/api/users/${user}/transactions`,
    enabledCondition: user !== "" && user !== undefined,
  })

  const skeletons = useSkeleton(<TransactionCardSkeleton />, 5)

  const filteredTransactions = transactions.data?.filter((transaction) =>
    activeTab === "tickets"
      ? new Date(transaction.showtime * 1000).getMilliseconds() > Date.now()
      : new Date(transaction.showtime * 1000).getMilliseconds() < Date.now()
  )

  if (!isConnected) return <WalletNotConnected />
  return (
    <AnimatedContainer className="relative flex min-h-screen flex-1 flex-col bg-opacity-95 p-5 lg:p-10">
      <div className="mb-4 space-y-1.5 text-start">
        <h1 className="font-poppins text-base font-semibold lg:text-3xl">
          Transactions
        </h1>
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => setActiveTab("tickets")}
          className={twMerge(
            "rounded-lg bg-slate-100  px-3 py-1.5 text-xs text-slate-500 transition duration-200 lg:text-sm",
            activeTab === "tickets" &&
              "bg-blue-100 text-slate-800 dark:bg-blue-300"
          )}
        >
          Active Tickets
        </button>
        <button
          onClick={() => setActiveTab("history")}
          className={twMerge(
            "rounded-lg bg-slate-100 px-3 py-1.5 text-xs text-slate-500 transition duration-200 lg:text-sm",
            activeTab === "history" &&
              "bg-blue-100 text-slate-800 dark:bg-blue-300"
          )}
        >
          Transactions History
        </button>
      </div>
      <div className="mt-4 flex flex-col gap-2">
        {transactions.isLoading && skeletons.map((skeleton) => skeleton)}
        {!transactions.isLoading && transactions.data?.length
          ? filteredTransactions.map((transaction) => (
              <TransactionCard
                href={`/app/transactions?id=${transaction.id}`}
                key={transaction.id}
                cinema={transaction.cinema}
                movie={transaction.movie}
                showtime={transaction.showtime}
                studio={transaction.studio}
                ticketAmount={transaction.ticketIds.length}
              />
            ))
          : null}

        {!transactions.isLoading && !filteredTransactions.length ? (
          <div className="flex h-80 w-full  flex-col items-center justify-center gap-1.5">
            <span className="text-slate-400">No Transactions</span>
            <RxCrossCircled size="32" className="text-slate-400" />
          </div>
        ) : null}
      </div>
      <TransactionDetailsModal />
    </AnimatedContainer>
  )
}
