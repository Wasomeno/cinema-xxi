import { useSkeleton } from "hooks/useSkeleton";
import React from "react";
import { twMerge } from "tailwind-merge";

const MoviesTableRowSkeleton = ({ table }) => {
  return (
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
    </tr>
  );
};

export const MoviesTableRowSkeletons = ({ table }) => {
  const Skeletons = useSkeleton(<MoviesTableRowSkeleton table={table} />, 5);
  return Skeletons;
};
