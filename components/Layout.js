import { useRouter } from "next/router";
import React from "react";
import AdminNav from "./AdminNav";
import AppNav from "./AppNav";
import RegularNav from "./RegularNav";

const Layout = ({ children }) => {
  const router = useRouter();
  const basePath = router.pathname.split("/")[1];

  return basePath === "/" ? (
    <main className="h-screen">
      <RegularNav />
      {children}
    </main>
  ) : basePath === "app" ? (
    <main className="h-screen flex items-center justify-evenly relative">
      {/* <AppNav /> */}
      {children}
    </main>
  ) : (
    <main className="h-screen flex items-center justify-evenly relative">
      {children}
    </main>
  );
};

export default Layout;
