import { useEffect } from "react"
import { HiXMark } from "react-icons/hi2"

type WalletErrorProps = {
  message?: string
  toggle: () => void
}

export const WalletError = ({ message, toggle }: WalletErrorProps) => {
  useEffect(() => {
    const walletTimeout = setTimeout(() => toggle, 1500)
    return () => clearTimeout(walletTimeout)
  }, [])

  return (
    <div className="flex h-full flex-col items-center justify-center gap-4">
      <div className="p-2">
        <p className="font-poppins text-sm">Error Connecting your Wallet</p>
      </div>
      <div role="status">
        <HiXMark size="22" className="text-red-600" />
      </div>
      <div className="text-center">
        <p className="font-poppins text-sm">{message}</p>
      </div>
    </div>
  )
}
