import { configureChains, createConfig } from "wagmi"
import { sepolia } from "wagmi/chains"
import { MetaMaskConnector } from "wagmi/connectors/metaMask"
import { infuraProvider } from "wagmi/providers/infura"
import { publicProvider } from "wagmi/providers/public"

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [sepolia],
  [
    infuraProvider({ apiKey: "239a35b98b9e45589ca4138f9225fdba" }),
    publicProvider(),
  ]
)

export const wagmiConfig = createConfig({
  connectors: [new MetaMaskConnector({ chains })],
  publicClient,
  webSocketPublicClient,
})
