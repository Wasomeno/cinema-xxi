import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useSkeleton } from "hooks/useSkeleton";
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
import { twMerge } from "tailwind-merge";

import AnimatedContainer from "@/components/AnimatedContainer";
import { query } from "@/components/reactQuery/queries/query";
import { cinemaStudioQueryKeys } from "@/components/reactQuery/queries/queryKeys/cinemaStudioQueryKeys";

export const StudioTable = ({
  tableToolbar,
  rowMenu,
  setSelectedStudios,
  selectedStudios,
}) => {
  const [sorting, setSorting] = useState();
  const session = useSession();
  const router = useRouter();
  const cinemaStudios = query({
    queryKey: cinemaStudioQueryKeys.allStudio,
    url: "/api/cinemas/" + session.data?.user.cinemaId + "/studios",
    enabledCondition: session.data !== undefined,
  });

  const cinemaStudioTableColumns = [
    {
      id: "select",
      header: ({ table }) => {
        return (
          <input
            type="checkbox"
            className="h-4 w-4 cursor-pointer accent-blue-300 dark:accent-gray-300"
            checked={
              !cinemaStudios.isLoading &&
              table.getCoreRowModel().rows.length === selectedStudios.length
            }
            onChange={() =>
              table.getCoreRowModel().rows.length === selectedStudios.length
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
                !cinemaStudios.isLoading &&
                selectedStudios.includes(row.original.id)
              }
              onChange={() =>
                selectedStudios.includes(row.original.id)
                  ? deselectMovie(row.original.id)
                  : selectMovie(row.original.id)
              }
            />
          </div>
        );
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
  ];

  const table = useReactTable({
    data: cinemaStudios.data,
    columns: cinemaStudioTableColumns,
    state: { sorting, pagination: { pageSize: 10, pageIndex: 0 } },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const rowSkeletons = useSkeleton(
    <tr>
      {table.getAllColumns().map((column, index) => (
        <td key={index}>
          <div className="flex justify-center px-6 py-4">
            <span
              className={twMerge(
                "h-6 animate-pulse rounded-lg bg-slate-300 lg:h-8",
                column.id === "select" ||
                  column.id === "menu" ||
                  column.id === "id"
                  ? "w-6 lg:w-8"
                  : "w-24 lg:w-28 "
              )}
            />
          </div>
        </td>
      ))}
    </tr>,
    5
  );

  return (
    <div className="flex justify-center">
      <AnimatedContainer className="w-full">
        <div className="my-2 flex justify-between gap-2.5">
          <div className="flex items-center gap-2">
            <input
              type="number"
              placeholder="Search for studio number"
              onChange={(event) =>
                table.getColumn("studio").setFilterValue(event.target.value)
              }
              className="h-8 w-44 rounded-md border p-2 text-xs lg:w-96 lg:text-sm"
            />
          </div>
          <div className="flex w-72 items-center justify-end gap-2">
            <button
              onClick={() => router.push("/admin/studios?add=true")}
              className="rounded-lg bg-green-600 p-2 text-slate-100 transition duration-150 disabled:bg-opacity-50"
            >
              <HiPlus className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
            </button>
            <button
              onClick={() => router.push("/admin/studios?delete=true")}
              disabled={!selectedStudios.length}
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
              {cinemaStudios.isLoading &&
                rowSkeletons.map((skeleton) => skeleton)}
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
            disabled={!cinemaStudios.isLoading && !table.getCanPreviousPage()}
            onClick={() => table.previousPage()}
            className="p-2 rounded-lg disabled:opacity-50 flex-items-center justify-center bg-slate-50 border"
          >
            <HiChevronLeft />
          </button>
          <button
            disabled={!cinemaStudios.isLoading && !table.getCanNextPage()}
            onClick={() => table.nextPage()}
            className="p-2 rounded-lg disabled:opacity-50 flex-items-center justify-center bg-slate-50 border"
          >
            <HiChevronRight />
          </button>
        </div>
      </AnimatedContainer>
    </div>
  );
};
