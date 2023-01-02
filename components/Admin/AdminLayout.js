import React, { useContext, useEffect, useRef, useState } from "react";
import { appContext } from "../../context/AppContext";
import { MoonLoader } from "react-spinners";
import AdminNav from "./AdminNav";
import { useRouter } from "next/router";
import { useAdminDetails } from "../reactQuery/queries/Roles/useAdminDetails";
import { useUserDetails } from "hooks/useUserDetails";
import { useCinemaAdminStatus } from "../reactQuery/queries/Roles/useCinemaAdminStatus";
import { Paragraph } from "../shared/Texts";
import NotValidAdmin from "./NotValidAdmin";

const AdminLayout = ({ children }) => {
  const { user } = useUserDetails();
  const cinemaAdminStatus = useCinemaAdminStatus(1, 1, user);

  return (
    <div className="flex flex-col justify-center items-center">
      {cinemaAdminStatus.isLoading ? (
        <div className="w-screen h-screen flex flex-col justify-center items-center gap-4">
          <Paragraph text="Fetching Details" size="sm" style="medium" />
          <MoonLoader
            loading={cinemaAdminStatus.isLoading}
            size="30px"
            color="black"
          />
        </div>
      ) : (
        <main className="w-full h-full relative">
          {cinemaAdminStatus.data ? (
            <>
              {children}
              <AdminNav width={500} />
            </>
          ) : (
            <NotValidAdmin />
          )}
        </main>
      )}
    </div>
  );
};

export default AdminLayout;
