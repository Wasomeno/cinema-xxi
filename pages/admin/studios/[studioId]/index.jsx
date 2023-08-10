import { prisma } from "lib/prisma"
import { CinemaStudioDetails } from "modules/adminPages/studiosPage/CinemaStudioDetails/CinemaStudioDetails"

import { AdminLayout } from "@/components/Layouts/AdminLayout"

export async function getServerSideProps(context) {
  const { params } = context

  const studioDetails = await prisma.studio.findUnique({
    where: { id: parseInt(params.studioId) },
  })

  return { props: { studioDetails } }
}

export default function CinemaStudioDetailsPage({ studioDetails }) {
  return (
    <AdminLayout pageTitle={`Studio ${studioDetails.studio}`}>
      <CinemaStudioDetails studioDetails={studioDetails} />
    </AdminLayout>
  )
}
