import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useRouter } from "next/router";
import React, { useContext, useEffect } from "react";
import { appContext } from "../context/AppContext";
import AdminLayout from "./Admin/AdminLayout";
import AppNav from "./AppNav";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import NotConnected from "./NotConnected";
import RegularNav from "./RegularNav";
import ManagerLayout from "./Manager/ManagerLayout";

const Layout = ({ children }) => {
  const router = useRouter();
  const basePath = router.pathname.split("/")[1];
  const isConnected = useContext(appContext).isConnected;

  return basePath === "app" ? (
    isConnected ? (
      <main className="h-screen flex justify-evenly relative">
        <AppNav />
        {children}
      </main>
    ) : (
      <NotConnected />
    )
  ) : basePath === "admin" ? (
    isConnected ? (
      <AdminLayout>{children}</AdminLayout>
    ) : (
      <NotConnected />
    )
  ) : basePath === "manager" ? (
    <ManagerLayout>{children}</ManagerLayout>
  ) : (
    <main className="h-screen">
      <RegularNav />
      {children}
    </main>
  );
};

export default Layout;
