import { useLoading, useToast } from "../../../store/stores";

const contextLoadingTexts = {
  add: "Adding new ",
  delete: "Deleting ",
  update: "Updating ",
};

const contextSuccessTexts = {
  add: "Succesffully add ",
  delete: "Successfully delete ",
  update: "Successfully update ",
};

export const createSideEffects = ({ context, object }) => {
  const [setLoading, setLoadingText] = useLoading();
  const [toastSuccess, toastError] = useToast();

  return {
    onMutate: () => {
      setLoadingText(contextLoadingTexts[context] + object);
      setLoading(true);
    },
    onError: (error) => {
      setLoading(false);
      console.log(error);
      toastError(error.reason);
    },
    onSuccess: () => {
      setLoading(false);
      toastSuccess(contextSuccessTexts[context] + object);
    },
  };
};
