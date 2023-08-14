import NextAuth from "next-auth"

import { authOptions } from "../../../lib/auth"

export default async function auth(req, res) {
  const url = req.query?.callbackUrl
  return await NextAuth(req, res, {
    ...authOptions,
    pages: {
      signIn: url?.startsWith("/admin") ? "/admin/login" : "/manager/login",
    },
  })
}
