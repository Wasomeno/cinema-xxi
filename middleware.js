import { withAuth } from "next-auth/middleware"

export default withAuth({
  callbacks: {
    authorized: ({ req, token }) => {
      if (req.nextUrl.pathname.startsWith("/admin")) {
        return token?.role === "admin"
      } else if (req.nextUrl.pathname.startsWith("/manager")) {
        return token?.role === "manager"
      } else {
        return token !== null
      }
    },
  },
})

export const config = {
  matcher: [
    "/admin",
    "/admin/movies",
    "/admin/showtimes/",
    "/admin/studios",
    "/admin/admins",
    "/manager",
    "/manager/regions",
    "/manager/movies",
    "/manager/regions/:path*",
  ],
}
