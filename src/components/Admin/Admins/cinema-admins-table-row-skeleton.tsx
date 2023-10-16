import React from "react"

import { useSkeleton } from "@/hooks/useSkeleton"

const CinemaAdminsTableRowSkeleton = () => {
  return (
    <tr>
      <td className="px-6 py-4">
        <div className="flex justify-center">
          <div className="h-6 w-6 animate-pulse rounded-lg bg-slate-300  lg:h-8 lg:w-8" />
        </div>
      </td>
      <td className="px-6 py-4">
        <div className="flex justify-center">
          <div className="h-6 w-6 animate-pulse rounded-lg bg-slate-300  lg:h-8 lg:w-8" />
        </div>
      </td>
      <td className="px-6 py-4">
        <div className="flex justify-center">
          <div className="h-6 w-24 animate-pulse rounded-lg  bg-slate-300 lg:h-8 lg:w-32" />
        </div>
      </td>
      <td className="px-6 py-4">
        <div className="flex justify-center">
          <div className="h-6 w-24  animate-pulse rounded-lg bg-slate-300  lg:h-8 lg:w-32" />
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

export const CinemaAdminsTableRowSkeletons = () => {
  const skeletons = useSkeleton(<CinemaAdminsTableRowSkeleton />, 3)
  return skeletons
}
