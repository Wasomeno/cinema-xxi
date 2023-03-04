import useToggle from "hooks/useToggle";

import AnimatedContainer from "@/components/AnimatedContainer";
import ManagerHeader from "@/components/Headers/ManagerHeader";
import { ManagerSubHeader } from "@/components/ManagerSubHeader";

import ManagerMoviesMenu from "./components/ManagerMoviesMenu";
import { MovieList } from "./components/MovieList";

export const ManagerMoviesPage = () => {
  const [deleteMode, toggleDeleteMode] = useToggle(false);
  return (
    <AnimatedContainer className="relative h-screen overflow-y-scroll p-4">
      <ManagerHeader>Manage Movies</ManagerHeader>
      <div className="flex justify-center">
        <div className="w-full lg:w-5/6">
          <ManagerSubHeader
            object="movies"
            SubHeaderMenu={ManagerMoviesMenu}
            toggleDeleteMode={toggleDeleteMode}
          />
          <MovieList
            deleteMode={deleteMode}
            toggleDeleteMode={toggleDeleteMode}
          />
        </div>
      </div>
    </AnimatedContainer>
  );
};
