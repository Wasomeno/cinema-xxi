import React from "react";
import AnimatedContainer from "../AnimatedContainer";

const HeaderMenuModal = ({ children }) => {
  return (
    <AnimatedContainer className="z-15 absolute right-0 top-5 flex w-40 flex-col items-center justify-center gap-3 rounded-md bg-slate-50 p-3 shadow-md sm:right-20 md:right-24">
      {children}
    </AnimatedContainer>
  );
};

export default HeaderMenuModal;
