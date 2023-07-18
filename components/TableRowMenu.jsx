import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import Link from "next/link";
import { BsThreeDots } from "react-icons/bs";

const TableRowMenu = ({ children }) => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <div className="flex items-center justify-center">
          <BsThreeDots size="20" />
        </div>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content className="w-48 rounded-md bg-slate-100 px-1.5 py-3 font-poppins text-sm shadow-[0_3px_10px_rgb(0,0,0,0.2)] dark:bg-slate-700 ">
          <div className="mx-2 font-medium text-gray-600 dark:text-gray-300">
            Menu
          </div>
          <DropdownMenu.Separator className="my-2 h-px bg-slate-300 dark:bg-slate-600" />
          <div className="flex flex-col gap-1">{children}</div>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

const Button = ({ children, onClick }) => {
  return (
    <DropdownMenu.Item>
      <button
        onClick={onClick}
        className="w-full rounded-md px-2 py-1.5 text-start transition duration-200 hover:bg-blue-100 hover:dark:bg-slate-600"
      >
        {children}
      </button>
    </DropdownMenu.Item>
  );
};
const ButtonLink = ({ children, href }) => {
  return (
    <DropdownMenu.Item>
      <Link
        href={href}
        className="w-full rounded-md px-2 py-1.5 text-start decoration-white transition duration-200 hover:bg-blue-100 hover:dark:bg-slate-600"
      >
        {children}
      </Link>
    </DropdownMenu.Item>
  );
};

TableRowMenu.Button = Button;
TableRowMenu.Link = ButtonLink;

export default TableRowMenu;
