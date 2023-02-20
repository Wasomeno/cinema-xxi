import React from "react";
import { useAccount } from "wagmi";

import AnimatedContainer from "./AnimatedContainer";
import ArrowTopRight from "./Icons/ArrowTopRight";
import ClipboardDocument from "./Icons/ClipboardDocument";
import Power from "./Icons/Power";

const UserMenuModal = ({ toggleShowUserModal }) => {
  const { address } = useAccount();
  return (
    <>
      <AnimatedContainer
        onClick={() => toggleShowUserModal()}
        className="fixed left-0 bottom-0 z-30 h-screen w-screen bg-black bg-opacity-70"
      />
      <AnimatedContainer className="fixed bottom-0 z-30 h-80 w-full rounded-t-lg bg-slate-800 p-4 md:top-12 md:right-5 md:h-96 md:w-80 md:rounded-lg">
        <div className="flex items-center justify-between">
          <div className="flex w-5/12 items-center justify-evenly md:w-3/6">
            <div className="h-8 w-8 rounded-full border-2 bg-blue-400" />
            <p className="font-poppins text-sm font-medium tracking-wider text-slate-50">
              {address.slice(0, 4)}...
              {address.slice(-4, -1) + address.slice(-1)}
            </p>
          </div>
          <div className="flex w-2/6 items-center justify-end gap-2 md:w-3/6">
            <div className="rounded-xl bg-slate-700 p-2">
              <ClipboardDocument />
            </div>
            <div className="rounded-xl bg-slate-700 p-2">
              <ArrowTopRight />
            </div>
            <div className="rounded-xl bg-slate-700 p-2">
              <Power />
            </div>
          </div>
        </div>
      </AnimatedContainer>
    </>
  );
};

export default UserMenuModal;
