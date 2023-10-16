"use client"

import React from "react"
import { HiCheckCircle } from "react-icons/hi2"
import { RiErrorWarningFill } from "react-icons/ri"
import { create } from "zustand"

type Toast = {
  show: boolean
  text?: string
  icon?: React.JSX.Element
  setShow: (show: boolean) => void
  default: (text: string, icon?: React.JSX.Element) => void
  success: (text: string, icon?: React.JSX.Element) => void
  error: (text: string, icon?: React.JSX.Element) => void
}

const toastStore = create<Toast>()((set) => ({
  show: false,
  setShow: (show) => set((state) => ({ ...state, show })),
  default: (text, icon) =>
    set((state) => ({
      ...state,
      show: true,
      text: text,
      icon: icon ?? <HiCheckCircle />,
    })),
  success: (text, icon) =>
    set((state) => ({
      ...state,
      show: true,
      text: text,
      icon: icon ?? <HiCheckCircle className="text-green-600" />,
    })),
  error: (text, icon) =>
    set((state) => ({
      ...state,
      show: true,
      text: text,
      icon: icon ?? <RiErrorWarningFill className="text-red-600" />,
    })),
}))

export const useToast = () => {
  const { success, error, default: toastDefault } = toastStore((state) => state)
  return { success, error, default: toastDefault }
}

export const useToastDetails = () => {
  const { text, show, icon, setShow } = toastStore((state) => state)
  return { show, text, icon, setShow }
}
