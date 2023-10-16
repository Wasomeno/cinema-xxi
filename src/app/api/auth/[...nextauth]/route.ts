import { NextRequest, NextResponse } from "next/server"
import NextAuth from "next-auth"

import { authOptions } from "@/lib/auth"

async function auth(req: NextRequest, res: any) {
  const callbackUrl = req.nextUrl.searchParams.get("callbackUrl")
  return await NextAuth(req, res, {
    ...authOptions,
    pages: {
      signIn: callbackUrl?.startsWith("/admin")
        ? "/admin/login"
        : "/manager/login",
    },
  })
}

export { auth as GET, auth as POST }
