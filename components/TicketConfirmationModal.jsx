import React from "react";

import AnimatedContainer from "./AnimatedContainer";

const TicketConfirmationModal = ({ toggleShowConfirmationModal }) => {
  return (
    <>
      <AnimatedContainer
        className="fixed left-0 bottom-0 z-30 h-screen w-screen bg-black bg-opacity-70"
        onClick={() => toggleShowConfirmationModal()}
      />
      <AnimatedContainer className="fixed bottom-0 z-40 h-4/6 w-full rounded-t-lg bg-slate-800 p-4 text-slate-50 md:top-1/2 md:left-1/2 md:h-4/6 md:w-3/12 md:-translate-x-1/2 md:-translate-y-1/2 md:rounded-lg">
        <div className="flex h-full flex-col gap-4">
          <div className="my-2">
            <h5 className="font-poppins text-sm font-medium">Order Details</h5>
          </div>
          <div className="flex h-2/6 items-center justify-between">
            <div className="h-full w-4/12">
              <div className="h-full w-full rounded-lg bg-slate-300" />
            </div>
            <div className="flex w-7/12 flex-col gap-2">
              <h5 className="font-poppins text-sm font-medium">Movie Title</h5>
              <p className="font-poppins text-xs">Cinema, Studio</p>
              <p className="font-poppins text-xs">Friday, 03 Feb 2023, 03.05</p>
            </div>
          </div>
          <div className="h-2/6">
            <div className="my-2">
              <h5 className="font-poppins text-sm font-medium">
                Transaction Details
              </h5>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex justify-between">
                <p className="text-sm">1 Ticket</p>
                <p className="text-sm">F7</p>
              </div>
              <div className="flex justify-between">
                <p className="text-sm">REGULAR SEAT</p>
                <p className="text-sm">Price</p>
              </div>
              <div className="flex justify-between">
                <p className="text-sm">Transaction Fee</p>
                <p className="text-sm">0.00001 ETH</p>
              </div>
            </div>
          </div>
          <div className="flex h-1/6 items-end">
            <button className="font-poppins w-full rounded-lg bg-slate-100 p-3 font-medium text-slate-800">
              Mint Tickets
            </button>
          </div>
        </div>
      </AnimatedContainer>
    </>
  );
};

export default TicketConfirmationModal;
