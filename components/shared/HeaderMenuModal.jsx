import React from "react";
import AnimatedContainer from "../AnimatedContainer";

const HeaderMenuModal = ({ children }) => {
  return (
    <AnimatedContainer className="flex flex-col justify-center items-center gap-3 w-40 p-3 bg-slate-200 rounded-md z-15 shadow-md absolute right-16 top-10">
      {children}
    </AnimatedContainer>
  );
};

export default HeaderMenuModal;
