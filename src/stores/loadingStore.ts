import { create } from "zustand"

const loadingStore = create<{
  loading: boolean
  text: string
  setLoading: (loading: boolean) => void
  setText: (text: string) => void
}>((set) => ({
  loading: false,
  text: "",
  setLoading: (loading) => set(() => ({ loading: loading })),
  setText: (text) => set(() => ({ text: text })),
}))

export const useLoadingDetails = () => {
  const loading = loadingStore((state) => state.loading)
  const text = loadingStore((state) => state.text)
  return { loading, text }
}

export const useLoading = () => {
  const setLoading = loadingStore((state) => state.setLoading)
  const setText = loadingStore((state) => state.setText)
  return { setLoading, setText }
}
