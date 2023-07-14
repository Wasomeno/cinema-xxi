import { CinemaSearch } from "modules/appPages/cinemaPages/CinemaSearch";

import AppLayout from "@/components/Layouts/AppLayout";

export default function AppCinemaSearchPage() {
  return (
    <AppLayout pageTitle="Search">
      <CinemaSearch />
    </AppLayout>
  );
}
