import React from "react";

const showtimes = () => {
  return (
    <div className="w-full h-full">
      <div className="text-center">
        <h1 className="font-poppins font-semibold text-2xl m-4 p-2">
          Manage Show Times
        </h1>
      </div>
      <div className="flex h-5/6 justify-around items-center">
        <div className="h-full w-5/12 flex flex-col justify-around items-center">
          <div className="bg-slate-200 shadow-lg rounded-lg w-full h-2/6">
            <h1 className="font-poppins m-2 font-medium p-2 text-center">
              Test
            </h1>
          </div>
          <div className="bg-slate-200 shadow-lg rounded-lg w-full h-3/6">
            <h1 className="font-poppins m-2 font-medium p-2 text-center">
              Test
            </h1>
          </div>
        </div>
        <div className="h-full w-5/12 flex flex-col justify-around items-center">
          <div className="bg-slate-200 shadow-lg rounded-lg w-full h-2/6">
            <h1 className="font-poppins m-2 font-medium p-2 text-center">
              Test
            </h1>
          </div>
          <div className="bg-slate-200 shadow-lg rounded-lg w-full h-3/6">
            <h1 className="font-poppins m-2 font-medium p-2 text-center">
              Test
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default showtimes;
