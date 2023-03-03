/* eslint-disable react-hooks/rules-of-hooks */
import { useMutation } from "@tanstack/react-query";

const mutation = ({ url, body, sideEffects, method }) => {
  const mutationResult = useMutation(
    async () =>
      await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }),
    sideEffects
  );
  return mutationResult;
};

export default mutation;
