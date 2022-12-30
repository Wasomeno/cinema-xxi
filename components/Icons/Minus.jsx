import React from "react";

const Minus = ({ size, color }) => {
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
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" />
    </svg>
  );
};

export default Minus;
