import useToggle from "hooks/useToggle";

import AnimatedContainer from "@/components/AnimatedContainer";
import ManagerHeader from "@/components/Headers/ManagerHeader";
import { ManagerSubHeader } from "@/components/ManagerSubHeader";

import { AllMovies } from "./components/AllMovies";

export const ManagerMoviesPage = () => {
  const [showMenu, toggleShowMenu] = useToggle(false);
  return (
    <AnimatedContainer className="overflow-y-scroll p-4">
      <ManagerHeader>Manage Movies</ManagerHeader>
      <div className="flex justify-center">
        <div className="w-full lg:w-4/6">
          <ManagerSubHeader object="movies" toggleShowMenu={toggleShowMenu} />
          <AllMovies showMenu={showMenu} toggleShowMenu={toggleShowMenu} />
        </div>
      </div>
    </AnimatedContainer>
  );
};
