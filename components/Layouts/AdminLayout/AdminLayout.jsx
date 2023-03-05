import { appContext } from "context/AppContext";
import { useUserDetails } from "hooks/useUserDetails";
import { useViewport } from "hooks/useViewport";
import { AdminLoginPage } from "modules/adminPages/AdminLoginPage";
import dynamic from "next/dynamic";

import { useCinemaAdminDetails } from "../../reactQuery/queries/Roles/useCinemaAdminDetails";
import { useCinemaAdminStatus } from "../../reactQuery/queries/Roles/useCinemaAdminStatus";
import { AdminNavigation } from "./AdminNavigation";
import { AdminNavigationMobile } from "./AdminNavigationMobile";

export const AdminLayout = ({ children }) => {
  const { user, isConnected } = useUserDetails();
  const viewport = useViewport();
  const Context = appContext;
  const cinemaAdminStatus = useCinemaAdminStatus({ address: user });
  const adminDetails = useCinemaAdminDetails({ admin: user });

  const NotValidAdmin = dynamic(() => import("./NotValidAdmin"));

  const AdminStatusLoading = dynamic(() => import("./AdminStatusLoading"));

  return (
    <>
      {isConnected ? (
        <Context.Provider
          value={{
            adminDetails: adminDetails.data,
          }}
        >
          {cinemaAdminStatus.isLoading ? (
            <AdminStatusLoading />
          ) : cinemaAdminStatus.data ? (
            <>
              {viewport.width > 1024 && <AdminNavigation />}
              <main className="relative w-full">{children}</main>
              {viewport.width < 1024 && viewport.height > 400 && (
                <AdminNavigationMobile />
              )}
            </>
          ) : (
            <NotValidAdmin />
          )}
        </Context.Provider>
      ) : (
        <AdminLoginPage />
      )}
    </>
  );
};
