import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import prisma from "@/lib/prisma";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      name: "Email & Password",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (creds) => {
        const user = await prisma.user.findUnique({
          where: { email: creds.email },
          include: { institution: true },
        });
        if (!user || !user.password) return null;

        const ok = await bcrypt.compare(creds.password, user.password);
        if (!ok) return null;

        // What goes into the session token
        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          institutionId: user.institutionId,
          institutionStatus: user.institution.status,
        };
      },
    }),
  ],
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.institutionId = user.institutionId;
        token.institutionStatus = user.institutionStatus;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.role = token.role;
        session.user.institutionId = token.institutionId;
        session.user.institutionStatus = token.institutionStatus;
      }
      return session;
    },
    async redirect({ url, baseUrl, token }) {
      // Post-login redirect logic lives here
      if (token?.institutionStatus === "DRAFT") {
        return `${baseUrl}/onboarding/${token.institutionId}`;
      }
      return `${baseUrl}/dashboard`;
    },
  },
  pages: {
    signIn: "/auth/login", // our custom login page
  },
  secret: process.env.AUTH_SECRET,
});
