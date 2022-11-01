import React from "react";
import { useToastDetails } from "../store/stores";

const Toast = () => {
  const [show, text, condition] = useToastDetails();
  if (!show) return;
  return condition === "success" ? (
    <div className="flex justify-center items-center absolute bg-gradient-to-r from-green-200 via-green-300 to-green-100 rounded-lg w-1/4 h-16 p-2 shadow-md bottom-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-6 h-6"
      >
        <path
          fillRule="evenodd"
          d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
          clipRule="evenodd"
        />
      </svg>

      <p className="font-poppins font-medium m-2 mx-4 text-sm ">{text}</p>
    </div>
  ) : (
    <div className="flex justify-center items-center absolute bg-gradient-to-r from-red-200 via-red-300 to-red-100 rounded-lg w-1/4 h-16 p-2 shadow-md bottom-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-6 h-6"
      >
        <path
          fillRule="evenodd"
          d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
          clipRule="evenodd"
        />
      </svg>

      <p className="font-poppins font-medium m-2 mx-4 text-sm ">{text}</p>
    </div>
  );
};

export default Toast;
