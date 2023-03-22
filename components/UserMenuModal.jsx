import React from "react";
import { useToast } from "store/stores";
import { useAccount, useBalance, useDisconnect } from "wagmi";

import AnimatedContainer from "./AnimatedContainer";
import ArrowTopRight from "./Icons/ArrowTopRight";
import ChevronRight from "./Icons/ChevronRight";
import ClipboardDocument from "./Icons/ClipboardDocument";
import Power from "./Icons/Power";

const UserMenuModal = ({ toggleShowUserModal }) => {
  const [toastSuccess, toastError] = useToast();
  const { address, isDisconnected } = useAccount();
  const { data: walletBalance } = useBalance({ address: address });
  const { disconnect } = useDisconnect();

  function openEtherScan() {
    window
      .open("https://sepolia.etherscan.io/address/" + address, "_blank")
      .focus();
  }

  function copyAddress() {
    navigator.clipboard.writeText(address);
    toastSuccess("Address Copied");
  }

  function disconnectWallet() {
    toggleShowUserModal();
    disconnect();
    toastError("Wallet Disconnected");
  }

  if (isDisconnected) return;
  return (
    <>
      <AnimatedContainer
        onClick={toggleShowUserModal}
        className="z-15 fixed left-0 bottom-0 h-screen w-screen bg-black bg-opacity-70"
      />
      <AnimatedContainer className="fixed bottom-0 z-20 flex h-80 w-full flex-col gap-4 rounded-t-lg bg-slate-800 p-4 md:top-12 md:right-5 md:h-96 md:w-80 md:rounded-lg">
        <div className="mx-auto h-1 w-2/6 rounded-full bg-slate-400 bg-opacity-25" />
        <div className="flex w-full items-center justify-between">
          <div className="flex w-5/12 items-center justify-evenly md:w-3/6">
            <div className="h-8 w-8 rounded-full border-2 bg-blue-400" />
            <p className="font-poppins text-sm font-medium tracking-wider text-slate-50">
              {address.slice(0, 4)}...
              {address.slice(-4, -1) + address.slice(-1)}
            </p>
          </div>
          <div className="flex w-2/6 items-center justify-end gap-2 md:w-3/6">
            <button
              onClick={copyAddress}
              className="rounded-xl bg-slate-700 p-2"
            >
              <ClipboardDocument />
            </button>
            <button
              onClick={openEtherScan}
              className="rounded-xl bg-slate-700 p-2"
            >
              <ArrowTopRight />
            </button>
            <button
              onClick={disconnectWallet}
              className="rounded-xl bg-slate-700 p-2"
            >
              <Power />
            </button>
          </div>
        </div>
        <div className="flex flex-col items-center gap-2">
          <span className="font-poppins text-sm text-white">ETH Balance</span>
          <span className="font-poppins text-2xl tracking-wider text-white">
            {walletBalance?.formatted.slice(0, 4)} ETH
          </span>
        </div>
        <div className="flex flex-col items-start gap-2">
          <button className="flex w-full justify-between rounded-md bg-slate-700 bg-opacity-25 p-3 font-poppins text-sm text-white first-letter:items-center">
            <span>Transactions</span>
            <ChevronRight color="white" size="4" />
          </button>
          <button className="flex w-full rounded-md bg-slate-700 bg-opacity-25 p-3 font-poppins text-sm text-white">
            <span>Theme</span>
          </button>
        </div>
      </AnimatedContainer>
    </>
  );
};

export default UserMenuModal;
