import { useViewport } from "hooks/useViewport";
import React from "react";

import AppNavigation from "../Navigations/AppNavigation/AppNavigation";
import AppNavigationMobile from "../Navigations/AppNavigation/AppNavigationMobile";

const AppLayout = ({ children }) => {
  const viewport = useViewport();
  return (
    <>
      <AppNavigation />
      <main className="relative">{children}</main>
      {viewport.width < 768 && <AppNavigationMobile />}
    </>
  );
};

export default AppLayout;
