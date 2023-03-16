import useToggle from "hooks/useToggle";
import dynamic from "next/dynamic";

import { AdminSubHeader } from "@/components/AdminSubHeader";
import AnimatedContainer from "@/components/AnimatedContainer";
import AdminHeader from "@/components/Headers/AdminHeader";

import CinemaMovieList from "./components/CinemaMovieList";

export const AdminMoviesPage = () => {
  const [deleteMode, toggleDeleteMode] = useToggle(false);
  const [showMenu, toggleShowMenu] = useToggle(false);

  const CinemaMovieMenu = dynamic(() => import("./components/CinemaMovieMenu"));

  return (
    <AnimatedContainer className="h-screen p-4">
      <AdminHeader>Movies in Cinema</AdminHeader>
      <div className="flex justify-center">
        <div className="w-full lg:w-5/6">
          <AdminSubHeader
            object="movies"
            toggleDeleteMode={toggleDeleteMode}
            toggleShowMenu={toggleShowMenu}
          />
          <CinemaMovieList
            deleteMode={deleteMode}
            toggleDeleteMode={toggleDeleteMode}
          />
        </div>
      </div>
      {showMenu && (
        <CinemaMovieMenu
          toggleDeleteMode={toggleDeleteMode}
          toggleShowMenu={toggleShowMenu}
        />
      )}
    </AnimatedContainer>
  );
};
