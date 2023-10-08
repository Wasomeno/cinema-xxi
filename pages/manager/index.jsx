import { Pie } from "react-chartjs-2"

import AnimatedContainer from "@/components/AnimatedContainer"
import { ChartComponent } from "@/components/ChartComponent"
import ManagerHeader from "@/components/Headers/ManagerHeader"
import { ManagerLayout } from "@/components/Layouts/ManagerLayout"

const Dashboard = () => {
  return (
    <div className="flex flex-1 flex-col gap-2 overflow-y-scroll p-4">
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
  )
}

export default function DashboardPage() {
  return (
    <ManagerLayout title="Dashboard">
      <Dashboard />
    </ManagerLayout>
  )
}
