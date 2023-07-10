import { CinemaSearchList } from "modules/appPages/cinemaPages/CinemaListPage";

import AppLayout from "@/components/Layouts/AppLayout";

export default function AppCinemaSearchPage() {
  return (
    <AppLayout pageTitle="Search">
      <CinemaSearchList />
    </AppLayout>
  );
}
