import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import Image from "next/image";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { BsXCircleFill } from "react-icons/bs";
import {
  HiChevronLeft,
  HiChevronRight,
  HiPlus,
  HiTrash,
} from "react-icons/hi2";

import AnimatedContainer from "@/components/AnimatedContainer";
import { query } from "@/components/reactQuery/queries/query";
import { cinemaQueryKeys } from "@/components/reactQuery/queries/queryKeys/cinemaQueryKeys";

import { MoviesTableRowSkeletons } from "./MoviesTableRowSkeletons";
import { MoviesTableSorter } from "./MoviesTableSorter";

export const MoviesTable = ({ rowMenu, setSelectedMovies, selectedMovies }) => {
  const [sorting, setSorting] = useState();

  const { data: sessionData } = useSession();

  const router = useRouter();

  const cinemaMovies = query({
    queryKey: cinemaQueryKeys.cinemaMovies(sessionData?.user.cinemaId),
    url: "/api/cinemas/" + sessionData?.user.cinemaId + "/movies",
    enabledCondition: sessionData?.user.cinemaId !== undefined,
  });

  function selectAllMovie(movieIds) {
    !cinemaMovies.isLoading && setSelectedMovies(movieIds);
  }

  function deselectAllMovies() {
    !cinemaMovies.isLoading && setSelectedMovies([]);
  }

  function selectMovie(movieId) {
    !cinemaMovies.isLoading &&
      setSelectedMovies((current) => [...current, movieId]);
  }

  function deselectMovie(movieId) {
    const filteredMovies = selectedMovies.filter(
      (currentMovieId) => currentMovieId !== movieId
    );
    !cinemaMovies.isLoading && setSelectedMovies(filteredMovies);
  }

  const cinemaMoviesTableColumns = [
    {
      id: "select",
      header: ({ table }) => {
        return (
          <input
            type="checkbox"
            className="h-4 w-4 cursor-pointer accent-blue-300 dark:accent-gray-300"
            checked={
              !cinemaMovies.isLoading &&
              table.getCoreRowModel().rows.length === selectedMovies.length
            }
            onChange={() =>
              table.getCoreRowModel().rows.length === selectedMovies.length
                ? deselectAllMovies()
                : selectAllMovie(
                    table.getCoreRowModel().rows.map((row) => row.original.id)
                  )
            }
          />
        );
      },
      cell: ({ row }) => {
        return (
          <div className="px-1">
            <input
              type="checkbox"
              className="h-4 w-4 cursor-pointer rounded-md accent-blue-300 dark:accent-gray-300"
              checked={
                !cinemaMovies.isLoading &&
                selectedMovies.includes(row.original.id)
              }
              onChange={() =>
                selectedMovies.includes(row.original.id)
                  ? deselectMovie(row.original.id)
                  : selectMovie(row.original.id)
              }
            />
          </div>
        );
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
      cell: (info) => (
        <div className="flex items-center justify-center">
          <Image
            src={info.getValue()}
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
      cell: ({ row }) => rowMenu(row.original.id),
    },
  ];

  const table = useReactTable({
    data: cinemaMovies.data,
    columns: cinemaMoviesTableColumns,
    state: { sorting, pagination: { pageSize: 3, pageIndex: 0 } },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <AnimatedContainer className="mt-2 w-full">
      <div className="my-2 flex justify-between gap-2.5">
        <div className="flex items-center gap-2">
          <input
            placeholder="Search for movie title..."
            onChange={(event) =>
              table.getColumn("title")?.setFilterValue(event.target.value)
            }
            className="h-8 w-44 rounded-md border p-2 text-xs lg:w-96 lg:text-sm"
          />
          <MoviesTableSorter table={table} />
        </div>
        <div className="flex w-72 items-center justify-end gap-2">
          <button
            onClick={() => router.push("/admin/movies?add=true")}
            className="rounded-lg bg-green-600 p-2 text-slate-100 transition duration-150 disabled:bg-opacity-50"
          >
            <HiPlus className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
          </button>
          <button
            onClick={() => router.push("/admin/movies?delete=true")}
            disabled={!selectedMovies.length}
            className="rounded-lg bg-red-600 p-2 text-sm text-slate-100 transition duration-150 disabled:bg-opacity-50"
          >
            <HiTrash className="h-3 w-3 sm:h-4 sm:w-4 lg:h-3.5 lg:w-3.5" />
          </button>
        </div>
      </div>
      <div className="overflow-x-scroll rounded-lg">
        <table className="w-full border-collapse border border-slate-200 bg-slate-50 text-left text-sm text-gray-500 shadow-md dark:border-slate-400 dark:bg-slate-600 dark:text-slate-100">
          <thead className="bg-blue-100 dark:bg-slate-500">
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
                  );
                })}
              </tr>
            ))}
          </thead>
          <tbody className="relative divide-y divide-slate-200 border-t border-slate-200 dark:divide-slate-400 dark:border-slate-400">
            {cinemaMovies.isLoading && (
              <MoviesTableRowSkeletons table={table} />
            )}
            {!cinemaMovies.isLoading && !table.getRowModel().rows?.length && (
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

            {!cinemaMovies.isLoading && table.getRowModel().rows?.length
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
                        );
                      })}
                    </tr>
                  );
                })
              : null}
          </tbody>
        </table>
      </div>
      <div className="flex mt-4 items-center gap-4">
        <button
          disabled={!cinemaMovies.isLoading && !table.getCanPreviousPage()}
          onClick={() => table.previousPage()}
          className="p-2 rounded-lg disabled:opacity-50 flex-items-center justify-center bg-slate-50 border"
        >
          <HiChevronLeft />
        </button>
        <button
          disabled={!cinemaMovies.isLoading && !table.getCanNextPage()}
          onClick={() => console.log(table.nextPage)}
          className="p-2 rounded-lg disabled:opacity-50 flex-items-center justify-center bg-slate-50 border"
        >
          <HiChevronRight />
        </button>
      </div>
    </AnimatedContainer>
  );
};
