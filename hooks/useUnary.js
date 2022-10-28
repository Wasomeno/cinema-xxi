import React, { useState } from "react";

const useUnary = (min, max, value, multiple) => {
  const [number, setNumber] = useState(value);

  const increment = () => {
    if (number >= max) return;
    setNumber((currentNumber) => currentNumber + multiple);
  };

  const decrement = () => {
    if (number <= min) return;
    setNumber((currentNumber) => currentNumber - multiple);
  };

  return [number, increment, decrement];
};

export default useUnary;
