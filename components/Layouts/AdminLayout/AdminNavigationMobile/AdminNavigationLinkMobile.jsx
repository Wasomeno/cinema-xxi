import Link from "next/link";

import { iconMap } from "@/components/Icons/iconMap";

export const AdminNavigationLinkMobile = ({
  href,
  children,
  icon,
  activeRoute,
}) => {
  const Icon = iconMap[icon];
  return (
    <Link
      href={"/admin/" + (href === "admin" ? "" : href)}
      className="flex h-16 w-96 flex-col items-center justify-center gap-2 transition duration-300 ease-in-out"
      prefetch={false}
    >
      <span>
        <Icon
          size="5"
          color={activeRoute === href ? "stroke-blue-800" : "stroke-black"}
        />
      </span>
      <span className="text-center">
        <p
          className={
            (activeRoute === href ? "text-blue-800" : "text-slate-900") +
            " " +
            "font-poppins text-xs"
          }
        >
          {children}
        </p>
      </span>
    </Link>
  );
};
