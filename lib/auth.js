import Credentials from "next-auth/providers/credentials"

import { prisma } from "./prisma"

export const authOptions = {
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
      },
      async authorize(credentials) {
        try {
          let userDetails = {}
          const { username, password, role } = credentials
          if (role === "manager") {
            userDetails = await prisma.manager.findUnique({
              where: { username: username },
            })
            if (!username || !password) {
              const error = new Error("password or username can't be empty")
              error.code = 500
              throw error
            } else if (userDetails.password !== password) {
              throw new Error("password don't match")
            } else {
              return {
                ...userDetails,
                role,
                cinemaName: role === "admin" && userDetails.cinema.name,
              }
            }
          } else if (role === "admin") {
            userDetails = await prisma.admin.findUnique({
              where: { username: username },
              include: { cinema: { select: { id: true, name: true } } },
            })
            if (!username || !password) {
              const error = new Error("password or username can't be empty")
              error.code = 500
              throw error
            } else if (userDetails.password !== password) {
              throw new Error("password don't match")
            } else {
              return {
                ...userDetails,
                role,
                cinemaName: role === "admin" && userDetails.cinema.name,
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
          ((token.cinemaId = user.cinemaId),
          (token.cinemaName = user.cinemaName))
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
