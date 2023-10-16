"use client"

import { ReactNode } from "react"

export function ManagerHeader({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-center justify-start">
      <div className="space-y-1">
        <h1 className="font-poppins text-sm font-medium lg:text-xl">
          {children}
        </h1>
      </div>
    </div>
  )
}
