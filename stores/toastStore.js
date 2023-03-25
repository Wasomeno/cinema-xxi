import { create } from "zustand";

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
