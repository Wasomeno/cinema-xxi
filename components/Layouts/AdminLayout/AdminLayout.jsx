import { useViewport } from "hooks/useViewport";
import { AdminLoginPage } from "modules/adminPages/AdminLoginPage";
import dynamic from "next/dynamic";
import { useSession } from "next-auth/react";

const AdminNavigation = dynamic(() =>
  import("../../Navigations/Admin/AdminNavigation").then(
    (component) => component.AdminNavigation
  )
);

const AdminNavigationMobile = dynamic(() =>
  import("../../Navigations/Admin/AdminNavigationMobile").then(
    (component) => component.AdminNavigationMobile
  )
);

export const AdminLayout = ({ children }) => {
  const { data: sessionData } = useSession();
  const viewport = useViewport();
  if (!sessionData) return <AdminLoginPage />;
  return (
    <>
      {viewport.width > 1024 && <AdminNavigation />}
      <main className="relative w-full overflow-y-scroll">{children}</main>
      {viewport.width < 1024 && viewport.height > 400 && (
        <AdminNavigationMobile />
      )}
    </>
  );
};
