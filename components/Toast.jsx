import { AnimatePresence } from "framer-motion";

import { useToastDetails } from "../stores/toastStore";
import AnimatedContainer from "./AnimatedContainer";
import CheckMark from "./Icons/Checkmark";
import Warning from "./Icons/Warning";
import { Paragraph } from "./shared/Texts";

const conditions = {
  success: {
    class: "from-green-200 via-green-300 to-green-100",
    icon: <CheckMark size="5" />,
  },
  error: {
    class: "from-red-200 via-red-300 to-red-100",
    icon: <Warning size="5" />,
  },
};

const Toast = () => {
  const [show, text, condition] = useToastDetails();
  return (
    <AnimatePresence>
      {show && (
        <AnimatedContainer
          className={
            "fixed bottom-0 left-1/2 z-30 flex h-14 w-5/6 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-lg bg-gradient-to-r p-2 shadow-md lg:w-2/6 " +
            conditions[condition]?.class
          }
        >
          <div className="w-1/6">{conditions[condition]?.icon}</div>
          <div className="w-4/6 text-center">
            <Paragraph size="xs">{text}</Paragraph>
          </div>
        </AnimatedContainer>
      )}
    </AnimatePresence>
  );
};

export default Toast;
