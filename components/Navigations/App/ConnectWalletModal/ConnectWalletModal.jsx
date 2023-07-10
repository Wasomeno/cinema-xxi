import React from "react";
import { useConnect } from "wagmi";

import AnimatedContainer from "@/components/AnimatedContainer";
import { ModalContainer } from "@/components/ModalContainer";

import {
  WalletError,
  WalletIdle,
  WalletLoading,
  WalletSuccess,
} from "./WalletStatusComponents";

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
    <ModalContainer closeModal={toggleWalletModal}>
      <AnimatedContainer className="fixed bottom-0 z-40 flex h-72 w-full flex-col items-center gap-2 rounded-t-lg bg-slate-50 p-4 dark:bg-slate-800 lg:left-1/2 lg:top-1/2 lg:h-80 lg:w-80 lg:-translate-x-1/2 lg:-translate-y-1/2 lg:rounded-lg">
        <div className="h-5/6 w-full">
          <WalletStatusComponent
            connectors={connectors}
            connect={connect}
            error={error}
            toggleWalletModal={toggleWalletModal}
          />
        </div>
      </AnimatedContainer>
    </ModalContainer>
  );
};
