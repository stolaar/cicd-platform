import NextAuth from "next-auth/next"
import CredentialsProvider from "next-auth/providers/credentials"
import { IUser } from "../../../types/next-auth"
import axios from "axios"

export default NextAuth({
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { type: "text" },
        password: { type: "password" },
      },
      async authorize(credentials) {
        const payload = {
          email: credentials?.email,
          password: credentials?.password,
        }

        try {
          const { data: user } = await axios.post(
            `${process.env.BACKEND_URL}/api/auth/login`,
            payload,
          )

          if (user) {
            return user
          }

          return null
        } catch (error) {
          throw new Error(error)
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user, account }) {
      if (account && user) {
        token.user = user as unknown as IUser
        return {
          ...token,
          accessToken: token.user.accessToken,
        }
      }
      return token
    },

    async session({ session, token }) {
      session.user = token.user

      return session
    },
  },
  secret: "secret", // Hardcoded only because we need to get the user payload in middleware.ts, as next-auth requires this secret (NEXTAUTH_SECRET)
  debug: process.env.NODE_ENV === "development",
})
