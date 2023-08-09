import { HiCheckCircle } from "react-icons/hi"
import { RiErrorWarningFill } from "react-icons/ri"
import { create } from "zustand"

const toastStore = create((set) => ({
  show: false,
  text: "",
  icon: <></>,
  default: (text, icon) => {
    set(() => ({ show: true, text: text, icon: icon ?? <></> }))
    setTimeout(() => set(() => ({ show: false })), 2500)
  },
  success: (text, icon) => {
    set(() => ({
      show: true,
      text: text,
      icon: icon ?? <HiCheckCircle className="text-green-600" />,
    }))
    setTimeout(() => set(() => ({ show: false })), 2500)
  },
  error: (text, icon) => {
    set(() => ({
      show: true,
      text: text,
      icon: icon ?? <RiErrorWarningFill className="text-red-600" />,
    }))
    setTimeout(() => set(() => ({ show: false })), 2500)
  },
}))

export const useToast = () => {
  const toast = toastStore((state) => state.default)
  toast.success = toastStore((state) => state.success)
  toast.error = toastStore((state) => state.error)
  return toast
}

export const useToastDetails = () => {
  const show = toastStore((state) => state.show)
  const text = toastStore((state) => state.text)
  const icon = toastStore((state) => state.icon)
  return { show, text, icon }
}
