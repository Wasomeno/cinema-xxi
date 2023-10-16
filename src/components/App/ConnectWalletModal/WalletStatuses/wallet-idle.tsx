import Image from "next/image"
import { ConnectArgs } from "@wagmi/core"
import { Connector } from "wagmi"

type WalletIdleProps = {
  connectors: Connector<any, any>[]
  connect: (args?: Partial<ConnectArgs> | undefined) => void
}

export function WalletIdle({ connectors, connect }: WalletIdleProps) {
  return (
    <>
      <div className="mb-4">
        <h3 className="font-poppins text-sm font-medium">Connect a Wallet</h3>
      </div>
      <div className="my-2 flex flex-col gap-4">
        {connectors.map((connector, index) => (
          <button
            key={index}
            onClick={() => {
              connect({ connector: connector, chainId: 11155111 })
              localStorage.setItem("isMetamaskConnected", JSON.stringify(true))
            }}
            className="flex w-full items-center justify-center gap-4 rounded-lg border bg-slate-100 p-3 text-sm font-medium shadow-sm transition duration-200 hover:bg-opacity-50 dark:border-slate-600 dark:bg-slate-700"
          >
            <Image
              src="/images/metamask.svg"
              alt="metamask-icon"
              height={20}
              width={20}
            />
            Metamask Wallet
          </button>
        ))}
      </div>
    </>
  )
}
