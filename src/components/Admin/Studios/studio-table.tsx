"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Studio } from "@prisma/client"
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

import { studioSorts } from "@/lib/tableSorts"
import { AnimatedContainer } from "@/components/animated-container"
import Table from "@/components/table"
import { TableDataSorter } from "@/components/table-data-sorter"
import TableRowMenu from "@/components/table-row-menu"

import { AddStudioModal } from "./add-studio-modal"
import { DeleteStudioModal } from "./delete-studio-modal"
import { EditStudioModal } from "./edit-studio-modal"

export const StudioTable = ({ studios }: { studios: Studio[] }) => {
  const [selectedStudios, setSelectedStudios] = useState<number[]>([])
  const [sorting, setSorting] = useState<SortingState>([])
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 })

  const searchParams = useSearchParams()
  const router = useRouter()

  function selectAllStudios(studioIds: number[]) {
    setSelectedStudios(studioIds)
  }

  function deselectAllStudios() {
    setSelectedStudios([])
  }

  function selectStudio(studioId: number) {
    setSelectedStudios((current) => [...current, studioId])
  }

  function deselectStudio(studioId: number) {
    const filteredStudios = selectedStudios.filter(
      (selectedStudioId) => selectedStudioId !== studioId
    )
    setSelectedStudios(filteredStudios)
  }

  const cinemaStudioTableColumns: ColumnDef<Studio>[] = [
    {
      id: "select",
      header: ({ table }) => {
        return (
          <input
            type="checkbox"
            className="h-4 w-4 cursor-pointer accent-blue-300 dark:accent-blue-800"
            checked={
              table.getCoreRowModel().rows.length === selectedStudios.length
            }
            onChange={() =>
              table.getCoreRowModel().rows.length === selectedStudios.length
                ? deselectAllStudios()
                : selectAllStudios(
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
              checked={selectedStudios.includes(row.original.id)}
              onChange={() =>
                selectedStudios.includes(row.original.id)
                  ? deselectStudio(row.original.id)
                  : selectStudio(row.original.id)
              }
            />
          </div>
        )
      },
    },
    { accessorKey: "id", header: "Id", cell: (info) => info.getValue() },
    {
      accessorKey: "studio",
      header: "Studio",
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "capacity",
      header: "Capacity",
      cell: (info) => info.getValue(),
    },
    {
      id: "menu",
      cell: ({ row }) => (
        <TableRowMenu>
          <TableRowMenu.Button
            onClick={() => {
              router.push(`/admin/studios/${row.original.id}`)
            }}
          >
            View Studio
          </TableRowMenu.Button>
        </TableRowMenu>
      ),
    },
  ]

  const table = useReactTable({
    data: studios,
    columns: cinemaStudioTableColumns,
    state: { sorting, pagination },
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })

  return (
    <div className="flex flex-1 flex-col items-center">
      <AnimatedContainer className="flex w-full flex-1 flex-col">
        <div className="my-2 flex justify-between gap-2.5">
          <div className="flex items-center gap-2">
            <input
              type="number"
              placeholder="Search for studio number"
              onChange={(event) =>
                table.getColumn("studio")?.setFilterValue(event.target.value)
              }
              className="h-8 w-44 rounded-md border p-2 text-xs dark:border-slate-700 dark:bg-slate-900 lg:w-96 lg:text-sm"
            />
            <TableDataSorter table={table} sorts={studioSorts} />
          </div>
          <div className="flex w-72 items-center justify-end gap-2">
            <button
              onClick={() => router.push("/admin/studios?add=true")}
              className="rounded-lg bg-green-600 p-2 text-slate-100 transition duration-150 disabled:bg-opacity-50 dark:bg-green-800"
            >
              <HiPlus className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
            </button>
            <button
              onClick={() => router.push("/admin/studios?delete=true")}
              disabled={!selectedStudios.length}
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
            className="flex-items-center justify-center rounded-lg border bg-slate-50 p-2  disabled:opacity-50 dark:border-slate-700 dark:bg-slate-800"
          >
            <HiChevronLeft />
          </button>
          <button
            disabled={!table.getCanNextPage()}
            onClick={() => table.nextPage()}
            className="flex-items-center justify-center rounded-lg border bg-slate-50 p-2 disabled:opacity-50 dark:border-slate-700 dark:bg-slate-800"
          >
            <HiChevronRight />
          </button>
        </div>
        <AnimatePresence>
          {searchParams.get("add") && <AddStudioModal />}
          {searchParams.get("edit") && <EditStudioModal />}
          {searchParams.get("delete") && (
            <DeleteStudioModal selectedStudio={selectedStudios} />
          )}
        </AnimatePresence>
      </AnimatedContainer>
    </div>
  )
}
