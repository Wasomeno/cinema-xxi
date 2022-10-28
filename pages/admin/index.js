import React, { useState } from "react";

const index = () => {
  return (
    <div className="flex flex-col items-center justify-start w-screen h-screen p-4">
      <div className="flex justify-between items-center w-full m-3">
        <h1 className="font-poppins font-semibold text-lg p-2">Cinema XXI</h1>
        <button className="font-poppins bg-slate-300 p-2 px-3 rounded-lg font-medium">
          Connect
        </button>
      </div>
      <div className="bg-slate-200 rounded-xl shadow-md h-5/6 w-full">
        <div className="text-center">
          <h1 className="font-poppins font-semibold text-2xl m-2 p-2">
            Cinema 4 Dashboard
          </h1>
        </div>
        <div className="flex flex-wrap gap-4 justify-center items-start">
          <div className="rounded-lg bg-slate-50 shadow-md w-3/6 h-3/6">
            <div className="text-center">
              <h5 className="font-poppins m-2 font-medium">Tickets Sold</h5>
            </div>
          </div>
          <div className="rounded-lg bg-slate-50 shadow-md w-2/6 h-2/6">
            <div className="text-center">
              <h5 className="font-poppins m-2 font-medium">ETH Gained</h5>
            </div>
          </div>
          <div className="rounded-lg bg-slate-50 shadow-md w-5/6 h-2/6">
            <div className="text-center">
              <h5 className="font-poppins m-2 font-medium">Movies Data</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default index;
