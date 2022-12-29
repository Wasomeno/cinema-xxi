import React from "react";
import { useAccount } from "wagmi";
import { useSuperAdminStatus } from "../reactQuery/Roles/useSuperAdminStatus";
import ManagerNavMobile from "./ManagerNavMobile";
import NotValidManager from "./NotValidManager";

const ManagerLayout = ({ children }) => {
  const { address } = useAccount();
  const superAdminStatus = useSuperAdminStatus(address);

  return (
    <div className="flex flex-col justify-center items-center">
      {!superAdminStatus ? (
        <NotValidManager />
      ) : (
        <>
          <ManagerNavMobile />
          <main className="w-full h-full">{children}</main>
        </>
      )}
    </div>
  );
};

export default ManagerLayout;
