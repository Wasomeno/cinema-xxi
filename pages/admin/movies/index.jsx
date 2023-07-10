import { CinemaMovies } from "modules/adminPages/moviesPage/CinemaMovies";

import { AdminLayout } from "@/components/Layouts/AdminLayout";

export default function CinemaMoviesPage() {
  return (
    <AdminLayout pageTitle="Movies">
      <CinemaMovies />
    </AdminLayout>
  );
}
