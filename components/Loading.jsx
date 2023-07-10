import { AnimatePresence } from "framer-motion";

import { useLoadingDetails } from "../stores/loadingStore";
import AnimatedContainer from "./AnimatedContainer";
import { ModalContainer } from "./ModalContainer";
import { Spinner } from "./Spinner";

const Loading = () => {
  const [loading, loadingText] = useLoadingDetails();
  return (
    <AnimatePresence>
      {loading && (
        <ModalContainer toggleModal={() => null}>
          <AnimatedContainer className="fixed left-1/2 top-1/2 z-30 flex h-72 w-64 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-5 rounded-lg bg-slate-100 shadow-md dark:bg-slate-800 lg:h-80 lg:w-72">
            <span className="font-poppins text-sm font-medium tracking-wide lg:text-base">
              {loadingText}
            </span>
            <Spinner />
          </AnimatedContainer>
        </ModalContainer>
      )}
    </AnimatePresence>
  );
};

export default Loading;
