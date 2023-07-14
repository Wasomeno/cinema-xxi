import { useRouter } from "next/router";
import { BsPersonLinesFill } from "react-icons/bs";
import { HiHome } from "react-icons/hi2";
import { IoTimeOutline } from "react-icons/io5";
import { MdMeetingRoom, MdOutlineMovie } from "react-icons/md";

import { AdminNavigationMobileLink } from "./AdminNavigationMobileLink";

export const AdminNavigationMobile = () => {
  const { pathname } = useRouter();
  return (
    <div className="sticky bottom-0 z-10 flex w-screen items-center justify-start overflow-x-scroll border bg-slate-50 shadow-md dark:bg-slate-700 sm:justify-evenly sm:p-1.5 lg:hidden">
      <AdminNavigationMobileLink
        href="admin"
        Icon={HiHome}
        activeRoute={pathname}
      >
        Dashboard
      </AdminNavigationMobileLink>
      <AdminNavigationMobileLink
        href="movies"
        Icon={MdOutlineMovie}
        activeRoute={pathname}
      >
        Movies
      </AdminNavigationMobileLink>
      <AdminNavigationMobileLink
        href="showtimes"
        Icon={IoTimeOutline}
        activeRoute={pathname}
      >
        Showtimes
      </AdminNavigationMobileLink>
      <AdminNavigationMobileLink
        href="studios"
        Icon={MdMeetingRoom}
        activeRoute={pathname}
      >
        Studios
      </AdminNavigationMobileLink>
      <AdminNavigationMobileLink
        href="admins"
        Icon={BsPersonLinesFill}
        activeRoute={pathname}
      >
        Admins
      </AdminNavigationMobileLink>
    </div>
  );
};
