import { BsPersonLinesFill } from "react-icons/bs";
import { HiHome } from "react-icons/hi2";
import { IoTimeOutline } from "react-icons/io5";
import { MdMeetingRoom, MdOutlineMovie } from "react-icons/md";

import { AdminNavigationLink } from "./AdminNavigationLink";

export const AdminNavigation = () => {
  return (
    <div className="sticky top-0 z-10 hidden w-[240px] rounded-lg border bg-slate-50 dark:border-slate-500 dark:bg-gray-700 lg:block">
      <div className="flex h-5/6 flex-col justify-start">
        <div className="flex flex-col justify-evenly gap-2 overflow-hidden p-3">
          <AdminNavigationLink href="/admin" Icon={HiHome}>
            Dashboard
          </AdminNavigationLink>
          <AdminNavigationLink href="/admin/movies" Icon={MdOutlineMovie}>
            Movies
          </AdminNavigationLink>
          <AdminNavigationLink href="/admin/showtimes" Icon={IoTimeOutline}>
            Showtimes
          </AdminNavigationLink>
          <AdminNavigationLink href="/admin/studios" Icon={MdMeetingRoom}>
            Studios
          </AdminNavigationLink>
          <AdminNavigationLink href="/admin/admins" Icon={BsPersonLinesFill}>
            Admins
          </AdminNavigationLink>
        </div>
      </div>
    </div>
  );
};
