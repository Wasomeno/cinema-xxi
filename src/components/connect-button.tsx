import Image from "next/image"
import { ConnectButton } from "@rainbow-me/rainbowkit"

import { Button } from "./ui/button"

export const CustomConnectButton = () => {
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        authenticationStatus,
        mounted,
        openConnectModal,
        openAccountModal,
        openChainModal,
      }) => {
        const ready = mounted && authenticationStatus !== "loading"
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus || authenticationStatus === "authenticated")

        if (!connected) {
          return <Button onClick={openConnectModal}>Connect Wallet</Button>
        }

        return (
          <div className="flex items-center gap-2">
            <Button
              type="button"
              className="bg-gray-200"
              onClick={openChainModal}
            >
              {chain.iconUrl && (
                <Image
                  src={chain.iconUrl}
                  width={20}
                  height={20}
                  alt={chain.name ?? "network-icon"}
                />
              )}
            </Button>
            <Button
              type="button"
              className="bg-gray-200"
              onClick={openAccountModal}
            >
              {account.displayName}
            </Button>
          </div>
        )
      }}
    </ConnectButton.Custom>
  )
}
