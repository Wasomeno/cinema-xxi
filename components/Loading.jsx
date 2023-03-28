import { AnimatePresence } from "framer-motion";
import { MoonLoader } from "react-spinners";

import { useLoadingDetails } from "../stores/loadingStore";
import AnimatedContainer from "./AnimatedContainer";
import { Paragraph } from "./shared/Texts";

const Loading = () => {
  const [loading, loadingText] = useLoadingDetails();

  return (
    <AnimatePresence>
      {loading && (
        <>
          <AnimatedContainer className="fixed top-0 z-20 h-screen w-screen bg-slate-700 bg-opacity-80" />
          <AnimatedContainer className="fixed top-1/2 left-1/2 z-30 flex h-72 w-64 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-5 rounded-lg bg-slate-100 shadow-md dark:bg-slate-800">
            <Paragraph size="sm" style="medium">
              {loadingText}
            </Paragraph>
            <MoonLoader loading={loading} size="30px" color="black" />
            <div className="p-2 text-center">
              <Paragraph
                text="Confirm the transaction in your wallet"
                size="sm"
              />
            </div>
          </AnimatedContainer>
        </>
      )}
    </AnimatePresence>
  );
};

export default Loading;
