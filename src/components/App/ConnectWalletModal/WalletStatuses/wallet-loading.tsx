import { Spinner } from "@/components/spinner"

export function WalletLoading() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-4">
      <div className="p-2">
        <p className="font-poppins text-sm">Connecting your Wallet...</p>
      </div>
      <Spinner />
      <div>
        <p className="font-poppins text-sm">Click accept in your wallet</p>
      </div>
    </div>
  )
}
