import React from "react";

const Time = ({ color, size }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke={color ? color : "black"}
      className={
        "w-" + (size ? size : "6") + " h-" + (size ? size : "6") + " mx-auto"
      }
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
};

export default Time;
