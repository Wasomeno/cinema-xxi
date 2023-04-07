import "../styles/globals.css";

import { ThemeProvider } from "next-themes";

import Layout from "@/components/Layout";

function MyApp({ Component, pageProps, session }) {
  return (
    <ThemeProvider enableSystem={true} attribute="class">
      <Layout session={session}>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
}

export default MyApp;
