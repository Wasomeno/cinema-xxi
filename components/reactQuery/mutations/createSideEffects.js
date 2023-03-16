/* eslint-disable react-hooks/rules-of-hooks */
import { queryClientApp } from "client/reactQueryClient";
import { useRouter } from "next/router";

import { useLoading, useToast } from "../../../store/stores";

const contextLoadingTexts = {
  add: "Adding new",
  delete: "Deleting",
  update: "Updating",
  mint: "Minting",
};

export const createSideEffects = ({
  context,
  object,
  redirect,
  invalidateQueries,
  queryKeys,
  redirectUrl,
}) => {
  const [setLoading, setLoadingText] = useLoading();
  const [toastSuccess, toastError] = useToast();
  const router = useRouter();
  return {
    onMutate: () => {
      setLoadingText(contextLoadingTexts[context] + " " + object);
      setLoading(true);
    },
    onError: (error) => {
      let errorMessage;
      if (error.reason) {
        errorMessage = error.reason;
      } else if (error.message) {
        errorMessage = error.message;
      }
      setLoading(false);
      console.log(errorMessage);
      toastError(errorMessage);
    },
    onSuccess: async (response) => {
      const responseJson = await response.json();
      setLoading(false);
      toastSuccess(responseJson.text);
      redirect && router.push(redirectUrl);
      invalidateQueries && queryClientApp.invalidateQueries(queryKeys);
    },
  };
};
