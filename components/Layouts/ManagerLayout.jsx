import { useUserDetails } from "hooks/useUserDetails";
import { useViewport } from "hooks/useViewport";
import { ManagerLoginPage } from "modules/managerPages/ManagerLoginPage";
import dynamic from "next/dynamic";
import { MoonLoader } from "react-spinners";

import NotValidManager from "../Manager/NotValidManager";
import {
  ManagerNavigation,
  ManagerNavigationMobile,
} from "../Navigations/ManagerNavigation";
import { useManagerStatus } from "../reactQuery/queries/Roles/useManagerStatus";
import { Paragraph } from "../shared/Texts";

const ManagerLayout = ({ children }) => {
  const { user, isConnected } = useUserDetails();
  const viewport = useViewport();
  const managerStatus = useManagerStatus({ address: user });

  return (
    <>
      {isConnected ? (
        <>
          {managerStatus.isLoading ? (
            <div className="flex h-screen w-screen flex-col items-center justify-center gap-4">
              <Paragraph size="sm" style="medium">
                Fetching Manager Status
              </Paragraph>
              <MoonLoader
                loading={managerStatus.isLoading}
                size="30px"
                color="black"
              />
            </div>
          ) : !managerStatus.data ? (
            <div className="relative flex flex-col items-center justify-center">
              <NotValidManager />
            </div>
          ) : (
            <>
              {viewport.width > 1024 && <ManagerNavigation />}
              <main className="h-full w-full overflow-y-scroll">
                {children}
              </main>
              {viewport.width < 1024 && viewport.height > 400 && (
                <ManagerNavigationMobile />
              )}
            </>
          )}
        </>
      ) : (
        <ManagerLoginPage />
      )}
    </>
  );
};

export default ManagerLayout;
