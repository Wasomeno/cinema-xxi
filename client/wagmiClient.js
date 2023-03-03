import { configureChains, createClient } from "wagmi";
import { sepolia } from "wagmi/chains";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { infuraProvider } from "wagmi/providers/infura";

const { chains, provider, webSocketProvider } = configureChains(
  [sepolia],
  [infuraProvider({ apiKey: "239a35b98b9e45589ca4138f9225fdba" })]
);

const client = createClient({
  autoConnect: true,
  connectors: [new MetaMaskConnector({ chains })],
  provider,
  webSocketProvider,
});

export default client;
