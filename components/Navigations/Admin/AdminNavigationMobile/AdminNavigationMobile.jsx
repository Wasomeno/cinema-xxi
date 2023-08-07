import { adminRoutes } from "../AdminNavigation/AdminNavigation"
import { AdminNavigationMobileLink } from "./AdminNavigationMobileLink"

export const AdminNavigationMobile = () => {
  return (
    <div className="sticky bottom-0 z-10 flex w-screen items-center justify-start overflow-x-scroll border-t bg-white shadow-md dark:border-slate-700 dark:bg-slate-900  sm:justify-evenly sm:p-1.5 lg:hidden">
      {adminRoutes.map((route) => (
        <AdminNavigationMobileLink
          key={route.title}
          href={route.href}
          Icon={route.icon}
        >
          {route.title}
        </AdminNavigationMobileLink>
      ))}
    </div>
  )
}
