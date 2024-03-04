"use client"

import React, { ChangeEvent } from "react"
import { useRouter } from "next/navigation"

import { useDebounce } from "@/hooks/useDebounce"

export const CinemaSearchInput = () => {
  const router = useRouter()

  function search(event: ChangeEvent<HTMLInputElement>) {
    const newSearchParams = new URLSearchParams()
    event.target.value !== ""
      ? newSearchParams.set("search", event.target.value)
      : newSearchParams.delete("search")
    router.replace(`/app/cinemas?${newSearchParams.toString()}`)
  }

  const debouncedSearch = useDebounce(search, 500)
  return (
    <input
      type="text"
      onChange={debouncedSearch}
      className="w-full rounded-lg border bg-white p-2 text-xs focus:outline-none dark:border-slate-700 dark:bg-slate-900 lg:text-base"
      placeholder="Search cinema..."
    />
  )
}
