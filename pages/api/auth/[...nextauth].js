import { prisma } from "lib/prisma";
import NextAuth from "next-auth/next";
import Credentials from "next-auth/providers/credentials";

export const authOptions = {
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
      authorize: async (credentials) => {
        try {
          let userDetails = {};
          const { username, password, role } = credentials;

          if (role === "manager") {
            userDetails = await prisma.manager.findUnique({
              where: { username: username },
            });
          }

          if (role === "admin") {
            userDetails = await prisma.admin.findUnique({
              where: { username: username },
              include: { cinema: true },
            });
          }

          if (!username || !password) {
            const error = new Error("password or username can't be empty");
            error.code = 404;
            throw error;
          }
          if (userDetails.password !== password) {
            throw new Error("password don't match");
          }
          return { ...userDetails, role: role };
        } catch (error) {
          throw error;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account, user }) {
      if (account && user.role === "admin") {
        token.userDetails = {
          id: user.id,
          cinemaId: user.cinema.id,
          cinemaName: user.cinema.name,
        };
      }
      if (account && user.role === "manager") {
        token.userDetails = {
          id: user.id,
        };
      }
      return token;
    },
    async session({ session, token, user }) {
      session.user = { ...session.user, ...token.userDetails };
      return session;
    },
  },
};

export default NextAuth(authOptions);
