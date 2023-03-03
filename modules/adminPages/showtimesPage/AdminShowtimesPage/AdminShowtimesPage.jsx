import AnimatedContainer from "@/components/AnimatedContainer";
import AdminHeader from "@/components/Headers/AdminHeader";

import CinemaShowtimes from "./components/CinemaShowtimes";

export const AdminShowtimesPage = () => {
  return (
    <AnimatedContainer className="h-screen p-4">
      <AdminHeader>Showtimes in Cinema</AdminHeader>
      <CinemaShowtimes />
    </AnimatedContainer>
  );
};
