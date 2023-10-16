"use client"

import React, { useState } from "react"
import { Table } from "@tanstack/react-table"
import clsx from "clsx"
import { AnimatePresence } from "framer-motion"
import { TbArrowsDownUp } from "react-icons/tb"

import { TableSort } from "@/lib/tableSorts"
import { CenteredModal, ModalHeader } from "@/components/modal"

export function TableDataSorter({
  disabled,
  table,
  sorts,
}: {
  disabled?: boolean
  table?: Table<any>
  sorts: TableSort[]
}) {
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedSort, setSelectedSort] = useState(sorts[0])

  return (
    <>
      <div
        onClick={() => !disabled && setModalOpen(true)}
        className={clsx(
          "flex h-8 w-8 cursor-pointer items-center justify-center rounded-md border bg-white p-2 dark:border-slate-700 dark:bg-slate-900 lg:w-3/6 lg:justify-between",
          disabled && "opacity-50"
        )}
      >
        <span className="hidden text-xs lg:block lg:w-full lg:text-sm">
          {selectedSort.text}
        </span>
        <div className="flex w-5 items-center justify-center">
          <TbArrowsDownUp size="14" />
        </div>
        <span />
      </div>
      <AnimatePresence>
        {modalOpen && (
          <CenteredModal
            closeModal={() => setModalOpen(false)}
            className="h-auto w-full bg-slate-50 px-6 py-4 dark:bg-slate-900 lg:h-3/6 lg:w-2/6"
          >
            <ModalHeader
              title="Sorts"
              className="mb-4"
              closeModal={() => setModalOpen(false)}
            />
            <div className="flex flex-col gap-2">
              {sorts.map((sort) => (
                <button
                  key={sort.id}
                  onClick={() => {
                    if (disabled) return
                    table?.getColumn(sort.column)?.toggleSorting(sort.desc)
                    setSelectedSort(sort)
                    setModalOpen(false)
                  }}
                  className="w-full justify-between rounded-md border bg-slate-50 p-2 dark:border-slate-700 dark:bg-slate-800"
                >
                  <span className="text-xs lg:text-sm"> {sort.text}</span>
                </button>
              ))}
            </div>
          </CenteredModal>
        )}
      </AnimatePresence>
    </>
  )
}
