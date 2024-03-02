"use client"

import { useEffect, useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  Row,
  SortingState,
  useReactTable,
} from "@tanstack/react-table"
import clsx from "clsx"
import { AnimatePresence } from "framer-motion"
import { BsXCircleFill } from "react-icons/bs"
import { HiChevronLeft, HiChevronRight, HiPlus, HiTrash } from "react-icons/hi2"
import { TbArrowsDownUp } from "react-icons/tb"

import { showtimeSorts, TableSort } from "@/lib/tableSorts"

import { AnimatedContainer } from "./animated-container"
import { CenteredModal, ModalHeader } from "./modal"
import Table from "./table"
import { TableDataSorter } from "./table-data-sorter"

type Table<T> = {
  data: T[]
  columns: ColumnDef<T>[]
}

export function DataTable<T>({ columns, data }: Table<T>) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 3 })
  const [selectedDatas, setSelectedDatas] = useState<Array<number | string>>([])

  const router = useRouter()
  const pathname = usePathname()

  function selectAllDatas(datas: Array<number | string>) {
    setSelectedDatas(datas)
    localStorage.setItem("selectedDatas", JSON.stringify(datas))
  }
  function deselectAllDatas() {
    setSelectedDatas([])
    localStorage.setItem("selectedDatas", JSON.stringify([]))
  }

  function selectData(data: number | string) {
    const currentSelected = [...selectedDatas, data]
    setSelectedDatas(currentSelected)
    localStorage.setItem("selectedDatas", JSON.stringify(currentSelected))
  }

  function deselectData(data: number | string) {
    const filteredDatas = selectedDatas.filter(
      (selectedData) => selectedData !== data
    )
    setSelectedDatas(filteredDatas)
    localStorage.setItem("selectedDatas", JSON.stringify(filteredDatas))
  }

  const tableColumns: ColumnDef<T>[] = [
    {
      id: "select",
      header: ({ table }) => {
        return (
          <input
            type="checkbox"
            className="h-4 w-4 cursor-pointer accent-blue-300 dark:accent-blue-800"
            checked={
              table.getCoreRowModel().rows.length === selectedDatas.length
            }
            onChange={() =>
              table.getCoreRowModel().rows.length === selectedDatas.length
                ? deselectAllDatas()
                : selectAllDatas(
                    table
                      .getCoreRowModel()
                      .rows.map((row) => row.getValue("id"))
                  )
            }
          />
        )
      },
      cell: ({ row }) => {
        return (
          <div className="px-1">
            <input
              type="checkbox"
              className="h-4 w-4 cursor-pointer rounded-md accent-blue-300 dark:accent-blue-800"
              checked={selectedDatas.includes(row.getValue("id"))}
              onChange={() =>
                selectedDatas.includes(row.getValue("id"))
                  ? deselectData(row.getValue("id"))
                  : selectData(row.getValue("id"))
              }
            />
          </div>
        )
      },
    },
    ...columns,
  ]

  const table = useReactTable({
    data: data,
    columns: tableColumns,
    state: { sorting, pagination },
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })

  useEffect(() => {
    return () => {
      localStorage.removeItem("selectedDatas")
    }
  }, [])

  return (
    <div className="flex flex-1 flex-col items-center">
      <AnimatedContainer className="flex w-full flex-1 flex-col">
        <div className="my-2 flex justify-between gap-2.5">
          <div className="flex items-center gap-2">
            <input
              type="number"
              placeholder="Search for showtime hours..."
              onChange={(event) =>
                table.getColumn("hour")?.setFilterValue(event.target.value)
              }
              className="h-8 w-44 rounded-md border p-2 text-xs dark:border-slate-700 dark:bg-slate-900 lg:w-96 lg:text-sm"
            />
            <TableDataSorter table={table} sorts={showtimeSorts} />
          </div>
          <div className="flex w-72 items-center justify-end gap-2">
            <button
              onClick={() => router.push(`${pathname}?add=true`)}
              className="rounded-lg bg-green-600 p-2 text-slate-100 transition duration-150 disabled:bg-opacity-50 dark:bg-green-800"
            >
              <HiPlus className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
            </button>
            <button
              onClick={() => router.push(`${pathname}?delete=true`)}
              disabled={!selectedDatas.length}
              className="rounded-lg bg-red-600 p-2 text-sm text-slate-100 transition duration-150 disabled:opacity-50 dark:bg-red-800 dark:disabled:opacity-50"
            >
              <HiTrash className="h-3 w-3 sm:h-4 sm:w-4 lg:h-3.5 lg:w-3.5" />
            </button>
          </div>
        </div>
        <div className="flex flex-1 flex-col overflow-x-scroll rounded-lg  border border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-800">
          <Table>
            <Table.Head>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <th
                        className="px-6 py-4 text-center font-medium text-gray-900 dark:text-slate-100"
                        key={header.id}
                      >
                        {header.isPlaceholder ? null : (
                          <div className="font-poppins text-xs tracking-wider sm:text-sm">
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                          </div>
                        )}
                      </th>
                    )
                  })}
                </tr>
              ))}
            </Table.Head>
            <Table.Body>
              {!table.getRowModel().rows?.length && (
                <tr>
                  <td colSpan={10}>
                    <div className="flex h-96 flex-col items-center justify-center gap-2 bg-slate-100">
                      <span className="font-poppins text-xs tracking-wider text-slate-400 lg:text-sm">
                        No Data
                      </span>
                      <BsXCircleFill size="30" className="text-slate-400" />
                    </div>
                  </td>
                </tr>
              )}

              {table.getRowModel().rows?.length
                ? table.getRowModel().rows.map((row) => {
                    return (
                      <tr key={row.id} className="transition duration-300">
                        {row.getVisibleCells().map((cell) => {
                          return (
                            <td
                              className="px-6 py-4 text-center text-xs  sm:text-sm"
                              key={cell.id}
                            >
                              {flexRender(
                                cell.column.columnDef.cell,
                                cell.getContext()
                              )}
                            </td>
                          )
                        })}
                      </tr>
                    )
                  })
                : null}
            </Table.Body>
          </Table>
        </div>
        <div className="mt-4 flex items-center gap-4">
          <button
            disabled={!table.getCanPreviousPage()}
            onClick={() => table.previousPage()}
            className="flex-items-center justify-center rounded-lg border bg-slate-50 p-2 disabled:opacity-50 dark:border-slate-500 dark:bg-slate-800"
          >
            <HiChevronLeft />
          </button>
          <button
            disabled={!table.getCanNextPage()}
            onClick={() => table.nextPage()}
            className="flex-items-center justify-center rounded-lg border bg-slate-50 p-2 disabled:opacity-50 dark:border-slate-500 dark:bg-slate-800"
          >
            <HiChevronRight />
          </button>
        </div>
      </AnimatedContainer>
    </div>
  )
}
