"use client"

import { HiGlobe, HiHome } from "react-icons/hi"
import { MdLocalMovies } from "react-icons/md"

import { ManagerNavigationLink } from "./manager-navigation-link"

export function ManagerNavigation() {
  return (
    <div className="sticky z-10 rounded-lg border bg-white dark:border-slate-700 dark:bg-slate-900">
      <div className="flex w-[240px] flex-col justify-start">
        <div className="flex h-3/6 flex-col justify-start gap-3 overflow-hidden p-3">
          <ManagerNavigationLink href="/manager" Icon={HiHome}>
            Dashboard
          </ManagerNavigationLink>
          <ManagerNavigationLink href="/manager/movies" Icon={MdLocalMovies}>
            Movies
          </ManagerNavigationLink>
          <ManagerNavigationLink href="/manager/regions" Icon={HiGlobe}>
            Regions
          </ManagerNavigationLink>
        </div>
      </div>
    </div>
  )
}
