import { useViewport } from "hooks/useViewport";
import Head from "next/head";

import AppNavigation from "../Navigations/App/AppNavigation";
import AppNavigationMobile from "../Navigations/App/AppNavigationMobile";

const AppLayout = ({ children, pageTitle }) => {
  const viewport = useViewport();
  return (
    <div className="flex min-h-screen flex-1 flex-col">
      <Head>
        <title>{`XXI Cinema App  ${pageTitle ? `| ${pageTitle}` : ""}`}</title>
        <meta property="description" content="App page" />
      </Head>
      <AppNavigation />
      <div className="relative">{children}</div>
      {viewport.width < 768 && <AppNavigationMobile />}
    </div>
  );
};

export default AppLayout;
