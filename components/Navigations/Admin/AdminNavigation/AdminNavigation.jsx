import { BsPersonLinesFill } from "react-icons/bs"
import { HiHome } from "react-icons/hi2"
import { IoTimeOutline } from "react-icons/io5"
import { MdMeetingRoom, MdOutlineMovie } from "react-icons/md"

import { AdminNavigationLink } from "./AdminNavigationLink"

export const adminRoutes = [
  {
    title: "Dashboard",
    href: "/admin",
    icon: HiHome,
  },
  {
    title: "Movies",
    href: "/admin/movies",
    icon: MdOutlineMovie,
  },
  {
    title: "Showtimes",
    href: "/admin/showtimes",
    icon: IoTimeOutline,
  },
  {
    title: "Studios",
    href: "/admin/studios",
    icon: MdMeetingRoom,
  },
  {
    title: "Admins",
    href: "/admin/admins",
    icon: BsPersonLinesFill,
  },
]

export const AdminNavigation = () => {
  return (
    <div className="sticky left-0 top-0 z-10 hidden w-[240px] rounded-lg border bg-white dark:border-slate-700 dark:bg-gray-900 lg:block">
      <div className="flex h-5/6 flex-col justify-start">
        <div className="flex flex-col justify-evenly gap-2 overflow-hidden p-3">
          {adminRoutes.map((route) => (
            <AdminNavigationLink
              key={route.title}
              href={route.href}
              Icon={route.icon}
            >
              {route.title}
            </AdminNavigationLink>
          ))}
        </div>
      </div>
    </div>
  )
}
