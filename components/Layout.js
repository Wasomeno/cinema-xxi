import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useRouter } from "next/router";
import React, { useContext, useEffect } from "react";
import { appContext } from "../context/AppContext";
import AdminLayout from "./AdminLayout";
import AdminNav from "./AdminNav";
import AppNav from "./AppNav";
import NotConnected from "./NotConnected";
import RegularNav from "./RegularNav";

const Layout = ({ children }) => {
  const router = useRouter();
  const basePath = router.pathname.split("/")[1];
  const queryClientApp = new QueryClient();
  const queryClientAdmin = new QueryClient();
  const isConnected = useContext(appContext).isConnected;
  const user = useContext(appContext).account[0];
  const checkConnected = async () => {
    const contract = rolesContract();
    const result = await contract.adminToDetails(user);
    return result;
  };

  useEffect(() => {}, []);

  return isConnected ? (
    basePath === "" ? (
      <main className="h-screen">
        <RegularNav />
        {children}
      </main>
    ) : basePath === "app" ? (
      <QueryClientProvider client={queryClientApp}>
        <main className="h-screen flex items-center justify-evenly relative">
          {/* <AppNav /> */}
          {children}
        </main>
      </QueryClientProvider>
    ) : (
      <QueryClientProvider client={queryClientAdmin}>
        <AdminLayout>{children}</AdminLayout>
      </QueryClientProvider>
    )
  ) : (
    <NotConnected />
  );
};

export default Layout;
