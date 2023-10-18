"use client"

import { useState } from "react"
import { useParams, useRouter, useSearchParams } from "next/navigation"
import { Cinema } from "@prisma/client"
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table"
import { AnimatePresence } from "framer-motion"
import { BsXCircleFill } from "react-icons/bs"
import { HiChevronLeft, HiChevronRight, HiPlus, HiTrash } from "react-icons/hi2"

import { cinemaSorts } from "@/lib/tableSorts"
import { AnimatedContainer } from "@/components/animated-container"
import Table from "@/components/table"
import { TableDataSorter } from "@/components/table-data-sorter"
import TableRowMenu from "@/components/table-row-menu"

import { AddCinemaModal } from "./add-cinema-modal"
import { DeleteCinemasModal } from "./delete-cinemas-modal"
import { RegionCinemaTableSkeletons } from "./region-cinema-table-row-skeleton"
import { ViewCinemaModal } from "./view-cinema-modal"

export const RegionCinemasTable = ({ cinemas }: { cinemas: Cinema[] }) => {
  const [selectedCinemas, setSelectedCinemas] = useState<number[]>([])
  const [sorting, setSorting] = useState<SortingState>([])

  const searchParams = useSearchParams()
  const params = useParams()
  const router = useRouter()

  function selectAllCinemas(cinemaIds: number[]) {
    setSelectedCinemas(cinemaIds)
  }

  function deselectAllCinemas() {
    setSelectedCinemas([])
  }

  function selectCinema(cinemaId: number) {
    setSelectedCinemas((current) => [...current, cinemaId])
  }

  function deselectCinema(cinemaId: number) {
    const filteredCinemas = selectedCinemas.filter(
      (selectedCinemaId) => selectedCinemaId !== cinemaId
    )
    setSelectedCinemas(filteredCinemas)
  }

  const cinemaTableColumns: ColumnDef<Cinema>[] = [
    {
      id: "select",
      header: ({ table }) => {
        return (
          <input
            type="checkbox"
            className="h-4 w-4 cursor-pointer accent-blue-300 dark:accent-blue-800"
            checked={
              table.getCoreRowModel().rows.length === selectedCinemas.length
            }
            onChange={() =>
              table.getCoreRowModel().rows.length === selectedCinemas.length
                ? deselectAllCinemas()
                : selectAllCinemas(
                    table.getCoreRowModel().rows.map((row) => row.original.id)
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
              checked={selectedCinemas.includes(row.original.id)}
              onChange={() =>
                selectedCinemas.includes(row.original.id)
                  ? deselectCinema(row.original.id)
                  : selectCinema(row.original.id)
              }
            />
          </div>
        )
      },
    },
    {
      accessorKey: "id",
      header: "Id",
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "name",
      header: "Name",
      cell: (info) => info.getValue(),
    },
    {
      id: "menu",
      cell: ({ row }) => (
        <TableRowMenu>
          <TableRowMenu.Link
            href={`/manager/regions/${params.regionId}?cinemaId=${row.original.id}&view=true`}
          >
            View Cinema
          </TableRowMenu.Link>
        </TableRowMenu>
      ),
    },
  ]

  const table = useReactTable({
    data: cinemas,
    columns: cinemaTableColumns,
    state: { sorting, pagination: { pageSize: 3, pageIndex: 0 } },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })

  return (
    <AnimatedContainer className="mt-2 w-full">
      <div className="my-2 flex justify-between gap-2.5">
        <div className="flex items-center gap-2">
          <input
            placeholder="Search for cinema..."
            onChange={(event) =>
              table.getColumn("name")?.setFilterValue(event.target.value)
            }
            className="h-8 w-44 rounded-md border p-2 text-xs dark:border-slate-700 dark:bg-slate-900 lg:w-96 lg:text-sm"
          />
          <TableDataSorter table={table} sorts={cinemaSorts} />
        </div>
        <div className="flex w-72 items-center justify-end gap-2">
          <button
            onClick={() =>
              router.push(`/manager/regions/${params.regionId}?add=true`)
            }
            className="rounded-lg bg-green-600 p-2 text-slate-100 transition duration-150 disabled:bg-opacity-50 dark:bg-green-800"
          >
            <HiPlus className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
          </button>
          <button
            onClick={() =>
              router.push(`/manager/regions/${params.regionId}?delete=true`)
            }
            disabled={!selectedCinemas.length}
            className="rounded-lg bg-red-600 p-2 text-sm text-slate-100 transition duration-150 disabled:bg-opacity-50 dark:bg-red-800"
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
          className="flex-items-center justify-center rounded-lg border bg-slate-50 p-2 disabled:opacity-50 dark:border-slate-600 dark:bg-slate-800"
        >
          <HiChevronLeft />
        </button>
        <button
          disabled={!table.getCanNextPage()}
          onClick={() => table.nextPage()}
          className="flex-items-center justify-center rounded-lg border bg-slate-50 p-2 disabled:opacity-50 dark:border-slate-600 dark:bg-slate-800"
        >
          <HiChevronRight />
        </button>
      </div>
      <AnimatePresence>
        {searchParams.get("view") && <ViewCinemaModal />}
        {searchParams.get("add") && <AddCinemaModal />}
        {searchParams.get("delete") && (
          <DeleteCinemasModal selectedCinemas={selectedCinemas} />
        )}
      </AnimatePresence>
    </AnimatedContainer>
  )
}
