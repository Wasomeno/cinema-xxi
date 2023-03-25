import useToggle from "hooks/useToggle";

import { AdminSubHeader } from "@/components/AdminSubHeader";
import AnimatedContainer from "@/components/AnimatedContainer";
import AdminHeader from "@/components/Headers/AdminHeader";

import { CinemaStudios } from "./components/CinemaStudios";

export const AdminStudioPage = () => {
  const [showMenu, toggleShowMenu] = useToggle(false);
  return (
    <AnimatedContainer className="h-screen p-4">
      <AdminHeader>Studios</AdminHeader>
      <div className="flex justify-center">
        <div className="w-full lg:w-4/6">
          <AdminSubHeader toggleShowMenu={toggleShowMenu}>
            Cinema Studios
          </AdminSubHeader>
          <CinemaStudios showMenu={showMenu} toggleShowMenu={toggleShowMenu} />
        </div>
      </div>
    </AnimatedContainer>
  );
};
