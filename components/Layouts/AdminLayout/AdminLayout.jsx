import { appContext } from "context/AppContext";
import { useUserDetails } from "hooks/useUserDetails";
import { useViewport } from "hooks/useViewport";
import { AdminLoginPage } from "modules/adminPages/AdminLoginPage";
import { MoonLoader } from "react-spinners";

import { useCinemaAdminDetails } from "../../reactQuery/queries/Roles/useCinemaAdminDetails";
import { useCinemaAdminStatus } from "../../reactQuery/queries/Roles/useCinemaAdminStatus";
import { Paragraph } from "../../shared/Texts";
import { AdminNavigation } from "./AdminNavigation";
import { AdminNavigationMobile } from "./AdminNavigationMobile";
import NotValidAdmin from "./NotValidAdmin";

export const AdminLayout = ({ children }) => {
  const { user, isConnected } = useUserDetails();
  const viewport = useViewport();
  const Context = appContext;
  const cinemaAdminStatus = useCinemaAdminStatus({ address: user });
  const adminDetails = useCinemaAdminDetails({ admin: user });

  return (
    <>
      {isConnected ? (
        <Context.Provider
          value={{
            adminDetails: adminDetails.data,
          }}
        >
          {cinemaAdminStatus.isLoading ? (
            <div className="flex h-screen w-screen flex-col items-center justify-center gap-4">
              <Paragraph size="sm" style="medium">
                Fetching Admin Status
              </Paragraph>
              <MoonLoader
                loading={cinemaAdminStatus.isLoading}
                size="30px"
                color="black"
              />
            </div>
          ) : cinemaAdminStatus.data ? (
            <>
              {viewport.width > 1024 && <AdminNavigation />}
              <main className="relative w-full">{children}</main>
              {viewport.width < 1024 && <AdminNavigationMobile />}
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
