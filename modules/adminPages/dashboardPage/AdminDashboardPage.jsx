import AnimatedContainer from "@/components/AnimatedContainer";
import AdminHeader from "@/components/Headers/AdminHeader";

export const AdminDashboardPage = () => {
  return (
    <AnimatedContainer className="h-screen bg-opacity-95 p-4 dark:bg-slate-800">
      <AdminHeader>Admin Dashboard</AdminHeader>
    </AnimatedContainer>
  );
};
