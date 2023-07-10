import { CinemaDashboard } from "modules/adminPages/dashboardPage";

import { AdminLayout } from "@/components/Layouts/AdminLayout";

export default function CinemaDashboardPage() {
  return (
    <AdminLayout pageTitle="Dashboard">
      <CinemaDashboard />
    </AdminLayout>
  );
}
