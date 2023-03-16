import { AnimatePresence, motion } from "framer-motion";
import React from "react";

const AnimatedContainer = ({ className, onClick, children }) => {
  return (
    <motion.div
      onClick={onClick}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.25, ease: "easeInOut" }}
      exit={{ opacity: 0 }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedContainer;
