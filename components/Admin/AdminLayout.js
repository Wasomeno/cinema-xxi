import { useQuery } from "@tanstack/react-query";
import React, { useContext, useEffect, useRef, useState } from "react";
import { appContext } from "../../context/AppContext";
import { rolesContract } from "../../hooks/useContract";
import { MoonLoader } from "react-spinners";
import AdminNav from "./AdminNav";
import { useRouter } from "next/router";
import { checkConnected } from "../../fetchers/fetchers";

const AdminLayout = ({ children }) => {
  const [width, setWidth] = useState(0);
  const router = useRouter();
  const user = useContext(appContext).account[0];
  const screenSize = useRef();
  const setAdminDetails = useContext(appContext).setAdminDetails;
  const userDetails = useQuery(["adminDetails", user], () =>
    checkConnected(user)
  );

  useEffect(() => {
    if (!userDetails.isLoading) {
      setAdminDetails({
        region: userDetails.data.region,
        cinema: userDetails.data.cinema,
      });
      setWidth(screenSize.current.clientWidth);
      screenSize.current.addEventListener("resize", () =>
        setWidth(screenSize.current.clientWidth)
      );
    }
    console.log(width);
  }, [userDetails.isLoading, width]);

  return userDetails.isLoading ? (
    <div className="w-screen h-screen flex flex-col justify-center items-center">
      <p className="font-poppins text-xl font-medium m-2 my-4">
        Fetching Details
      </p>
      <MoonLoader loading={userDetails.isLoading} size={50} color={"black"} />
    </div>
  ) : userDetails.data.region !== 0 ? (
    <main
      ref={screenSize}
      className="h-screen flex-col items-center justify-evenly relative"
    >
      {children}
      <div className="h-20 w-full">
        <AdminNav width={width} />
      </div>
    </main>
  ) : (
    <div className="w-screen h-screen flex flex-col justify-center items-center">
      <p className="font-poppins text-xl font-medium m-2 my-4">
        You are not an Admin
      </p>
      <button
        className="bg-slate-100 p-2 font-poppins font-medium text-lg w-1/6 rounded-xl shadow-md transition duration-300 ease-in-out hover:bg-black hover:text-white"
        onClick={() => router.push("/app")}
      >
        Back to App
      </button>
    </div>
  );
};

export default AdminLayout;
