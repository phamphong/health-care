import NextAuth, { User, Session, } from "next-auth"
import { JWT } from 'next-auth/jwt'
import CredentialsProvider from "next-auth/providers/credentials"
import db from "../../../mock/db";

export const authOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "Username" },
      },
      async authorize(credentials, req) {
        let username = req.query?.username;
        let password = req.query?.password;
        await db.read();
        const user = db.data.users.find(u => u.username === username && u.password === password) as unknown;
        if (user) {
          // Any object returned will be saved in `user` property of the JWT
          return user as User
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null
          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      }
    })
  ],
  callbacks: {
    session: async ({ session, token }: { session: Session, token: JWT }) => {
      return session;
    },
    jwt: async ({ user, token }: { user?: User, token: JWT }) => {
      if (user) {
        token.uid = user.id;
      }
      return token;
    },
  },
  jwt: {
    maxAge: 30 * 24 * 60 * 60,
  },
}

export default NextAuth(authOptions)