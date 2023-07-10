import { CinemaAdmins } from "modules/adminPages/adminsPage/CinemaAdmins/CinemaAdmins";

import { AdminLayout } from "@/components/Layouts/AdminLayout";

export default function CinemaAdminsPage() {
  return (
    <AdminLayout pageTitle="Admins">
      <CinemaAdmins />
    </AdminLayout>
  );
}
