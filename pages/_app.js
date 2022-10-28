import Layout from "../components/Layout";
import { appContext, AppContextDOM } from "../context/AppContext";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <AppContextDOM Context={appContext}>
      <Layout>
        <Component {...pageProps} />;
      </Layout>
    </AppContextDOM>
  );
}

export default MyApp;
