import { useRouter } from "next/router";
import React, { useContext, useEffect } from "react";
import AdminLayout from "./Admin/AdminLayout";
import AppNav from "./AppNav";
import NotConnected from "./NotConnected";
import RegularNav from "./RegularNav";
import ManagerLayout from "./Manager/ManagerLayout";
import { useUserDetails } from "../hooks/useUserDetails";

const Layout = ({ children }) => {
  const router = useRouter();
  const basePath = router.pathname.split("/")[1];
  const { isConnected } = useUserDetails();

  return isConnected ? (
    basePath === "app" ? (
      <main className="h-screen flex justify-evenly relative">
        <AppNav />
        {children}
      </main>
    ) : basePath === "admin" ? (
      <AdminLayout>{children}</AdminLayout>
    ) : basePath === "manager" ? (
      <ManagerLayout>{children}</ManagerLayout>
    ) : (
      <main className="h-screen">
        <RegularNav />
        {children}
      </main>
    )
  ) : (
    <NotConnected />
  );
};

export default Layout;
