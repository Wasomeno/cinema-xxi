"use client"

import { useState } from "react"
import { Region } from "@prisma/client"
import { AnimatePresence } from "framer-motion"
import { HiChevronRight } from "react-icons/hi2"
import { twMerge } from "tailwind-merge"

import { useToggle } from "@/hooks/useToggle"

import { RegionListModal } from "./region-list-modal"

export function RegionListModalTrigger({ region }: { region: Region }) {
  const [selectedRegion, setSelectedRegion] = useState(region)
  const [showRegionList, toggleShowRegionList] = useToggle(false)

  return (
    <>
      <button
        onClick={toggleShowRegionList}
        className="flex w-6/12  items-center justify-between rounded-md border bg-slate-50 p-2 text-start font-poppins text-xs dark:border-slate-800 dark:bg-slate-900 md:w-3/12 lg:text-sm"
      >
        <span className="text-slate-800 dark:text-slate-50">
          {selectedRegion.name}
        </span>
        <div
          className={twMerge(
            showRegionList && "rotate-90",
            "transition duration-200"
          )}
        >
          <HiChevronRight size="16" />
        </div>
      </button>
      <AnimatePresence>
        {showRegionList && (
          <RegionListModal
            setSelectedRegion={setSelectedRegion}
            toggleShowRegionList={toggleShowRegionList}
          />
        )}
      </AnimatePresence>
    </>
  )
}
