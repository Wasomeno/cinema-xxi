import { useState } from "react"
import { useRouter } from "next/router"
import { AnimatePresence } from "framer-motion"

import ManagerHeader from "@/components/Headers/ManagerHeader"
import { ManagerLayout } from "@/components/Layouts/ManagerLayout"
import { AddRegionModal } from "@/components/Manager/Regions/AddRegionModal"
import { AllRegionsTable } from "@/components/Manager/Regions/AllRegionsTable"
import { DeleteRegionsModal } from "@/components/Manager/Regions/DeleteRegionsModal"
import { EditRegionModal } from "@/components/Manager/Regions/EditRegionModal"

const Regions = () => {
  const [selectedRegions, setSelectedRegions] = useState([])
  const router = useRouter()
  return (
    <div className="flex flex-1 flex-col gap-2 overflow-y-scroll p-4">
      <ManagerHeader>Manage Regions</ManagerHeader>
      <AllRegionsTable
        selectedRegions={selectedRegions}
        setSelectedRegions={setSelectedRegions}
      />
      <AnimatePresence>
        {router.query.add && (
          <AddRegionModal closeModal={() => router.push("/manager/regions")} />
        )}
        {router.query.edit && (
          <EditRegionModal closeModal={() => router.push("/manager/regions")} />
        )}
        {router.query.delete && (
          <DeleteRegionsModal
            closeModal={() => router.push("/manager/regions")}
            selectedRegions={selectedRegions}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

export default function RegionsPage() {
  return (
    <ManagerLayout pageTitle="Regions">
      <Regions />
    </ManagerLayout>
  )
}
