import { AnimatePresence } from "framer-motion";
import React from "react";

import { useToastDetails } from "../store/stores";
import AnimatedContainer from "./AnimatedContainer";
import CheckMark from "./Icons/Checkmark";
import Warning from "./Icons/Warning";
import { Paragraph } from "./shared/Texts";

const conditions = {
  success: {
    class: "from-green-200 via-green-300 to-green-100",
    icon: <CheckMark />,
  },
  error: { class: "from-red-200 via-red-300 to-red-100", icon: <Warning /> },
};

const Toast = () => {
  const [show, text, condition] = useToastDetails();
  return (
    <AnimatePresence>
      {show && (
        <AnimatedContainer
          className={
            "absolute bottom-0 left-1/2 z-30 flex h-14 w-5/6 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-lg bg-gradient-to-r p-2 shadow-md " +
            conditions[condition].class
          }
        >
          <div className="w-1/6">{conditions[condition].icon}</div>
          <div className="w-4/6 text-center">
            <Paragraph text={text} size="sm" />
          </div>
        </AnimatedContainer>
      )}
    </AnimatePresence>
  );
};

export default Toast;
