import { useEffect } from "react"
import { HiCheckCircle } from "react-icons/hi2"

export function WalletSuccess({ toggle }: { toggle: () => void }) {
  useEffect(() => {
    const walletTimeout = setTimeout(toggle, 1500)
    return () => clearTimeout(walletTimeout)
  }, [])

  return (
    <div className="flex h-full flex-col items-center justify-center gap-4">
      <div className="p-2">
        <p className="font-poppins text-sm">Wallet Connected</p>
      </div>
      <div>
        <HiCheckCircle size="40" className="text-green-600" />
      </div>
    </div>
  )
}
