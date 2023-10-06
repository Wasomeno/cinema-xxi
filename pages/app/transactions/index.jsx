import { useSearchParams } from "next/navigation"
import { useRouter } from "next/router"
import { useQuery } from "@tanstack/react-query"
import { useSkeleton } from "hooks/useSkeleton"
import { RxCrossCircled } from "react-icons/rx"
import { twMerge } from "tailwind-merge"
import { useAccount } from "wagmi"

import AnimatedContainer from "@/components/AnimatedContainer"
import {
  TransactionCard,
  TransactionCardSkeleton,
} from "@/components/App/Transaction/TransactionCard"
import { TransactionDetailsModal } from "@/components/App/Transaction/TransactionDetailsModal"
import AppLayout from "@/components/Layouts/AppLayout"
import { WalletNotConnected } from "@/components/WalletNotConnected"

export default function AppTransactionsPage() {
  const { address, isConnected } = useAccount()

  const searchParams = useSearchParams()

  const router = useRouter()
  const isHistory = searchParams.get("history") !== null

  const transactions = useQuery(
    ["transactions", isHistory],
    () =>
      fetch(
        `/api/users/${address}/transactions?${searchParams.toString()}`
      ).then((response) => response.json()),
    { enabled: isConnected }
  )

  const skeletons = useSkeleton(<TransactionCardSkeleton />, 5)

  return (
    <AppLayout pageTitle="Transactions">
      {!isConnected ? (
        <WalletNotConnected />
      ) : (
        <AnimatedContainer className="relative flex min-h-screen flex-1 flex-col bg-opacity-95 p-5 lg:p-10">
          <div className="mb-4 space-y-1.5 text-start">
            <h1 className="font-poppins text-base font-semibold lg:text-3xl">
              Transactions
            </h1>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => router.replace(`${router.pathname}`)}
              className={twMerge(
                "rounded-lg bg-slate-100  px-3 py-1.5 text-xs text-slate-500 transition duration-200 lg:text-sm",
                !isHistory && "bg-blue-100 text-slate-800 dark:bg-blue-300"
              )}
            >
              Active
            </button>
            <button
              onClick={() => router.replace(`${router.pathname}?history=true`)}
              className={twMerge(
                "rounded-lg bg-slate-100 px-3 py-1.5 text-xs text-slate-500 transition duration-200 lg:text-sm",
                isHistory && "bg-blue-100 text-slate-800 dark:bg-blue-300"
              )}
            >
              History
            </button>
          </div>
          <div className="mt-4 flex flex-col gap-2">
            {transactions.isLoading && skeletons.map((skeleton) => skeleton)}
            {!transactions.isLoading && transactions.data?.length
              ? transactions.data.map((transaction) => (
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

            {!transactions.isLoading && !transactions.data?.length ? (
              <div className="flex h-80 w-full  flex-col items-center justify-center gap-1.5">
                <span className="text-slate-400">No Transactions</span>
                <RxCrossCircled size="32" className="text-slate-400" />
              </div>
            ) : null}
          </div>
          <TransactionDetailsModal />
        </AnimatedContainer>
      )}
    </AppLayout>
  )
}
