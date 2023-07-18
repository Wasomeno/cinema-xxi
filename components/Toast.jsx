import { AnimatePresence } from "framer-motion";
import { HiCheckCircle } from "react-icons/hi";
import { RiErrorWarningFill } from "react-icons/ri";
import { twMerge } from "tailwind-merge";

import { useToastDetails } from "../stores/toastStore";
import AnimatedContainer from "./AnimatedContainer";

const Toast = () => {
  const [show, text, condition] = useToastDetails();
  return (
    <AnimatePresence>
      {show && (
        <AnimatedContainer
          className={twMerge(
            "fixed bottom-0 left-1/2 z-30 flex h-14 w-5/6 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-lg p-2 shadow-md lg:w-2/6",
            condition === "success"
              ? "bg-green-100 dark:bg-green-700"
              : "bg-red-100 dark:bg-red-700"
          )}
        >
          <div className="w-1/6">
            {condition === "success" ? (
              <HiCheckCircle
                size="18"
                className="text-green-700 dark:text-green-500"
              />
            ) : (
              <RiErrorWarningFill
                size="18"
                className="text-red-700 dark:text-red-500"
              />
            )}
          </div>
          <div className="w-4/6 text-center">
            <p className="font-poppins text-xs text-slate-800 dark:font-medium dark:text-slate-100 lg:text-sm">
              {text}
            </p>
          </div>
        </AnimatedContainer>
      )}
    </AnimatePresence>
  );
};

export default Toast;
