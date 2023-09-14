import { useState } from "react"
import { useAccount } from "wagmi"

import AnimatedContainer from "@/components/AnimatedContainer"
import { CinemaList } from "@/components/App/Cinemas/CinemaList"
import AppLayout from "@/components/Layouts/AppLayout"
import { WalletNotConnected } from "@/components/WalletNotConnected"

export default function AppCinemaSearchPage() {
  const [search, setSearch] = useState("")

  const { isConnected } = useAccount()

  return (
    <AppLayout pageTitle="Search">
      {!isConnected ? (
        <WalletNotConnected />
      ) : (
        <AnimatedContainer className="flex-1 py-5 lg:py-10">
          <div className="mb-2.5 space-y-1.5 px-5 text-start lg:px-10">
            <h1 className="font-poppins text-base font-semibold lg:text-3xl">
              Search Cinemas
            </h1>
            <p className="text-xs lg:text-base">
              Search for cinema of your choosing
            </p>
          </div>
          <div className="sticky top-[59px] bg-white px-5 dark:bg-slate-950 lg:static lg:w-3/6 lg:px-10">
            <input
              type="text"
              onChange={(event) => setSearch(event.target.value)}
              className="w-full rounded-lg border bg-white p-2 text-xs focus:outline-none dark:border-slate-700 dark:bg-slate-900 lg:text-base"
              placeholder="Search cinema..."
            />
          </div>
          <div className="mt-2.5 px-5  lg:w-3/6 lg:px-10">
            <CinemaList search={search} />
          </div>
        </AnimatedContainer>
      )}
    </AppLayout>
  )
}
