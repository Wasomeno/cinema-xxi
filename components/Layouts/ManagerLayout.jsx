import { useViewport } from "hooks/useViewport";
import dynamic from "next/dynamic";
import Head from "next/head";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useMemo } from "react";

import { ManagerToolbar } from "../Navigations/ManagerToolbar";
import { Spinner } from "../Spinner";

const ManagerNavigation = dynamic(() =>
  import("../Navigations/Manager/ManagerNavigation").then(
    (component) => component.ManagerNavigation
  )
);

const ManagerNavigationMobile = dynamic(() =>
  import("../Navigations/Manager/ManagerNavigationMobile").then(
    (component) => component.ManagerNavigationMobile
  )
);

export const ManagerLayout = ({ children, pageTitle = "" }) => {
  const router = useRouter();
  const { data: sessionData, status } = useSession();
  const viewport = useViewport();

  if (status === "loading")
    return (
      <div className="flex min-h-screen items-center justify-center bg-white">
        <Spinner />
      </div>
    );

  if (status !== "loading" && sessionData?.user.role !== "manager") {
    router.push("/manager/login");
  }

  if (router.pathname === "/manager/login")
    return (
      <>
        <Head>
          <title>Manager Login</title>
        </Head>
        {children}
      </>
    );

  return (
    <div className="flex min-h-screen flex-1 flex-col">
      <Head>
        <title>Manager | {pageTitle}</title>
        <meta property="description" content="Manager page" />
      </Head>
      <ManagerToolbar />
      <div className="flex flex-1 justify-center gap-4 p-4">
        {viewport.width > 1024 && <ManagerNavigation />}
        <div className="flex w-full flex-col overflow-y-scroll rounded-lg">
          {children}
        </div>
      </div>
      {viewport.width < 1024 && viewport.height > 400 && (
        <ManagerNavigationMobile />
      )}
    </div>
  );
};
