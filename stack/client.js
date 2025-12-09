import { StackClientApp } from "@stackframe/stack";

export const stackClientApp = new StackClientApp({
  tokenStore: "nextjs-cookie",
   urls: {
    // Página principal de tu app
    home: "/",

    // Dónde está tu página de login / registro
    // (tú usas /auth con el toggle)
    signIn: "/auth?login=true",
    signUp: "/auth?login=false",

    // 🚀 IMPORTANTE: adónde ir DESPUÉS de iniciar sesión / registrarse
    afterSignIn: "/post-auth",
    afterSignUp: "/post-auth",
  },
});
