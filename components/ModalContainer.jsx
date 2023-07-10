import { createPortal } from "react-dom";

import AnimatedContainer from "./AnimatedContainer";

export const ModalContainer = ({ children, closeModal }) => {
  return createPortal(
    <>
      <AnimatedContainer
        onClick={closeModal}
        className="fixed bottom-0 left-0 z-20 h-screen w-full bg-slate-800 bg-opacity-50 backdrop-blur-sm"
      />
      {children}
    </>,
    document.getElementById("modal-portal-container")
  );
};
