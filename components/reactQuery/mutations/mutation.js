/* eslint-disable react-hooks/rules-of-hooks */
import { useMutation } from "@tanstack/react-query";

const mutation = (mutationFunction, sideEffects) => {
  const mutationResult = useMutation(mutationFunction, sideEffects);
  return mutationResult;
};

export default mutation;
