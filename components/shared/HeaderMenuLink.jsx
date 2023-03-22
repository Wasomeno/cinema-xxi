import { useIcon } from "hooks/useIcon";
import Link from "next/link";

const HeaderMenuLink = ({ href, icon, text }) => {
  const LinkIcon = useIcon(icon);
  return (
    <Link
      href={href}
      className="flex h-14 w-11/12 items-center justify-evenly rounded-md bg-slate-50 p-1 shadow-md"
      prefetch={false}
    >
      <div className="w-1/6">
        <LinkIcon size="5" color="stroke-black" />
      </div>
      <div className="w-4/6 text-center">
        <p className="font-poppins text-xs lg:text-sm">{text}</p>
      </div>
    </Link>
  );
};

export default HeaderMenuLink;
