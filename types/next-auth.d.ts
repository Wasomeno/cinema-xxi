import { Cinema } from "@prisma/client"
import NextAuth, { DefaultSession, DefaultUser } from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      username?: string
      role?: string
      picture?: string | null
      cinema?: Cinema
    } & DefaultSession["user"]
  }
  interface User extends DefaultUser {
    cinema?: Cinema
    username?: string
    role?: string
    picture?: string | null
  }
}
