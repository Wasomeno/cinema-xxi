import React from "react";

import AnimatedContainer from "../AnimatedContainer";
import WalletStatusComponent from "./WalletStatusComponent";

export const ConnectWalletModal = ({ toggleWalletModal }) => {
  return (
    <>
      <AnimatedContainer
        className="fixed left-0 bottom-0 z-30 h-screen w-screen bg-black bg-opacity-70"
        onClick={toggleWalletModal}
      />
      <AnimatedContainer className="fixed bottom-0 z-40 h-72 w-full rounded-t-lg bg-slate-800 p-4 lg:top-1/2 lg:left-1/2 lg:h-80 lg:w-80 lg:-translate-x-1/2 lg:-translate-y-1/2 lg:rounded-lg">
        <WalletStatusComponent toggleWalletModal={toggleWalletModal} />
      </AnimatedContainer>
    </>
  );
};
