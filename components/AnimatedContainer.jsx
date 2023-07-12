import { motion } from "framer-motion";
import React from "react";

const AnimatedContainer = ({ children, ...props }) => {
  return (
    <motion.div
      {...props}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.25, ease: "easeInOut" }}
      exit={{ opacity: 0 }}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedContainer;
