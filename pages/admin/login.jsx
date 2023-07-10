import { AdminLoginPage } from "modules/adminPages/AdminLoginPage";

import { AdminLayout } from "@/components/Layouts/AdminLayout";

const LoginPage = () => {
  return (
    <AdminLayout pageTitle="Login">
      <AdminLoginPage />
    </AdminLayout>
  );
};

export default LoginPage;
