import React from "react";
import { useConnect } from "wagmi";

import AnimatedContainer from "../AnimatedContainer";
import { WalletError } from "./WalletStatusComponent/WalletError";
import { WalletIdle } from "./WalletStatusComponent/WalletIdle";
import { WalletLoading } from "./WalletStatusComponent/WalletLoading";
import { WalletSuccess } from "./WalletStatusComponent/WalletSuccess";

export const ConnectWalletModal = ({ toggleWalletModal }) => {
  const { connect, connectors, status, error } = useConnect();
  const walletComponents = {
    loading: WalletLoading,
    error: WalletError,
    success: WalletSuccess,
    idle: WalletIdle,
  };
  const WalletStatusComponent = walletComponents[status];
  return (
    <>
      <AnimatedContainer
        className="fixed left-0 bottom-0 z-30 h-screen w-screen bg-black bg-opacity-70"
        onClick={toggleWalletModal}
      />
      <AnimatedContainer className="fixed bottom-0 z-40 h-72 w-full rounded-t-lg bg-slate-800 p-4 lg:top-1/2 lg:left-1/2 lg:h-80 lg:w-80 lg:-translate-x-1/2 lg:-translate-y-1/2 lg:rounded-lg">
        <div className="h-1 w-2/6 rounded-full bg-slate-600 bg-opacity-25" />
        <WalletStatusComponent
          connectors={connectors}
          connect={connect}
          error={error}
          toggleWalletModal={toggleWalletModal}
        />
      </AnimatedContainer>
    </>
  );
};
