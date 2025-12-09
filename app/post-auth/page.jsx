// app/post-auth/page.jsx
import { redirect } from "next/navigation";
import { stackServerApp } from "@/stack/server";
import prisma from "@/lib/prisma";

export default async function PostAuthPage() {
  const user = await stackServerApp.getUser({
    or: "redirect",
  });

  // 1. ¿Ya está enlazado a un AppUser?
  let appUser = await prisma.appUser.findUnique({
    where: { authUserId: user.id },
    include: { institution: true },
  });

  // 2. Si no, intentamos enlazarlo por email (primer login del super admin)
  if (!appUser && user.primaryEmail) {
    const email = user.primaryEmail.toLowerCase();

    const pending = await prisma.appUser.findFirst({
      where: {
        email: email, // SOLO por email
      },
      include: { institution: true },
    });

    // Solo enlazamos si todavía no tiene authUserId
    if (pending && !pending.authUserId) {
      appUser = await prisma.appUser.update({
        where: { id: pending.id },
        data: { authUserId: user.id },
        include: { institution: true },
      });
    }
  }

  // 3. Si DESPUÉS de todo esto hay appUser → ya tiene perfil interno → dashboard
  if (appUser) {
    return redirect("/dashboard");
  }

  // 4. Si NO hay appUser → este usuario todavía no existe dentro de DUCTU
  //    → lo mandamos a hacer onboarding (crear institución + super admin)
  return redirect("/onboarding");
}
