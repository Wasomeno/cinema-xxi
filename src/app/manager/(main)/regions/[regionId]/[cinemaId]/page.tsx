import { prisma } from "@/lib/prisma"
import { AnimatedContainer } from "@/components/animated-container"
import { ManagerHeader } from "@/components/Headers/manager-header"

export default async function CinemaPage({
  params,
}: {
  params: { regionId: string; cinemaId: string }
}) {
  const cinema = await prisma.cinema.findUnique({
    where: { id: parseInt(params.cinemaId) },
  })
  return (
    <AnimatedContainer className="bg-white p-4">
      <ManagerHeader>{cinema?.name}</ManagerHeader>
      <div className="flex justify-center">
        <div className="w-full lg:w-4/6">
          <div className="mt-3 w-full">
            <div className="my-3 w-3/6">
              <p className="font-poppins text-xs font-medium text-slate-900 dark:text-slate-50 lg:text-sm">
                Details
              </p>
            </div>

            <div className="flex w-full snap-x gap-4 overflow-x-scroll">
              <div className="flex w-full snap-end items-center justify-center lg:w-3/6">
                <div className="grid w-96 grid-cols-2 gap-4 lg:w-full"></div>
              </div>
              <div className="flex h-full w-full snap-end items-center justify-center lg:w-3/6">
                <div className="grid w-96 grid-cols-2 gap-4 lg:w-full"></div>
              </div>
            </div>
          </div>
          <div className="mt-5 w-full">
            <div className="my-3 w-3/6">
              <p className="font-poppins text-xs font-medium text-slate-900 dark:text-slate-50 lg:text-sm">
                Ticket Sales
              </p>
            </div>
          </div>
        </div>
      </div>
    </AnimatedContainer>
  )
}
