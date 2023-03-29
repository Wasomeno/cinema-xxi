import { useIcon } from "hooks/useIcon";
import Link from "next/link";
import { useMemo } from "react";

export const ManagerNavigationMobileLink = ({
  activeRoute,
  route,
  text,
  icon,
}) => {
  const Icon = useIcon(icon);
  const MemoizedIcon = useMemo(() => Icon, []);
  return (
    <Link
      href={"/manager/" + (route === "manager" ? "" : route)}
      className="flex h-16 w-4/12 flex-col items-center justify-center gap-2 p-2 transition duration-300 ease-in-out"
      prefetch={false}
    >
      <span>
        <MemoizedIcon
          size="5"
          color={
            activeRoute === route
              ? "stroke-blue-500 dark:stroke-blue-300"
              : "stroke-slate-800 dark:stroke-slate-50"
          }
        />
      </span>
      <span className="text-center">
        <p
          className={
            (activeRoute === route
              ? "text-blue-500 dark:text-blue-300 "
              : "text-slate-800 dark:text-slate-50") +
            " font-poppins text-xs tracking-wider"
          }
        >
          {text}
        </p>
      </span>
    </Link>
  );
};
