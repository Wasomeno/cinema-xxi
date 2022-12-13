import { useMutation } from "@tanstack/react-query";
import React from "react";

const mutation = (mutationFunction, sideEffects) => {
  const mutationResult = useMutation(mutationFunction, sideEffects);
  return mutationResult;
};

export default mutation;
