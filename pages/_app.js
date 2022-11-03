import Layout from "../components/Layout";
import Loading from "../components/Loading";
import Toast from "../components/Toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { appContext, AppContextDOM } from "../context/AppContext";
import "../styles/globals.css";
import { queryClientApp } from "../client/reactQueryClient";

function MyApp({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClientApp}>
      <AppContextDOM Context={appContext}>
        <Layout>
          <Loading />
          <Component {...pageProps} />;
          <Toast />
        </Layout>
      </AppContextDOM>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default MyApp;
