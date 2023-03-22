import { useIcon } from "hooks/useIcon";
import Link from "next/link";
import { useMemo } from "react";

export const ManagerNavigationMobileLink = ({
  activeRoute,
  route,
  text,
  icon,
}) => {
  const Icon = useMemo(() => useIcon(icon), [icon]);
  return (
    <Link
      href={"/manager/" + (route === "manager" ? "" : route)}
      className="flex h-16 w-4/12 flex-col items-center justify-center gap-2 p-2 transition duration-300 ease-in-out"
      prefetch={false}
    >
      <span>
        <Icon
          size="5"
          color={activeRoute === route ? "stroke-blue-800" : "stroke-black"}
        />
      </span>
      <span className="text-center">
        <p
          className={
            (activeRoute === route ? "text-blue-800 " : "") +
            "font-poppins text-xs"
          }
        >
          {text}
        </p>
      </span>
    </Link>
  );
};
