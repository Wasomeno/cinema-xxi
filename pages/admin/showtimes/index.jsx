import { useState } from "react"
import dynamic from "next/dynamic"
import { useRouter } from "next/router"
import { AnimatePresence } from "framer-motion"

import { ShowtimesTable } from "@/components/Admin/Showtimes/ShowtimesTable"
import AdminHeader from "@/components/Headers/AdminHeader"
import { AdminLayout } from "@/components/Layouts/AdminLayout"
import TableRowMenu from "@/components/TableRowMenu"

const AddCinemaShowtimeModal = dynamic(
  async () =>
    (await import("@/components/Admin/Showtimes/AddCinemaShowtimeModal"))
      .AddCinemaShowtimeModal
)

const EditCinemaShowtimeModal = dynamic(
  async () =>
    (await import("@/components/Admin/Showtimes/EditCinemaShowtimeModal"))
      .EditCinemaShowtimeModal
)

const DeleteShowtimeModal = dynamic(
  async () =>
    (await import("@/components/Admin/Showtimes/DeleteShowtimeModal"))
      .DeleteShowtimeModal
)

export default function CinemaShowtimesPage() {
  const [selectedShowtimes, setSelectedShowtimes] = useState([])
  const router = useRouter()
  return (
    <AdminLayout pageTitle="Showtimes">
      <div className="flex w-full flex-1 flex-col rounded-lg p-4">
        <AdminHeader>Showtimes</AdminHeader>
        <ShowtimesTable
          selectedShowtimes={selectedShowtimes}
          setSelectedShowtimes={setSelectedShowtimes}
          rowMenu={(row) => (
            <TableRowMenu>
              <TableRowMenu.Button
                onClick={() =>
                  router.push(
                    `/admin/showtimes?id=${row.original.id}&edit=true`
                  )
                }
              >
                Edit Showtime
              </TableRowMenu.Button>
            </TableRowMenu>
          )}
        />
        <AnimatePresence>
          {router.query.add && (
            <AddCinemaShowtimeModal
              closeModal={() => router.push("/admin/showtimes")}
            />
          )}
          {router.query.edit && (
            <EditCinemaShowtimeModal
              closeModal={() => router.push("/admin/showtimes")}
            />
          )}
          {router.query.delete && (
            <DeleteShowtimeModal
              closeModal={() => router.push("/admin/showtimes")}
              selectedShowtimes={selectedShowtimes}
            />
          )}
        </AnimatePresence>
      </div>
    </AdminLayout>
  )
}
