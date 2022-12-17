import Layout from "../components/Layout";
import Loading from "../components/Loading";
import Toast from "../components/Toast";
import { QueryClientProvider } from "@tanstack/react-query";
import { appContext, AppContextDOM } from "../context/AppContext";
import "../styles/globals.css";
import { queryClientApp } from "../client/reactQueryClient";
import { WagmiConfig } from "wagmi";
import client from "../client/wagmiClient";

function MyApp({ Component, pageProps }) {
  return (
    <WagmiConfig client={client}>
      <QueryClientProvider client={queryClientApp}>
        <AppContextDOM Context={appContext}>
          <Layout>
            <Loading />
            <Component {...pageProps} />;
            <Toast />
          </Layout>
        </AppContextDOM>
      </QueryClientProvider>
    </WagmiConfig>
  );
}

export default MyApp;
