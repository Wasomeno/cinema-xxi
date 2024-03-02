"use client"

import { ReactNode } from "react"
import Link from "next/link"
import * as DropdownMenu from "@radix-ui/react-dropdown-menu"
import { BsThreeDots } from "react-icons/bs"

const TableRowMenu = ({ children }: { children: ReactNode }) => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <div className="flex items-center justify-center">
          <BsThreeDots size="20" />
        </div>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content className="w-40 rounded-md bg-slate-100 px-1.5 py-3 font-poppins text-sm shadow-[0_3px_10px_rgb(0,0,0,0.2)] dark:bg-slate-700 lg:w-48 ">
          <div className="mx-2 text-xs font-medium text-gray-600 dark:text-gray-300 lg:text-sm">
            Menu
          </div>
          <DropdownMenu.Separator className="my-2 h-px bg-slate-300 dark:bg-slate-600" />
          <div className="flex flex-col gap-1">{children}</div>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
}

const Button = ({
  children,
  onClick,
}: {
  children: ReactNode
  onClick: () => void
}) => {
  return (
    <DropdownMenu.Item>
      <button
        onClick={onClick}
        className="w-full rounded-md px-2 py-1.5 text-start text-xs transition duration-200 hover:bg-blue-100 hover:dark:bg-slate-600 lg:text-sm"
      >
        {children}
      </button>
    </DropdownMenu.Item>
  )
}
const ButtonLink = ({
  children,
  href,
}: {
  children: ReactNode
  href: string
}) => {
  return (
    <DropdownMenu.Item className="w-full rounded-md px-2 py-1.5 text-start decoration-white transition duration-200 hover:bg-blue-100 hover:dark:bg-slate-600">
      <Link href={href}>{children}</Link>
    </DropdownMenu.Item>
  )
}

TableRowMenu.Button = Button
TableRowMenu.Link = ButtonLink

export default TableRowMenu
