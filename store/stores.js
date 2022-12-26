import create from "zustand";

const loadingStore = create((set) => ({
  loading: false,
  text: "",
  setLoading: (condition) => set(() => ({ loading: condition })),
  setText: (text) => set(() => ({ text: text })),
}));

const toastStore = create((set) => ({
  show: false,
  text: "",
  condition: "",
  error: (string) => {
    set(() => ({ text: string, show: true, condition: "error" }));
    setTimeout(() => set(() => ({ show: false })), 2500);
  },
  success: (string) => {
    set(() => ({ text: string, show: true, condition: "success" }));
    setTimeout(() => set(() => ({ show: false })), 2500);
  },
}));

export const useLoadingDetails = () => {
  const getLoading = loadingStore((state) => state.loading);
  const getText = loadingStore((state) => state.text);
  return [getLoading, getText];
};

export const useLoading = () => {
  const setLoading = loadingStore((state) => state.setLoading);
  const setText = loadingStore((state) => state.setText);
  return [setLoading, setText];
};

export const useToast = () => {
  const toggleSuccess = toastStore((state) => state.success);
  const toggleError = toastStore((state) => state.error);
  return [toggleSuccess, toggleError];
};

export const useToastDetails = () => {
  const getShow = toastStore((state) => state.show);
  const getText = toastStore((state) => state.text);
  const getCondition = toastStore((state) => state.condition);
  return [getShow, getText, getCondition];
};
