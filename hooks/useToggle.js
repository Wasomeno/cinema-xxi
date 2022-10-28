import React, { useState } from "react";

const useToggle = (condition) => {
  const [state, setState] = useState(condition);

  const toggleState = () => {
    setState((current) => !current);
  };

  return [state, toggleState];
};

export default useToggle;
