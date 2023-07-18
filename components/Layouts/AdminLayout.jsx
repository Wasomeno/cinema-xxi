import { useViewport } from "hooks/useViewport";
import Head from "next/head";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

import AnimatedContainer from "../AnimatedContainer";
import { AdminNavigation } from "../Navigations/Admin/AdminNavigation";
import { AdminNavigationMobile } from "../Navigations/Admin/AdminNavigationMobile";
import { AdminToolbar } from "../Navigations/Admin/AdminToolbar";
import { Spinner } from "../Spinner";

export const AdminLayout = ({ children, pageTitle }) => {
  const { data: sessionData, status } = useSession();
  const router = useRouter();
  const viewport = useViewport();

  if (router.pathname === "/admin/login")
    return (
      <>
        <Head>
          <title>Cinema Admin Login</title>
        </Head>
        {children}
      </>
    );

  if (status === "loading")
    return (
      <AnimatedContainer className="flex min-h-screen items-center justify-center bg-white">
        <Spinner />
      </AnimatedContainer>
    );

  if (status !== "loading" && sessionData?.user.role !== "admin") {
    router.push("/admin/login");
  }

  return (
    <div className="flex  min-h-screen flex-1 flex-col">
      <Head>
        <title>
          {sessionData?.user.cinemaName} | {pageTitle}
        </title>
        <meta property="description" content="Admin page" />
      </Head>
      <AdminToolbar />
      <div className="flex justify-center gap-4 p-4">
        <AdminNavigation />
        <div className="h-full w-full overflow-y-scroll rounded-lg">
          {children}
        </div>
      </div>
      {viewport.height > 400 && <AdminNavigationMobile />}
    </div>
  );
};
