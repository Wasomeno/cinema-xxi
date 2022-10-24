import { useRouter } from "next/router";
import React from "react";
import AppNav from "./AppNav";
import RegularNav from "./RegularNav";

const Layout = ({ children }) => {
  const router = useRouter();
  const basePath = router.pathname.split("/")[1];

  return basePath !== "app" ? (
    <main className="h-screen">
      <RegularNav />
      {children}
    </main>
  ) : (
    <main className="h-screen flex items-center justify-evenly w-screen relative">
      <AppNav />
      {children}
    </main>
  );
};

export default Layout;
