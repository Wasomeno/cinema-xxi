import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useEffect, useMemo } from "react";
import { BsXCircleFill } from "react-icons/bs";
import { HiPlus, HiTrash } from "react-icons/hi2";
import { twMerge } from "tailwind-merge";

const DataSection = ({ children }) => {
  return <div>{children}</div>;
};

const Table = ({
  columns,
  data,
  dataStatus,
  selectedRow,
  setSelectedRow,
  setSelectedData,
  rowMenu,
}) => {
  const isLoading = dataStatus === "loading";
  const isDataExists = data?.length;

  const memoedColumns = useMemo(
    () => [
      {
        id: "select",
        header: ({ table }) => (
          <input
            type="checkbox"
            className="h-4 w-4 cursor-pointer accent-blue-300 dark:accent-gray-300"
            {...{
              checked:
                dataStatus !== "loading" ? table.getIsAllRowsSelected() : null,
              indeterminate: table.getIsSomeRowsSelected(),
              onChange: table.getToggleAllRowsSelectedHandler(),
            }}
          />
        ),
        cell: ({ row }) => (
          <div className="px-1">
            <input
              type="checkbox"
              className="h-4 w-4 cursor-pointer rounded-md accent-blue-300 dark:accent-gray-300"
              {...{
                checked: row.getIsSelected(),
                disabled: !row.getCanSelect(),
                indeterminate: row.getIsSomeSelected(),
                onChange: row.getToggleSelectedHandler(),
              }}
            />
          </div>
        ),
      },
      ...columns,
      {
        id: "menu",
        cell: ({ row }) => rowMenu(row),
      },
    ],
    [dataStatus]
  );

  const table = useReactTable({
    data,
    columns: memoedColumns,
    state: {
      pagination: { pageSize: 3, pageIndex: 0 },
      rowSelection: selectedRow,
    },
    getPaginationRowModel: getPaginationRowModel(),
    enableRowSelection: true,
    onRowSelectionChange: setSelectedRow,
    getCoreRowModel: getCoreRowModel(),
  });

  useEffect(() => {
    if (dataStatus !== "loading" && setSelectedData) {
      setSelectedData(
        table.getSelectedRowModel().flatRows.map((row) => row.original)
      );
    }
  }, [selectedRow]);

  return (
    <div className="overflow-x-scroll rounded-lg">
      <table className="w-full border-collapse border border-slate-200 bg-slate-50 text-left text-sm text-gray-500 shadow-md dark:border-slate-400 dark:bg-slate-600 dark:text-slate-100">
        <thead className="bg-blue-200 dark:bg-slate-500">
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
          {isLoading &&
            Array("dummy", "dummy", "dummy", "dummy", "dummy").map(
              (value, index) => (
                <tr key={index}>
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
                </tr>
              )
            )}

          {!isLoading && !isDataExists && (
            <tr>
              <td colSpan="10">
                <div className="flex h-96 flex-col items-center justify-center gap-2 bg-slate-50">
                  <span className="font-poppins text-xs tracking-wider text-slate-400 lg:text-sm">
                    No Data
                  </span>
                  <BsXCircleFill size="30" className="text-slate-400" />
                </div>
              </td>
            </tr>
          )}

          {!isLoading && isDataExists
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
  );
};

const Toolbar = ({ children }) => {
  return (
    <div className="my-2 flex items-center justify-end gap-2">{children}</div>
  );
};

Toolbar.AddButton = function AddButton({ ...props }) {
  return (
    <button
      {...props}
      className="rounded-lg bg-green-600 p-2 text-slate-100 transition duration-150 disabled:bg-opacity-50"
    >
      <HiPlus className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
    </button>
  );
};

Toolbar.DeleteButton = function DeleteButton({ ...props }) {
  return (
    <button
      {...props}
      className="rounded-lg bg-red-600 p-2 text-sm text-slate-100 transition duration-150 disabled:bg-opacity-50"
    >
      <HiTrash className="h-3 w-3 sm:h-4 sm:w-4 lg:h-3.5 lg:w-3.5" />
    </button>
  );
};

DataSection.Table = Table;
DataSection.Toolbar = Toolbar;

export default DataSection;
