import { useUserConnectionDetails } from "hooks/useUserConnectionDetails";
import { useViewport } from "hooks/useViewport";
import { ManagerLoginPage } from "modules/managerPages/ManagerLoginPage";
import dynamic from "next/dynamic";
import { MoonLoader } from "react-spinners";

import { useManagerStatus } from "../../reactQuery/queries/Manager/useManagerStatus";
import { Paragraph } from "../../shared/Texts";
import NotValidManager from "./NotValidManager";

const ManagerNavigation = dynamic(() =>
  import("../../Navigations/Manager/ManagerNavigation").then(
    (component) => component.ManagerNavigation
  )
);

const ManagerNavigationMobile = dynamic(() =>
  import("../../Navigations/Manager/ManagerNavigationMobile").then(
    (component) => component.ManagerNavigationMobile
  )
);

export const ManagerLayout = ({ children }) => {
  const { user, isConnected } = useUserConnectionDetails();
  const managerStatus = useManagerStatus({ address: user });
  const viewport = useViewport();

  if (!isConnected) return <ManagerLoginPage />;

  if (managerStatus.isLoading && isConnected)
    return (
      <div className="flex h-screen w-screen flex-col items-center justify-center gap-4 bg-slate-50 bg-opacity-95 dark:bg-slate-800">
        <Paragraph size="sm" style="medium">
          Fetching Manager Status
        </Paragraph>
        <MoonLoader
          loading={managerStatus.isLoading}
          size="30px"
          color="black"
        />
      </div>
    );

  if (!managerStatus.data && isConnected) return <NotValidManager />;

  return (
    <>
      {viewport.width > 1024 && <ManagerNavigation />}
      <div className="h-full w-full overflow-y-scroll">{children}</div>
      {viewport.width < 1024 && viewport.height > 400 && (
        <ManagerNavigationMobile />
      )}
    </>
  );
};
