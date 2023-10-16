"use client"

import { memo, useState } from "react"
import dynamic from "next/dynamic"
import Image from "next/image"
import { useRouter, useSearchParams } from "next/navigation"
import { Movie } from "@prisma/client"
import { useQuery } from "@tanstack/react-query"
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

import { movieSorts } from "@/lib/tableSorts"
import { AnimatedContainer } from "@/components/animated-container"
import Table from "@/components/table"
import { TableDataSorter } from "@/components/table-data-sorter"
import TableRowMenu from "@/components/table-row-menu"

import { ViewCinemaMovie } from "./view-cinema-movie"

const AddCinemaMovieModal = dynamic(
  async () =>
    (await import("@/components/Admin/Movie/AddCinemaMovieModal"))
      .AddCinemaMovieModal
)

const DeleteCinemaMovieModal = dynamic(
  async () =>
    (await import("@/components/Admin/Movie/delete-cinema-movie-modal"))
      .DeleteCinemaMovieModal
)

export const MoviesTable = memo(
  ({ movies }: { movies: Movie[] }) => {
    const [sorting, setSorting] = useState<SortingState>([])
    const [pagination, setPagination] = useState({ pageSize: 3, pageIndex: 0 })
    const [selectedMovies, setSelectedMovies] = useState<string[]>([])

    const router = useRouter()
    const searchParams = useSearchParams()

    function deselectMovie(id: string) {
      const filteredMovies = selectedMovies.filter(
        (currentMovieId) => currentMovieId !== id
      )
      setSelectedMovies(filteredMovies)
    }

    const cinemaMoviesTableColumns: ColumnDef<Movie>[] = [
      {
        id: "select",
        header: ({ table }) => {
          return (
            <input
              type="checkbox"
              className="h-4 w-4 cursor-pointer accent-blue-300 dark:accent-blue-800"
              checked={
                table.getCoreRowModel().rows.length === selectedMovies.length
              }
              onChange={() =>
                table.getCoreRowModel().rows.length === selectedMovies.length
                  ? setSelectedMovies([])
                  : setSelectedMovies(
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
                checked={selectedMovies.includes(row.original.id)}
                onChange={() =>
                  selectedMovies.includes(row.original.id)
                    ? deselectMovie(row.original.id)
                    : setSelectedMovies((current) => [
                        ...current,
                        row.original.id,
                      ])
                }
              />
            </div>
          )
        },
      },
      {
        id: "id",
        accessorKey: "id",
        header: "Id",
        cell: (info) => info.getValue(),
      },
      {
        id: "image",
        accessorKey: "image_url",
        header: "Image",
        cell: (movie) => (
          <div className="flex items-center justify-center">
            <Image
              src={movie.getValue() as string}
              alt="movie-image"
              width={90}
              height={180}
              className="rounded-lg"
            />
          </div>
        ),
      },
      {
        accessorKey: "title",
        header: "Title",
        cell: (info) => info.getValue(),
      },
      {
        id: "menu",
        cell: ({ row }) => (
          <TableRowMenu>
            <TableRowMenu.Button
              onClick={() => {
                router.push(`/admin/movies?id=${row.original.id}&view=true`)
              }}
            >
              View Movie
            </TableRowMenu.Button>
          </TableRowMenu>
        ),
      },
    ]

    const table = useReactTable({
      data: movies,
      columns: cinemaMoviesTableColumns,
      state: { sorting, pagination },
      onSortingChange: setSorting,
      onPaginationChange: setPagination,
      getCoreRowModel: getCoreRowModel(),
      getSortedRowModel: getSortedRowModel(),
      getFilteredRowModel: getFilteredRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
    })

    return (
      <div className="flex flex-1 justify-center">
        <AnimatedContainer className="flex w-full flex-1 flex-col">
          <div className="my-2 flex justify-between gap-2.5">
            <div className="flex items-center gap-2">
              <input
                placeholder="Search for movie title..."
                onChange={(event) =>
                  table.getColumn("title")?.setFilterValue(event.target.value)
                }
                className="h-8 w-44 rounded-md border p-2 text-xs dark:border-slate-700 dark:bg-slate-900 lg:w-96 lg:text-sm"
              />
              <TableDataSorter table={table} sorts={movieSorts} />
            </div>
            <div className="flex w-72 items-center justify-end gap-2">
              <button
                onClick={() => router.push("/admin/movies?add=true")}
                className="rounded-lg bg-green-600 p-2 text-slate-100 transition duration-150 disabled:bg-opacity-50 dark:bg-green-800"
              >
                <HiPlus className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
              </button>
              <button
                disabled={!selectedMovies.length}
                onClick={() => router.push("/admin/movies?delete=true")}
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
                                className="px-4 py-2 text-center text-xs sm:text-sm lg:px-6  lg:py-4"
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
              className="flex-items-center justify-center rounded-lg border bg-slate-50 p-2 disabled:opacity-50 dark:border-slate-700 dark:bg-slate-800"
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
        </AnimatedContainer>
        <AnimatePresence>
          {searchParams.get("view") && <ViewCinemaMovie />}
          {searchParams.get("add") && <AddCinemaMovieModal />}
          {searchParams.get("delete") && (
            <DeleteCinemaMovieModal selectedMovies={selectedMovies} />
          )}
        </AnimatePresence>
      </div>
    )
  },
  (oldProps, newProps) => {
    return oldProps.movies.length !== newProps.movies.length
  }
)

MoviesTable.displayName = "MoviesTable"
