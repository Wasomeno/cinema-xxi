import { CinemaStudios } from "modules/adminPages/studiosPage/CinemaStudios";

import { AdminLayout } from "@/components/Layouts/AdminLayout";

export default function CinemaStudiosPage() {
  return (
    <AdminLayout pageTitle="Studios">
      <CinemaStudios />
    </AdminLayout>
  );
}
