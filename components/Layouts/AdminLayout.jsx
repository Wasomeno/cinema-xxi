import { useUserDetails } from "hooks/useUserDetails";
import { useViewport } from "hooks/useViewport";
import { MoonLoader } from "react-spinners";

import NotValidAdmin from "../Admin/NotValidAdmin";
import AdminNavigation from "../Navigations/AdminNavigation/AdminNavigation";
import AdminNavigationMobile from "../Navigations/AdminNavigation/AdminNavigationMobile";
import { useCinemaAdminStatus } from "../reactQuery/queries/Roles/useCinemaAdminStatus";
import { Paragraph } from "../shared/Texts";

const AdminLayout = ({ children }) => {
  const { user } = useUserDetails();
  const viewport = useViewport();
  const cinemaAdminStatus = true;

  return (
    <div>
      {cinemaAdminStatus.isLoading ? (
        <div className="flex h-screen w-screen flex-col items-center justify-center gap-4">
          <Paragraph text="Fetching Details" size="sm" style="medium" />
          <MoonLoader
            loading={cinemaAdminStatus.isLoading}
            size="30px"
            color="black"
          />
        </div>
      ) : cinemaAdminStatus ? (
        <>
          {viewport.width > 1024 && <AdminNavigation />}
          <main className="relative w-full">{children}</main>
          {viewport.width < 1024 && <AdminNavigationMobile />}
        </>
      ) : (
        <NotValidAdmin />
      )}
    </div>
  );
};

export default AdminLayout;
