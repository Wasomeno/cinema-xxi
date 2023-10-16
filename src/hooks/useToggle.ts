"use client"

import { useState } from "react"

export function useToggle(condition: boolean): [boolean, () => void] {
  const [state, setState] = useState(condition)

  const toggleState = () => {
    setState((current) => !current)
  }

  return [state, toggleState]
}
