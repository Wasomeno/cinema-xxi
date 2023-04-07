import { AnimatePresence } from "framer-motion";

import { useToastDetails } from "../stores/toastStore";
import AnimatedContainer from "./AnimatedContainer";
import CheckMark from "./Icons/Checkmark";
import Warning from "./Icons/Warning";

const conditions = {
  success: {
    class:
      "from-green-800 via-green-700 to-green-600 dark:from-green-400 dark:via-green-300 dark:to-green-200",
    icon: <CheckMark size="5 lg:w-7 lg:h-7" color="fill-slate-200" />,
  },
  error: {
    class:
      "from-red-800 via-red-700 to-red-600 dark:from-red-400 dark:via-red-300 dark:to-red-200",
    icon: <Warning size="5 lg:w-7 lg:h-7" color="fill-slate-200" />,
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
            <p className="font-poppins text-xs text-slate-50 dark:font-medium dark:text-slate-900 lg:text-sm">
              {text}
            </p>
          </div>
        </AnimatedContainer>
      )}
    </AnimatePresence>
  );
};

export default Toast;
