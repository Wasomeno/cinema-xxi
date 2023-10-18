"use client"

import { useEffect, useRef } from "react"
import { useRouter } from "next/navigation"

import { AnimatedContainer } from "@/components/animated-container"
import { CinemaList } from "@/components/App/Cinemas/cinema-list"
import { WalletConnection } from "@/components/App/wallet-connection"

export default function AppCinemaSearchPage() {
  const router = useRouter()
  const searchTimeoutRef = useRef<NodeJS.Timeout>()

  useEffect(() => {
    return () => clearTimeout(searchTimeoutRef.current)
  }, [])

  return (
    <WalletConnection>
      <AnimatedContainer className="flex-1 p-4 lg:p-10">
        <div className="space-y-1.5text-start mb-2.5">
          <h1 className="font-poppins text-base font-semibold lg:text-3xl">
            Search Cinemas
          </h1>
          <p className="text-xs lg:text-base">
            Search for cinema of your choosing
          </p>
        </div>
        <div className="sticky top-[59px] bg-white dark:bg-slate-950 lg:static lg:w-3/6">
          <input
            type="text"
            onChange={(event) => {
              searchTimeoutRef.current = setTimeout(() => {
                const newSearchParams = new URLSearchParams()
                event.target.value !== ""
                  ? newSearchParams.set("search", event.target.value)
                  : newSearchParams.delete("search")
                router.replace(`/app/cinemas?${newSearchParams.toString()}`)
              }, 750)
            }}
            className="w-full rounded-lg border bg-white p-2 text-xs focus:outline-none dark:border-slate-700 dark:bg-slate-900 lg:text-base"
            placeholder="Search cinema..."
          />
        </div>
        <CinemaList />
      </AnimatedContainer>
    </WalletConnection>
  )
}
