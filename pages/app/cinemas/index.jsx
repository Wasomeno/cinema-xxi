import { useEffect, useRef } from "react"
import { useRouter } from "next/router"
import { useAccount } from "wagmi"

import AnimatedContainer from "@/components/AnimatedContainer"
import { CinemaList } from "@/components/App/Cinemas/CinemaList"
import AppLayout from "@/components/Layouts/AppLayout"
import { WalletNotConnected } from "@/components/WalletNotConnected"

export default function AppCinemaSearchPage() {
  const { isConnected } = useAccount()
  const router = useRouter()

  const searchTimeoutRef = useRef()

  useEffect(() => {
    return () => {
      clearTimeout(searchTimeoutRef.current)
    }
  }, [])

  return (
    <AppLayout title="Search Cinema | Cinema App">
      {!isConnected ? (
        <WalletNotConnected />
      ) : (
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
                  const searchParams = new URLSearchParams(router.query)
                  event.target.value !== ""
                    ? searchParams.set("search", event.target.value)
                    : searchParams.delete("search")

                  router.replace(
                    `${router.pathname}?${searchParams.toString()}`
                  )
                }, 750)
              }}
              className="w-full rounded-lg border bg-white p-2 text-xs focus:outline-none dark:border-slate-700 dark:bg-slate-900 lg:text-base"
              placeholder="Search cinema..."
            />
          </div>
          <CinemaList />
        </AnimatedContainer>
      )}
    </AppLayout>
  )
}
