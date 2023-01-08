import React from "react";
import { useLoadingDetails } from "../store/stores";
import { MoonLoader } from "react-spinners";
import { AnimatePresence } from "framer-motion";
import AnimatedContainer from "./AnimatedContainer";
import { Paragraph } from "./shared/Texts";

const Loading = () => {
  const [loading, loadingText] = useLoadingDetails();

  return (
    <AnimatePresence>
      {loading && (
        <>
          <AnimatedContainer className="fixed bg-slate-700 bg-opacity-80 w-screen h-screen top-0 z-20" />
          <AnimatedContainer className="fixed w-64 h-72 rounded-lg bg-slate-100 shadow-md top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center gap-5 z-30">
            <Paragraph text={loadingText} size="sm" style="medium" />
            <MoonLoader loading={loading} size="30px" color="black" />
            <div className="text-center p-2">
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
