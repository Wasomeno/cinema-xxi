import React from "react";
import { motion } from "framer-motion";

const AnimatedContainer = ({ className, children }) => {
  return (
    <motion.div
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
