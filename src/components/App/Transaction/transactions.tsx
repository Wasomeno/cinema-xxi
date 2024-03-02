"use client"

import React from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { Prisma } from "@prisma/client"
import { useQuery } from "@tanstack/react-query"
import { RxCrossCircled } from "react-icons/rx"
import { useAccount } from "wagmi"

import { useSkeleton } from "@/hooks/useSkeleton"

import { TransactionCard, TransactionCardSkeleton } from "./transaction-card"

export const Transactions = () => {
  const { address } = useAccount()

  const searchParams = useSearchParams()

  const router = useRouter()
  const pathname = usePathname()
  const isHistory = searchParams.get("history") !== null

  const transactions = useQuery<
    Prisma.TransactionGetPayload<{
      include: { movie: true; cinema: true; region: true }
    }>[]
  >({
    queryKey: ["transactions", isHistory],
    queryFn: () =>
      fetch(
        `/api/users/${address}/transactions?${searchParams.toString()}`
      ).then((response) => response.json()),
  })

  const skeletons = useSkeleton(<TransactionCardSkeleton />, 5)

  function getTransactionURL(transactionId: number) {
    const newSearchParams = new URLSearchParams(searchParams.toString())
    newSearchParams.set("id", transactionId.toString())
    return `${pathname}?${newSearchParams.toString()}`
  }

  return (
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
  )
}
