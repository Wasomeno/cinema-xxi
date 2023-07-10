import { queryClientApp } from "client/reactQueryClient";
import { useRouter } from "next/router";

import { useLoading } from "../../../stores/loadingStore";
import { useToast } from "../../../stores/toastStore";

export const useSideEffects = ({ text, queryKeys, redirectUrl }) => {
  const [setLoading, setLoadingText] = useLoading();
  const [toastSuccess, toastError] = useToast();
  const router = useRouter();
  return {
    onMutate: () => {
      setLoadingText(text);
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
      toastError(errorMessage);
    },
    onSuccess: async (response) => {
      const responseJson = await response.json();
      setLoading(false);
      toastSuccess(responseJson.message);
      redirectUrl && router.push(redirectUrl);
      queryKeys && queryClientApp.invalidateQueries(queryKeys);
    },
  };
};
