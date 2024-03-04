"use client"

import { useEffect, useRef } from "react"

export function useDebounce(fn: Function, miliseconds: number) {
  const searchTimeoutRef = useRef<NodeJS.Timeout>()

  function debounced() {
    searchTimeoutRef.current = setTimeout(() => fn, miliseconds)
  }
  useEffect(() => {
    return () => clearTimeout(searchTimeoutRef.current)
  }, [])

  return debounced
}
