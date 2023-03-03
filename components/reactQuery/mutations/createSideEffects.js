/* eslint-disable react-hooks/rules-of-hooks */
import { queryClientApp } from "client/reactQueryClient";
import { useRouter } from "next/router";

import { useLoading, useToast } from "../../../store/stores";

const contextLoadingTexts = {
  add: "Adding new ",
  delete: "Deleting ",
  update: "Updating ",
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
      setLoadingText(contextLoadingTexts[context] + object);
      setLoading(true);
    },
    onError: (error) => {
      setLoading(false);
      // toastError(error.message);
      console.log(error);
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
