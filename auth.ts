// auth.ts
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      // Puedes agregar info extra a la sesión si lo deseas
      session.user.id = token.sub;
      return session;
    },
    async redirect({ url, baseUrl }) {
      // Redirige siempre al dashboard después de iniciar sesión
      return `${baseUrl}/dashboard`;
    },
  },
  pages: {
    signIn: "/login", // opcional: redirige a una página de login custom
  },
  secret: process.env.AUTH_SECRET,
});
