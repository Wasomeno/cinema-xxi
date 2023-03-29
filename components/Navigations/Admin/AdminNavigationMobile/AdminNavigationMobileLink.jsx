import { useIcon } from "hooks/useIcon";
import Link from "next/link";
import { useMemo } from "react";

export const AdminNavigationMobileLink = ({
  href,
  children,
  icon,
  activeRoute,
}) => {
  const Icon = useIcon(icon);
  const MemoizedIcon = useMemo(() => Icon, []);
  return (
    <Link
      href={"/admin/" + (href === "admin" ? "" : href)}
      className="flex h-16 w-96 flex-col items-center justify-center gap-2 transition duration-300 ease-in-out"
      prefetch={false}
    >
      <span>
        <MemoizedIcon
          size="5"
          color={
            activeRoute === href
              ? "stroke-blue-500 dark:stroke-blue-300"
              : "stroke-slate-800 dark:stroke-slate-50"
          }
        />
      </span>
      <span className="text-center">
        <p
          className={
            (activeRoute === href
              ? "text-blue-500 dark:text-blue-300"
              : "text-slate-800 dark:text-slate-50") +
            " " +
            "font-poppins text-xs font-normal tracking-wide dark:font-light "
          }
        >
          {children}
        </p>
      </span>
    </Link>
  );
};
