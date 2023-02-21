import React from "react";
import { useConnect } from "wagmi";

import AnimatedContainer from "./AnimatedContainer";

const ConnectWalletModal = ({ toggleWalletModal }) => {
  const { connect, connectors } = useConnect();
  return (
    <>
      <AnimatedContainer
        className="fixed left-0 bottom-0 z-30 h-screen w-screen bg-black bg-opacity-70"
        onClick={() => toggleWalletModal()}
      />
      <AnimatedContainer className="fixed bottom-0 z-40 h-72 w-full rounded-lg bg-slate-800 p-4 lg:top-1/2 lg:left-1/2 lg:h-80 lg:w-80 lg:-translate-x-1/2 lg:-translate-y-1/2">
        <div className="my-2">
          <p className="font-poppins text-sm text-white">Connect a Wallet</p>
        </div>
        <div className="my-2 flex flex-col gap-4">
          {connectors.map((connector, index) => (
            <button
              key={index}
              onClick={() => connect({ connector: connector, chainId: 5 })}
              className="font-poppins w-full rounded-lg bg-slate-700 p-3 text-sm tracking-wide text-white"
            >
              Metamask Wallet
            </button>
          ))}
        </div>
      </AnimatedContainer>
    </>
  );
};

export default ConnectWalletModal;
