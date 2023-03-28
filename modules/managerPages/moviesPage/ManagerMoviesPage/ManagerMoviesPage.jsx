import useToggle from "hooks/useToggle";

import AnimatedContainer from "@/components/AnimatedContainer";
import ManagerHeader from "@/components/Headers/ManagerHeader";
import { ManagerSubHeader } from "@/components/Headers/ManagerSubHeader";

import { AllMovies } from "./components/AllMovies";

export const ManagerMoviesPage = () => {
  const [showMenu, toggleShowMenu] = useToggle(false);
  return (
    <AnimatedContainer className="h-screen overflow-y-scroll bg-opacity-95 p-4 dark:bg-slate-800">
      <ManagerHeader>Manage Movies</ManagerHeader>
      <div className="flex justify-center">
        <div className="w-full lg:w-4/6">
          <ManagerSubHeader toggleShowMenu={toggleShowMenu}>
            Movie list
          </ManagerSubHeader>
          <AllMovies showMenu={showMenu} toggleShowMenu={toggleShowMenu} />
        </div>
      </div>
    </AnimatedContainer>
  );
};
