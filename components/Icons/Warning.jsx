import clsx from "clsx";
import React from "react";
import { twMerge } from "tailwind-merge";

const Warning = ({ size, color }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill={color ? color : "black"}
      className={twMerge(
        clsx(
          "w-" + (size ? size : "6"),
          "h-" + (size ? size : "6"),
          "fill-" + (color ? color : "slate-800"),
          "mx-auto"
        )
      )}
    >
      <path
        fillRule="evenodd"
        d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
        clipRule="evenodd"
      />
    </svg>
  );
};

export default Warning;
