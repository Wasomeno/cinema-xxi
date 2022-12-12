import React, { useEffect, useState } from "react";

const SeatsModal = ({ show, setShow }) => {
  const [seats, setSeats] = useState(50);

  const getSeats = () => {
    let seatsArray = [];
    for (let i = 0; i < seats; i++) {
      seatsArray.push(i + 1);
    }
    return seatsArray;
  };

  useEffect(() => {}, []);

  if (!show) return;
  return (
    <>
      <div className="w-screen h-screen bg-black bg-opacity-70 absolute left-0 top-0" />
      <div className="w-5/6 h-5/6 bg-white rounded-xl border-2 border-dark absolute top-20 left-10 overflow-scroll lg:left-36 xl:left-36 ">
        <div className="w-screen lg:w-full xl:w-full flex items-center">
          <div className="mx-auto">
            <h1 className="p-2 font-poppins text-base  font-medium lg:text-xl">
              Movie Title (Studio 4)
            </h1>
          </div>
          <div className="justify-self-end">
            <button
              onClick={() => setShow(false)}
              className="self-end p-2 m-2 font-poppins text-sm font-medium lg:text-base"
            >
              Close
            </button>
          </div>
        </div>

        <div className="p-3 flex flex-wrap justify-center w-screen lg:w-full max-w-screen-xl">
          {getSeats().map((seat, index) => (
            <button
              key={index}
              className="p-2 m-2 bg-slate-500 rounded-lg w-12 h-12 transition duration-150 ease-in-out hover:scale-105"
            >
              <h5 className="font-poppins font-medium text-center text-white">
                {seat}
              </h5>
            </button>
          ))}
        </div>
        <div className="w-screen lg:w-full">
          <h5 className="w-5/6 lg:w-4/6 mx-auto my-4 bg-slate-700 rounded-full p-2 font-poppins font-medium text-white text-center">
            Screen
          </h5>
        </div>
      </div>
    </>
  );
};

export default SeatsModal;
