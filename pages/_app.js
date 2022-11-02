import Layout from "../components/Layout";
import Loading from "../components/Loading";
import Toast from "../components/Toast";
import { appContext, AppContextDOM } from "../context/AppContext";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <AppContextDOM Context={appContext}>
      <Layout>
        <Loading />
        <Component {...pageProps} />;
        <Toast />
      </Layout>
    </AppContextDOM>
  );
}

export default MyApp;
