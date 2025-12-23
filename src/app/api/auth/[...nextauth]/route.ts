import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";

import { upsertUser } from "@/lib/data";

import type { NextAuthOptions } from "next-auth"

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async jwt({ token, account, profile }) {
      if (account && profile) {
        token.userId = await upsertUser(account, profile);
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user && token.userId) {
        session.user.id = token.userId as string;
      }
      return session;
    }
  },
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };