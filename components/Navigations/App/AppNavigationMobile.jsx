import Link from "next/link"
import { useRouter } from "next/router"
import clsx from "clsx"
import {
  HiOutlineHome,
  HiOutlineRectangleStack,
  HiOutlineTicket,
} from "react-icons/hi2"
import { twMerge } from "tailwind-merge"

const appPaths = [
  {
    text: "Home",
    href: "/app",
    Icon: HiOutlineHome,
  },
  {
    text: "Cinemas",
    href: "/app/cinemas",
    Icon: HiOutlineRectangleStack,
  },
  {
    text: "Transactions",
    href: "/app/transactions",
    Icon: HiOutlineTicket,
  },
]

const AppNavigationMobile = () => {
  const { pathname } = useRouter()
  return (
    <div className="sticky bottom-0 z-10 flex h-16 w-full items-center justify-evenly border-t bg-white shadow-md backdrop-blur-md dark:border-slate-800 dark:bg-slate-950 md:hidden lg:hidden">
      {appPaths.map((path) => (
        <Link
          key={path.text}
          href={path.href}
          className="flex h-full w-3/6 flex-col items-center justify-center gap-1 transition duration-200"
        >
          <path.Icon
            size="18"
            className={twMerge(
              clsx(
                "font-poppins text-xs tracking-wider text-slate-400 dark:text-slate-50",
                pathname === path.href && "text-blue-500 dark:text-blue-300"
              )
            )}
          />
          <span
            className={twMerge(
              clsx(
                "font-poppins text-xs tracking-wider text-slate-400 dark:text-slate-50",
                pathname === path.href && "text-blue-500 dark:text-blue-300"
              )
            )}
          >
            {path.text}
          </span>
        </Link>
      ))}
    </div>
  )
}

export default AppNavigationMobile
