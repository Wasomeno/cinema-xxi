import { AdminDetailsContextProvider } from "context/AdminDetails/AdminDetailsContextProvider";
import { useUserConnectionDetails } from "hooks/useUserConnectionDetails";
import { useViewport } from "hooks/useViewport";
import { AdminLoginPage } from "modules/adminPages/AdminLoginPage";
import dynamic from "next/dynamic";

import { AdminNavigationMobile } from "@/components/Navigations/Admin/AdminNavigationMobile";

import { useCinemaAdminDetails } from "../../reactQuery/queries/Admin/useCinemaAdminDetails";
import { useCinemaAdminStatus } from "../../reactQuery/queries/Admin/useCinemaAdminStatus";

const NotValidAdmin = dynamic(() => import("./NotValidAdmin"));

const AdminStatusLoading = dynamic(() => import("./AdminStatusLoading"));

const AdminNavigation = dynamic(() =>
  import("../../Navigations/Admin/AdminNavigation").then(
    (component) => component.AdminNavigation
  )
);

// const AdminNavigationMobile = dynamic(() =>
//   import("../../Navigations/Admin/AdminNavigationMobile").then(
//     (component) => component.AdminNavigationMobile
//   )
// );

export const AdminLayout = ({ children }) => {
  const { user, isConnected } = useUserConnectionDetails();
  const cinemaAdminStatus = useCinemaAdminStatus({ address: user });
  const adminDetails = useCinemaAdminDetails({ address: user });
  const viewport = useViewport();

  console.log("RERNder");

  return isConnected ? (
    <>
      {cinemaAdminStatus.isLoading ? (
        <AdminStatusLoading />
      ) : cinemaAdminStatus.data ? (
        <>
          {viewport.width > 1024 && <AdminNavigation />}
          <main className="relative w-full overflow-y-scroll">{children}</main>
          {viewport.width < 1024 && viewport.height > 400 && (
            <AdminNavigationMobile />
          )}
        </>
      ) : (
        <NotValidAdmin />
      )}
    </>
  ) : (
    <AdminLoginPage />
  );
};
