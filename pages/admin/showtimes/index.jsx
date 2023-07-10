import { CinemaShowtimes } from "modules/adminPages/showtimesPage/CinemaShowtimes";

import { AdminLayout } from "@/components/Layouts/AdminLayout";

export default function CinemaShowtimesPage() {
  return (
    <AdminLayout pageTitle="Showtimes">
      <CinemaShowtimes />
    </AdminLayout>
  );
}
