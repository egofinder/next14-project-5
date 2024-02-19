import bcrypt from "bcryptjs";
import type { NextAuthConfig } from "next-auth";
import Credentials from "@auth/core/providers/credentials";
import GitHub from "@auth/core/providers/github";
import Google from "@auth/core/providers/google";

import { getUserByEmail } from "@/data/user";

export default {
  debug: true,
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    Credentials({
      async authorize(credentials) {
        if (!credentials.email || !credentials.password) return null;

        const user = await getUserByEmail(credentials.email as string);
        if (!user || !user.hashedPassword) return null;

        const passwordMatch = await bcrypt.compare(
          credentials.password as string,
          user.hashedPassword
        );
        if (passwordMatch) return user;

        return null;
      },
    }),
  ],
  // secret: process.env.NEXTAUTH_SECRET,
} satisfies NextAuthConfig;
