import Link from "next/link"
import { useRouter } from "next/router"
import { twMerge } from "tailwind-merge"

export const ManagerNavigationMobileLink = ({ href, children, Icon }) => {
  const { pathname } = useRouter()
  return (
    <Link
      href={href}
      className="flex h-16 w-4/12 flex-col items-center justify-center gap-1.5 p-2 transition duration-300 ease-in-out"
      prefetch={false}
    >
      <span>
        <Icon
          size="18"
          className={twMerge(
            "text-slate-400",
            pathname === href && "text-blue-500 dark:text-blue-300"
          )}
        />
      </span>
      <span
        className={twMerge(
          "text-center font-poppins text-xs tracking-wider text-slate-400 dark:text-slate-50",
          pathname === href && "text-blue-500 dark:text-blue-300"
        )}
      >
        {children}
      </span>
    </Link>
  )
}
