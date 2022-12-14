import { AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";
import React, { useState } from "react";
import AnimatedContainer from "../AnimatedContainer";
import ChevronLeft from "../Icons/ChevronLeft";
import EllipsisVertical from "../Icons/EllipsisVertical";
import { Title } from "../shared/Texts";

const AdminHeader = ({ title, withOption, withBackButton, OptionMenu }) => {
  const [option, setOption] = useState();
  const { back } = useRouter();
  return (
    <>
      <div className="w-full flex justify-evenly items-center h-14">
        {withBackButton ? (
          <div className="w-1/6 text-center">
            <button
              className="bg-slate-100 shadow-md rounded-full w-8 h-8 p-1 relative"
              onClick={() => back()}
            >
              <ChevronLeft size="5" />
            </button>
          </div>
        ) : (
          <div className="w-1/6" />
        )}
        <div className="w-3/6 text-center">
          <Title text={title} />
          <div className="h-1 w-4/6 rounded-full bg-blue-400 mx-auto mt-2" />
        </div>
        {withOption ? (
          <div className="w-1/6 text-center">
            <button
              className="bg-slate-100 shadow-md rounded-full w-8 h-8 relative z-30"
              onClick={() => setOption((current) => !current)}
            >
              <EllipsisVertical />
            </button>
          </div>
        ) : (
          <div className="w-1/6" />
        )}

        <AnimatePresence>
          {option && (
            <>
              <OptionMenu />
              <AnimatedContainer
                className="h-screen w-screen bg-slate-900 bg-opacity-50 top-0 left-0 absolute z-10"
                onClick={() => setOption((current) => !current)}
              />
            </>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default AdminHeader;
