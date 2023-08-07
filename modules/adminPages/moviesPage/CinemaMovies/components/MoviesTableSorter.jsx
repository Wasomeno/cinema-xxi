import React, { useState } from "react"
import { AnimatePresence } from "framer-motion"
import { TbArrowsDownUp } from "react-icons/tb"

import { CenteredModalContainer } from "@/components/ModalContainer"

const getSortings = (table) => [
  {
    id: 1,
    text: "Id from low to high",
    onClick() {
      table.getColumn("id")?.toggleSorting(false)
    },
  },
  {
    id: 2,
    text: "Id from high to low",
    onClick() {
      table.getColumn("id")?.toggleSorting(true)
    },
  },
]

export const MoviesTableSorter = ({ table }) => {
  const sortings = getSortings(table)
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedSorting, setSelectedSorting] = useState(sortings[0])

  return (
    <>
      <div
        onClick={() => setModalOpen(true)}
        className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-md border bg-white p-2 dark:border-slate-700 dark:bg-slate-900 lg:w-3/6 lg:justify-between"
      >
        <span className="hidden text-xs lg:block lg:w-full lg:text-sm">
          {selectedSorting.text}
        </span>
        <div className="flex w-5 items-center justify-center">
          <TbArrowsDownUp size="14" />
        </div>
        <span />
      </div>
      <AnimatePresence>
        {modalOpen && (
          <CenteredModalContainer
            closeModal={() => setModalOpen(false)}
            className="h-auto w-full lg:h-3/6 lg:w-2/6"
          >
            <div className="mb-4 flex justify-between">
              <h4 className="font-poppins text-sm lg:text-base">Sorts</h4>
            </div>
            <div className="flex flex-col gap-2">
              {sortings.map((sorting) => (
                <button
                  key={sorting.id}
                  onClick={() => {
                    sorting.onClick()
                    setSelectedSorting(sorting)
                    setModalOpen(false)
                  }}
                  className="w-full justify-between rounded-md border bg-slate-50 p-2 dark:border-slate-700 dark:bg-slate-900 "
                >
                  <span className="text-xs lg:text-sm"> {sorting.text}</span>
                </button>
              ))}
            </div>
          </CenteredModalContainer>
        )}
      </AnimatePresence>
    </>
  )
}
