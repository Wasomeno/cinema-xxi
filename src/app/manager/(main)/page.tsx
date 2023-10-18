import { AnimatedContainer } from "@/components/animated-container"
import { ManagerHeader } from "@/components/Headers/manager-header"

export default async function ManagerDashboard() {
  return (
    <div className="flex flex-1 flex-col gap-2 overflow-y-scroll p-4">
      <ManagerHeader>Dashboard</ManagerHeader>
      <AnimatedContainer className="flex h-full justify-center">
        <div className="w-4/6 lg:w-2/6"></div>
      </AnimatedContainer>
    </div>
  )
}
