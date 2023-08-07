import Link from "next/link"
import { useRouter } from "next/router"
import clsx from "clsx"
import { twMerge } from "tailwind-merge"

export const ManagerNavigationLink = ({ href, children, Icon }) => {
  const { pathname } = useRouter()
  return (
    <Link
      href={href}
      className={twMerge(
        clsx(
          "flex h-16 w-full items-center justify-start overflow-hidden rounded-lg transition duration-300 ease-in-out hover:bg-blue-100 hover:dark:bg-blue-900",
          pathname.includes(href) &&
            href !== "/manager" &&
            "bg-blue-100 dark:bg-blue-900"
        )
      )}
    >
      <span className="flex w-[90px] justify-center">
        <Icon size="22" className="text-slate-400 dark:text-slate-300" />
      </span>
      <span className="w-5/6 text-sm font-medium text-slate-800 dark:text-slate-100">
        {children}
      </span>
    </Link>
  )
}
