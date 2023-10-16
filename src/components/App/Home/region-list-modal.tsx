"use client"

import { Dispatch, SetStateAction } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { Region } from "@prisma/client"
import { useQuery } from "@tanstack/react-query"
import clsx from "clsx"
import { twMerge } from "tailwind-merge"

import { useSkeleton } from "@/hooks/useSkeleton"
import { CenteredModal, ModalHeader } from "@/components/modal"

type RegionListModalProps = {
  setSelectedRegion: Dispatch<SetStateAction<Region>>
  toggleShowRegionList: () => void
}

export function RegionListModal({
  setSelectedRegion,
  toggleShowRegionList,
}: RegionListModalProps) {
  const allRegion = useQuery<Region[]>(["regions"], () =>
    fetch("/api/regions").then((result) => result.json())
  )
  const skeletons = useSkeleton(
    <div className="h-10 w-full animate-pulse rounded-lg bg-slate-300 dark:bg-slate-600" />,
    5
  )
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const router = useRouter()
  const regionId = parseInt(searchParams.get("region") ?? "1")

  return (
    <CenteredModal
      closeModal={toggleShowRegionList}
      className="h-4/6 bg-slate-50 p-4 dark:bg-slate-800 lg:h-4/6 lg:w-2/6 lg:px-6 lg:py-4 "
    >
      <ModalHeader
        title="Region List"
        className="mb-4"
        closeModal={toggleShowRegionList}
      />
      <div className="flex flex-col items-center gap-2 overflow-y-scroll">
        {allRegion.isLoading && skeletons.map((skeleton) => skeleton)}

        {!allRegion.isLoading && allRegion.status !== "error"
          ? allRegion.data?.map((region) => (
              <button
                key={region.id}
                onClick={() => {
                  setSelectedRegion(region)
                  toggleShowRegionList()
                  router.replace(`${pathname}?region=${region.id}`)
                }}
                className={twMerge(
                  clsx(
                    "relative flex w-full cursor-pointer justify-center rounded-lg border bg-slate-100 p-2 text-sm font-medium tracking-wide shadow-sm dark:border-slate-500 dark:bg-slate-700",
                    region.id === regionId &&
                      "bg-blue-400 text-white dark:bg-blue-800"
                  )
                )}
              >
                <span className="text-xs lg:text-sm">{region.name}</span>
              </button>
            ))
          : null}
      </div>
    </CenteredModal>
  )
}
