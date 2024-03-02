import Link from "next/link"
import { twMerge } from "tailwind-merge"

import { AnimatedContainer } from "@/components/animated-container"
import { TransactionDetailModal } from "@/components/App/Transaction/transaction-detail-modal"
import { Transactions } from "@/components/App/Transaction/transactions"
import { WalletConnection } from "@/components/App/wallet-connection"

type TCommonPageProps = {
  searchParams: Record<string, string>
  params: Record<string, string>
}

export default function TransactionsPage(props: TCommonPageProps) {
  const isHistory = props.searchParams.history !== undefined

  return (
    <WalletConnection>
      <AnimatedContainer className="relative flex min-h-screen flex-1 flex-col bg-opacity-95 p-4 lg:p-10">
        <div className="mb-2 space-y-1.5 text-start lg:mb-4">
          <h1 className="font-poppins text-base font-semibold lg:text-3xl">
            Transactions
          </h1>
        </div>
        <div className="flex gap-2">
          <Link
            href="/app/transactions"
            className={twMerge(
              "rounded-lg bg-slate-100 px-3  py-1.5 text-xs font-medium text-slate-500 transition duration-200 lg:text-sm",
              !isHistory && "bg-blue-100 text-slate-800 dark:bg-blue-300"
            )}
          >
            Active
          </Link>
          <Link
            href="?history=true"
            className={twMerge(
              "rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-500 transition duration-200 lg:text-sm",
              isHistory && "bg-blue-100 text-slate-800 dark:bg-blue-300"
            )}
          >
            History
          </Link>
        </div>
        <Transactions />
        <TransactionDetailModal />
      </AnimatedContainer>
    </WalletConnection>
  )
}
