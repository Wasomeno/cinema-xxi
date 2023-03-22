import useToggle from "hooks/useToggle";

import { AdminSubHeader } from "@/components/AdminSubHeader";
import AnimatedContainer from "@/components/AnimatedContainer";
import AdminHeader from "@/components/Headers/AdminHeader";

import CinemaShowtimes from "./components/CinemaShowtimes";

export const AdminShowtimesPage = () => {
  const [showMenu, toggleShowMenu] = useToggle(false);
  return (
    <AnimatedContainer className="h-screen p-4">
      <AdminHeader>Showtimes in Cinema</AdminHeader>
      <div className="flex justify-center">
        <div className="w-full lg:w-5/6">
          <AdminSubHeader object="showtimes" toggleShowMenu={toggleShowMenu} />
          <CinemaShowtimes
            showMenu={showMenu}
            toggleShowMenu={toggleShowMenu}
          />
        </div>
      </div>
    </AnimatedContainer>
  );
};
