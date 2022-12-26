import React from "react";
import { useUserDetails } from "../../hooks/useUserDetails";
import { Title } from "../../components/shared/Texts";

const ManagerHeader = ({ title }) => {
  const { user, isReconnecting } = useUserDetails();
  return (
    <>
      <div className="flex justify-between items-center h-14">
        <div className="w-3/6">
          <Title text={title} />
        </div>
        <div className="w-3/6 flex justify-end gap-3 items-center">
          <div className="w-3 h-3 rounded-full bg-green-600 shadow-sm" />
          <p className="font-poppins text-sm font-medium">
            {isReconnecting ? "Connecting..." : user?.slice(0, 10)}...
          </p>
        </div>
      </div>
      <hr className="w-full h-0.5 border-none bg-slate-300 rounded-md" />
    </>
  );
};

export default ManagerHeader;
