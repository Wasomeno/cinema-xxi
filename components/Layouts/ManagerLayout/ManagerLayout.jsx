import { useViewport } from "hooks/useViewport";
import { ManagerLoginPage } from "modules/managerPages/ManagerLoginPage";
import dynamic from "next/dynamic";
import { useSession } from "next-auth/react";

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
  const { data: sessionData } = useSession();
  const viewport = useViewport();

  if (!sessionData) return <ManagerLoginPage />;

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
