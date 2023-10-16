"use client"

import { HiGlobe } from "react-icons/hi"
import { HiHome } from "react-icons/hi2"
import { MdLocalMovies } from "react-icons/md"

import { ManagerNavigationMobileLink } from "./manager-navigation-link"

export const ManagerNavigationMobile = () => {
  return (
    <div className="sticky bottom-0 z-10 flex w-full items-center justify-center border-t bg-white shadow-md dark:border-slate-700 dark:bg-slate-900 lg:hidden">
      <ManagerNavigationMobileLink href="/manager" Icon={HiHome}>
        Dashboard
      </ManagerNavigationMobileLink>
      <ManagerNavigationMobileLink href="/manager/movies" Icon={MdLocalMovies}>
        Movies
      </ManagerNavigationMobileLink>
      <ManagerNavigationMobileLink href="/manager/regions" Icon={HiGlobe}>
        Regions
      </ManagerNavigationMobileLink>
    </div>
  )
}
