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
      <AnimatedContainer className="fixed top-1/2 left-1/2 z-40 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-lg bg-slate-800 p-4">
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
