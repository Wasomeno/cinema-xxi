import { useViewport } from "hooks/useViewport";
import React from "react";
import { useAccount } from "wagmi";

import NotValidManager from "../Manager/NotValidManager";
import { ManagerNavigation } from "../Navigations/ManagerNavigation/";
import { ManagerNavigationMobile } from "../Navigations/ManagerNavigation/";

const ManagerLayout = ({ children }) => {
  const { address } = useAccount();
  const viewport = useViewport();
  const superAdminStatus = true;

  return (
    <>
      {!superAdminStatus ? (
        <div className="relative flex flex-col items-center justify-center">
          <NotValidManager />
        </div>
      ) : (
        <>
          {viewport.width > 1024 && <ManagerNavigation />}
          <main className="h-full w-full">{children}</main>
          {viewport.width < 1024 && <ManagerNavigationMobile />}
        </>
      )}
    </>
  );
};

export default ManagerLayout;
