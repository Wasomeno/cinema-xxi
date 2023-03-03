import useToggle from "hooks/useToggle";

import { AdminSubHeader } from "@/components/AdminSubHeader";
import AnimatedContainer from "@/components/AnimatedContainer";
import AdminHeader from "@/components/Headers/AdminHeader";

import CinemaMovieList from "./components/CinemaMovieList";
import CinemaMovieMenu from "./components/CinemaMovieMenu";

export const AdminMoviesPage = () => {
  const [deleteMode, toggleDeleteMode] = useToggle(false);
  return (
    <AnimatedContainer className="h-screen p-4">
      <AdminHeader>Movies in Cinema</AdminHeader>
      <div className="flex justify-center">
        <div className="w-full lg:w-5/6">
          <AdminSubHeader
            object="movies"
            toggleDeleteMode={toggleDeleteMode}
            SubHeaderMenu={CinemaMovieMenu}
          />
          <CinemaMovieList
            deleteMode={deleteMode}
            toggleDeleteMode={toggleDeleteMode}
          />
        </div>
      </div>
    </AnimatedContainer>
  );
};
