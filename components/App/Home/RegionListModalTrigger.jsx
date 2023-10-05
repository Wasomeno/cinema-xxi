import { useState } from "react"
import { AnimatePresence } from "framer-motion"
import useToggle from "hooks/useToggle"
import { HiChevronRight } from "react-icons/hi2"
import { twMerge } from "tailwind-merge"

import RegionListModal from "./RegionListModal"

export function RegionListModalTrigger({ region }) {
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
        <span
          className={twMerge(
            showRegionList && "rotate-90",
            "transition duration-200"
          )}
        >
          <HiChevronRight size="16" />
        </span>
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
