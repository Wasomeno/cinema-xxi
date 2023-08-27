import { useRouter } from "next/router"

import AppLayout from "@/components/Layouts/AppLayout"

export default function SearchPage() {
  const router = useRouter()
  return <AppLayout>{router.query.q}</AppLayout>
}
