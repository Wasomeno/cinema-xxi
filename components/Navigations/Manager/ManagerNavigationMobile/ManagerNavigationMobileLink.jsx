import Link from "next/link";
import { twMerge } from "tailwind-merge";

export const ManagerNavigationMobileLink = ({
  activeRoute,
  route,
  text,
  Icon,
}) => {
  return (
    <Link
      href={"/manager/" + (route === "manager" ? "" : route)}
      className="flex h-16 w-4/12 flex-col items-center justify-center gap-1.5 p-2 transition duration-300 ease-in-out"
      prefetch={false}
    >
      <span>
        <Icon
          size="18"
          className={twMerge(
            "text-slate-400",
            activeRoute === route && "text-blue-500"
          )}
        />
      </span>
      <span className="text-center">
        <p
          className={twMerge(
            "font-poppins text-xs tracking-wider text-slate-400 dark:text-slate-50",
            activeRoute === route && "text-blue-500"
          )}
        >
          {text}
        </p>
      </span>
    </Link>
  );
};
