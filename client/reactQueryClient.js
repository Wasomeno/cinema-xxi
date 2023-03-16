import { QueryClient } from "@tanstack/react-query";

export const queryClientApp = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});
