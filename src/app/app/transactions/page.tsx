"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { Transaction } from "@prisma/client"
import { useQuery } from "@tanstack/react-query"
import { RxCrossCircled } from "react-icons/rx"
import { twMerge } from "tailwind-merge"
import { useAccount } from "wagmi"

import { useSkeleton } from "@/hooks/useSkeleton"
import { AnimatedContainer } from "@/components/animated-container"
import {
  TransactionCard,
  TransactionCardSkeleton,
} from "@/components/App/Transaction/transaction-card"
import { TransactionDetailsModal } from "@/components/App/Transaction/TransactionDetailsModal"
import { WalletNotConnected } from "@/components/WalletNotConnected"

export default function AppTransactionsPage() {
  const { address, isConnected } = useAccount()

  const searchParams = useSearchParams()

  const router = useRouter()
  const pathname = usePathname()
  const isHistory = searchParams.get("history") !== null

  const transactions = useQuery<Transaction[]>(
    ["transactions", isHistory],
    () =>
      fetch(
        `/api/users/${address}/transactions?${searchParams.toString()}`
      ).then((response) => response.json()),
    { enabled: isConnected }
  )

  const skeletons = useSkeleton(<TransactionCardSkeleton />, 5)

  function getTransactionURL(transactionId: number) {
    const newSearchParams = new URLSearchParams(searchParams.toString())
    newSearchParams.set("id", transactionId.toString())
    return `${pathname}?${newSearchParams.toString()}`
  }

  if (!isConnected) return <WalletNotConnected />
  return (
    <AnimatedContainer className="relative flex min-h-screen flex-1 flex-col bg-opacity-95 p-4 lg:p-10">
      <div className="mb-2 space-y-1.5 text-start lg:mb-4">
        <h1 className="font-poppins text-base font-semibold lg:text-3xl">
          Transactions
        </h1>
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => router.replace(`${pathname}`)}
          className={twMerge(
            "rounded-lg bg-slate-100 px-3  py-1.5 text-xs font-medium text-slate-500 transition duration-200 lg:text-sm",
            !isHistory && "bg-blue-100 text-slate-800 dark:bg-blue-300"
          )}
        >
          Active
        </button>
        <button
          onClick={() => router.replace(`${pathname}?history=true`)}
          className={twMerge(
            "rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-500 transition duration-200 lg:text-sm",
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
                key={transaction.id}
                href={getTransactionURL(transaction.id)}
                cinema={transaction.cinema}
                movie={transaction.movie}
                showtime={parseInt(transaction.showtime.toString())}
                studio={transaction.studio}
                ticketAmount={transaction.ticketIds.length}
              />
            ))
          : null}

        {!transactions.isLoading && !transactions.data?.length ? (
          <div className="flex h-80 w-full  flex-col items-center justify-center gap-1.5">
            <span className="text-sm text-slate-400 lg:text-base">
              No Transactions
            </span>
            <RxCrossCircled className="h-6 w-6 text-slate-400 lg:h-7 lg:w-7" />
          </div>
        ) : null}
      </div>
      <TransactionDetailsModal />
    </AnimatedContainer>
  )
}
