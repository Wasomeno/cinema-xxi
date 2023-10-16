import { HiChevronLeft, HiChevronRight, HiPlus, HiTrash } from "react-icons/hi2"

import { movieSorts } from "@/lib/tableSorts"
import { MovieTableRowSkeletons } from "@/components/Admin/Movie/movie-table-row-skeleton"
import { AdminHeader } from "@/components/Headers/admin-header"
import Table from "@/components/table"
import { TableDataSorter } from "@/components/table-data-sorter"

export default function CinemaMoviesLoading() {
  return (
    <div className="flex w-full flex-1 flex-col rounded-lg p-4">
      <AdminHeader>Movies</AdminHeader>
      <div className="flex flex-1 justify-center">
        <div className="flex w-full flex-1 flex-col">
          <div className="my-2 flex justify-between gap-2.5">
            <div className="flex items-center gap-2">
              <input
                placeholder="Search for movie title..."
                className="h-8 w-44 rounded-md border p-2 text-xs dark:border-slate-700 dark:bg-slate-900 lg:w-96 lg:text-sm"
              />
              <TableDataSorter disabled sorts={movieSorts} />
            </div>
            <div className="flex w-72 items-center justify-end gap-2">
              <button className="rounded-lg bg-green-600 p-2 text-slate-100 transition duration-150 disabled:bg-opacity-50 dark:bg-green-800">
                <HiPlus className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
              </button>
              <button
                disabled
                className="rounded-lg bg-red-600 p-2 text-sm text-slate-100 transition duration-150 disabled:opacity-50 dark:bg-red-800 dark:disabled:opacity-50"
              >
                <HiTrash className="h-3 w-3 sm:h-4 sm:w-4 lg:h-3.5 lg:w-3.5" />
              </button>
            </div>
          </div>
          <div className="flex flex-1 flex-col overflow-x-scroll rounded-lg  border border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-800">
            <Table>
              <Table.Head>
                <tr>
                  <th className="px-6 py-4 text-center font-medium text-gray-900 dark:text-slate-100">
                    <div className="font-poppins text-xs tracking-wider sm:text-sm">
                      <input
                        type="checkbox"
                        className="h-4 w-4 cursor-pointer accent-blue-300 dark:accent-blue-800"
                      />
                    </div>
                  </th>
                  <th className="px-6 py-4 text-center font-medium text-gray-900 dark:text-slate-100">
                    <div className="font-poppins text-xs tracking-wider sm:text-sm">
                      Id
                    </div>
                  </th>
                  <th className="px-6 py-4 text-center font-medium text-gray-900 dark:text-slate-100">
                    <div className="font-poppins text-xs tracking-wider sm:text-sm">
                      Image
                    </div>
                  </th>
                  <th className="px-6 py-4 text-center font-medium text-gray-900 dark:text-slate-100">
                    <div className="font-poppins text-xs tracking-wider sm:text-sm">
                      Title
                    </div>
                  </th>
                  <th className="px-6 py-4 text-center font-medium text-gray-900 dark:text-slate-100">
                    <div className="font-poppins text-xs tracking-wider sm:text-sm"></div>
                  </th>
                </tr>
              </Table.Head>
              <Table.Body>
                <MovieTableRowSkeletons />
              </Table.Body>
            </Table>
          </div>
          <div className="mt-4 flex items-center gap-4">
            <button
              disabled
              className="flex-items-center justify-center rounded-lg border bg-slate-50 p-2 disabled:opacity-50 dark:border-slate-700 dark:bg-slate-800"
            >
              <HiChevronLeft />
            </button>
            <button
              disabled
              className="flex-items-center justify-center rounded-lg border bg-slate-50 p-2 disabled:opacity-50 dark:border-slate-700 dark:bg-slate-800"
            >
              <HiChevronRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
