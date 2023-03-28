import { motion } from "framer-motion";
import { useViewport } from "hooks/useViewport";
import MyApp from "pages/_app";
import { createPortal } from "react-dom";

import AnimatedContainer from "../AnimatedContainer";

const HeaderMenuModal = ({ children, toggleShowMenu }) => {
  const viewport = useViewport();
  const modalContainer = document.getElementById("modal-portal-container");

  return createPortal(
    <>
      <AnimatedContainer
        onClick={toggleShowMenu}
        className="fixed left-0 bottom-0 z-20 h-screen w-full bg-slate-900 bg-opacity-40"
      />
      <motion.div
        initial={{ bottom: -10, opacity: 0 }}
        animate={{ bottom: 0, opacity: 1 }}
        drag={viewport.width < 500 && "y"}
        dragConstraints={{ left: 0, bottom: 0 }}
        dragElastic={0.25}
        dragDirectionLock
        onDirectionLock={toggleShowMenu}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        exit={{ bottom: -10, opacity: 0 }}
        className="fixed left-0 bottom-0 z-30 h-2/6 w-full rounded-md bg-slate-100 p-3 shadow-md dark:bg-slate-800 sm:w-48 md:left-1/2 md:top-1/2 md:h-96 md:w-96 md:-translate-x-1/2 md:-translate-y-1/2"
      >
        <div className="mx-auto h-1 w-2/6 rounded-full bg-slate-400 bg-opacity-25" />
        {children}
      </motion.div>
    </>,
    modalContainer
  );
};

export default HeaderMenuModal;
