import React from "react"
import { useSkeleton } from "hooks/useSkeleton"

const MovieTableRowSkeleton = () => {
  return (
    <tr>
      <td className="px-6 py-4">
        <div className="flex justify-center">
          <div className="h-6 w-6 animate-pulse rounded-lg bg-slate-300  lg:h-8 lg:w-8" />
        </div>
      </td>
      <td className="px-6 py-4">
        <div className="flex justify-center">
          <div className="h-6 w-24 animate-pulse rounded-lg bg-slate-300  lg:h-8 lg:w-32" />
        </div>
      </td>
      <td className="px-6 py-4">
        <div className="flex justify-center">
          <div className="h-20 w-14 animate-pulse rounded-lg  bg-slate-300 lg:h-[130px] lg:w-[90px]" />
        </div>
      </td>
      <td className="px-6 py-4">
        <div className="flex justify-center">
          <div className="h-6 w-20  animate-pulse rounded-lg bg-slate-300  lg:h-8 lg:w-48" />
        </div>
      </td>
      <td className="px-6 py-4">
        <div className="flex justify-center">
          <div className="h-6 w-6 animate-pulse rounded-lg bg-slate-300  lg:h-8 lg:w-8" />
        </div>
      </td>
    </tr>
  )
}

export const MoviesTableRowSkeletons = ({ table }) => {
  const skeletons = useSkeleton(<MovieTableRowSkeleton table={table} />, 3)
  return skeletons
}
