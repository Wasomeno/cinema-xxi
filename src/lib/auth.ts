import { NextAuthOptions } from "next-auth"
import Credentials from "next-auth/providers/credentials"

import { prisma } from "./prisma"

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        username: {
          label: "Username",
          type: "text",
        },
        password: { label: "Password", type: "password" },
        role: { type: "text" },
      },
      // @ts-expect-error
      async authorize(credentials) {
        try {
          if (credentials?.role === "manager") {
            const managerDetails = await prisma.manager.findUnique({
              where: { username: credentials.username },
            })
            if (!credentials.username || !credentials.password) {
              const error = new Error("password or username can't be empty")
              throw error
            } else if (managerDetails?.password !== credentials.password) {
              throw new Error("password don't match")
            } else {
              return {
                ...managerDetails,
                role: credentials.role,
              }
            }
          } else if (credentials?.role === "admin") {
            const adminDetails = await prisma.admin.findUnique({
              where: { username: credentials.username },
              include: { cinema: { select: { id: true, name: true } } },
            })
            if (!credentials.username || !credentials.password) {
              const error = new Error("password or username can't be empty")
              throw error
            } else if (adminDetails?.password !== credentials.password) {
              throw new Error("password don't match")
            } else {
              return {
                ...adminDetails,
                role: credentials.role,
                cinema: {
                  id: adminDetails.cinemaId,
                  name: adminDetails.cinema.name,
                },
              }
            }
          } else {
            throw new Error("roles does not exists")
          }
        } catch (error) {
          throw error
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.username = user.username
        token.name = user.name
        token.role = user.role
        user.role === "admin" &&
          (token.cinema = { id: user?.cinema?.id, name: user?.cinema?.name })
      }
      return token
    },
    async session({ session, token }) {
      session.user = { ...token }
      return session
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
}
