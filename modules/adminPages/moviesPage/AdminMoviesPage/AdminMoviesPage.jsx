import useToggle from "hooks/useToggle";

import AnimatedContainer from "@/components/AnimatedContainer";
import AdminHeader from "@/components/Headers/AdminHeader";
import { AdminSubHeader } from "@/components/Headers/AdminSubHeader";

import CinemaMovies from "./components/CinemaMovies";

export const AdminMoviesPage = () => {
  const [showMenu, toggleShowMenu] = useToggle(false);
  return (
    <AnimatedContainer className="h-screen overflow-y-scroll bg-opacity-95 p-4 dark:bg-slate-800">
      <AdminHeader>Movies in Cinema</AdminHeader>
      <div className="flex justify-center">
        <div className="w-full lg:w-4/6">
          <AdminSubHeader toggleShowMenu={toggleShowMenu}>
            Cinema Movies
          </AdminSubHeader>
          <CinemaMovies showMenu={showMenu} toggleShowMenu={toggleShowMenu} />
        </div>
      </div>
    </AnimatedContainer>
  );
};
