import { Pie } from "react-chartjs-2";

import AnimatedContainer from "@/components/AnimatedContainer";
import { ChartComponent } from "@/components/ChartComponent";
import ManagerHeader from "@/components/Headers/ManagerHeader";
import { ManagerLayout } from "@/components/Layouts/ManagerLayout";

const Dashboard = () => {
  return (
    <div className="flex flex-1 flex-col gap-2 overflow-y-scroll rounded-lg border bg-slate-50 p-4 shadow-[0_3px_10px_rgb(0,0,0,0.2)] dark:border-slate-500 dark:bg-slate-700">
      <ManagerHeader>Dashboard</ManagerHeader>
      <AnimatedContainer className="flex h-full justify-center">
        <div className="w-4/6 lg:w-2/6">
          <ChartComponent
            Chart={Pie}
            data={[1, 2, 3, 4, 5]}
            labels={[
              "Region 1",
              "Region 2",
              "Region 3",
              "Region 4",
              "Region 5",
            ]}
            legend="Region Transactions"
          />
        </div>
      </AnimatedContainer>
    </div>
  );
};

export default function DashboardPage() {
  return (
    <ManagerLayout pageTitle="Dashboard">
      <Dashboard />
    </ManagerLayout>
  );
}
