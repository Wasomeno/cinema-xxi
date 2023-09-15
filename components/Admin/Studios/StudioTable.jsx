import { useState } from "react"
import { useRouter } from "next/router"
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { studioSorts } from "lib/tableSorts"
import { useSession } from "next-auth/react"
import { BsXCircleFill } from "react-icons/bs"
import { HiChevronLeft, HiChevronRight, HiPlus, HiTrash } from "react-icons/hi2"

import AnimatedContainer from "@/components/AnimatedContainer"
import { query } from "@/components/reactQuery/queries/query"
import { cinemaStudioQueryKeys } from "@/components/reactQuery/queries/queryKeys/cinemaStudioQueryKeys"
import Table from "@/components/Table"
import { TableDataSorter } from "@/components/TableDataSorter"
import TableRowMenu from "@/components/TableRowMenu"

import { StudioTableSkeletons } from "./StudioTableSkeleton"

export const StudioTable = ({ setSelectedStudios, selectedStudios }) => {
  const [sorting, setSorting] = useState()
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 })
  const session = useSession()
  const router = useRouter()
  const cinemaStudios = query({
    queryKey: cinemaStudioQueryKeys.allStudio,
    url: "/api/cinemas/" + session.data?.user.cinemaId + "/studios",
    enabledCondition: session.data !== undefined,
  })

  function selectAllStudios(studioIds) {
    !cinemaStudios.isLoading && setSelectedStudios(studioIds)
  }

  function deselectAllStudios() {
    !cinemaStudios.isLoading && setSelectedStudios([])
  }

  function selectStudio(studioId) {
    !cinemaStudios.isLoading &&
      setSelectedStudios((current) => [...current, studioId])
  }

  function deselectStudio(studioId) {
    const filteredStudios = selectedStudios.filter(
      (selectedStudioId) => selectedStudioId !== studioId
    )
    !cinemaStudios.isLoading && setSelectedStudios(filteredStudios)
  }

  const cinemaStudioTableColumns = [
    {
      id: "select",
      header: ({ table }) => {
        return (
          <input
            type="checkbox"
            className="h-4 w-4 cursor-pointer accent-blue-300 dark:accent-blue-800"
            checked={
              !cinemaStudios.isLoading &&
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
              checked={
                !cinemaStudios.isLoading &&
                selectedStudios.includes(row.original.id)
              }
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
    data: cinemaStudios.data,
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
                table.getColumn("studio").setFilterValue(event.target.value)
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
              {cinemaStudios.isLoading && <StudioTableSkeletons />}
              {!cinemaStudios.isLoading &&
                !table.getRowModel().rows?.length && (
                  <tr>
                    <td colSpan="10">
                      <div className="flex h-96 flex-col items-center justify-center gap-2 bg-slate-100">
                        <span className="font-poppins text-xs tracking-wider text-slate-400 lg:text-sm">
                          No Data
                        </span>
                        <BsXCircleFill size="30" className="text-slate-400" />
                      </div>
                    </td>
                  </tr>
                )}

              {!cinemaStudios.isLoading && table.getRowModel().rows?.length
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
            disabled={!cinemaStudios.isLoading && !table.getCanPreviousPage()}
            onClick={() => table.previousPage()}
            className="flex-items-center justify-center rounded-lg border bg-slate-50 p-2  disabled:opacity-50 dark:border-slate-700 dark:bg-slate-800"
          >
            <HiChevronLeft />
          </button>
          <button
            disabled={!cinemaStudios.isLoading && !table.getCanNextPage()}
            onClick={() => table.nextPage()}
            className="flex-items-center justify-center rounded-lg border bg-slate-50 p-2 disabled:opacity-50 dark:border-slate-700 dark:bg-slate-800"
          >
            <HiChevronRight />
          </button>
        </div>
      </AnimatedContainer>
    </div>
  )
}
