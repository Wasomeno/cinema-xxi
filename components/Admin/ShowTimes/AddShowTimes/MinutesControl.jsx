import React from "react";
import useUnary from "../../../../hooks/useUnary";

const MinutesControl = ({ minutesUnary }) => {
  const { number, increment, decrement } = minutesUnary;
  return (
    <div className="flex items-center h-full justify-center">
      <div className="flex flex-col h-full items-center justify-center gap-2">
        <button
          className="p-2 bg-black rounded-lg shadow-md"
          onClick={() => increment()}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="white"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 15.75l7.5-7.5 7.5 7.5"
            />
          </svg>
        </button>
        <input
          type={"number"}
          className="bg-slate-100 shadow-md rounded-lg p-2 w-12 h-12 text-center font-poppins"
          value={number}
        />
        <button
          className="p-2 bg-black rounded-lg shadow-md"
          onClick={() => decrement()}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="white"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 8.25l-7.5 7.5-7.5-7.5"
            />
          </svg>
        </button>
      </div>
      <h5 className="font-poppins m-2 font-medium text-sm">Minutes</h5>
    </div>
  );
};

export default MinutesControl;
