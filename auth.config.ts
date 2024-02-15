import bcrypt from "bcryptjs";
import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";

import { getUserByEmail } from "@/data/user";

export default {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Github({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    Credentials({
      async authorize(credentials) {
        const { email, password } = credentials;

        if (!email || !password) return null;

        const user = await getUserByEmail(email as string);
        if (!user || !user.hashedPassword) return null;

        const passwordMatch = await bcrypt.compare(
          password as string,
          user.hashedPassword
        );
        if (passwordMatch) return user;

        return null;
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
} satisfies NextAuthConfig;
