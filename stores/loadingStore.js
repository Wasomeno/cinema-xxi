import { create } from "zustand";

const loadingStore = create((set) => ({
  loading: false,
  text: "",
  setLoading: (condition) => set(() => ({ loading: condition })),
  setText: (text) => set(() => ({ text: text })),
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
