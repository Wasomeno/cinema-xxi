import { useRouter } from "next/router"
import { AdminLoginPage } from "modules/adminPages/AdminLoginPage"
import { useSession } from "next-auth/react"

const LoginPage = () => {
  const session = useSession()
  const router = useRouter()
  if (session.data?.user.role === "admin") router.push("/admin")
  return <AdminLoginPage />
}

export default LoginPage
