import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import prisma from "@/app/lib/prisma";

const handler = NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID ?? "",
      clientSecret: process.env.GITHUB_SECRET ?? "",
    }),
  ],
  callbacks: {
    async session({ session, token, user }) {
      if (!session.user.email) {
        // NOTE: This should not be reached
        return session;
      }

      // Create default config
      await prisma.config.upsert({
        create: {
          email: session.user.email,
        },
        update: {},
        where: {
          email: session.user.email,
        },
      });

      return session;
    },
  },
});

export { handler as GET, handler as POST };
