// app/onboarding/page.jsx
import { stackServerApp } from "@/stack/server";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

export default async function OnboardingPage() {
  const user = await stackServerApp.getUser({
    or: "redirect",
  });

  async function handleOnboarding(formData) {
    "use server";

    const institutionName = formData.get("institutionName")?.toString().trim();
    const superAdminName = formData.get("superAdminName")?.toString().trim();
    const superAdminEmail = formData.get("superAdminEmail")?.toString().trim();

    if (!institutionName || !superAdminName || !superAdminEmail) {
      // luego puedes manejar errores mejor
      return;
    }

    // 1. Crear institución
    const institution = await prisma.institution.create({
      data: {
        name: institutionName,
        contactEmail: superAdminEmail, // por ahora lo usamos también como contacto
        status: "draft",
      },
    });

    // 2. Crear AppUser "reservado" para el super admin
    await prisma.appUser.create({
      data: {
        email: superAdminEmail,
        fullName: superAdminName,
        role: "ADMINISTRATIVE",
        institutionId: institution.id,
        authUserId: null, // se llenará cuando esa persona se loguee
      },
    });

    // 3. Enviar a pantalla de confirmación
    return redirect("/onboarding/complete");
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="w-full max-w-xl bg-white rounded-xl shadow-lg p-8 space-y-6">
        <h1 className="text-2xl font-bold text-slate-900">
          Registrar institución en DUCTU
        </h1>
        <p className="text-sm text-slate-600">
          Vamos a crear la institución y definir quién será el administrador principal.
        </p>

        <form action={handleOnboarding} className="space-y-6">
          {/* DATOS INSTITUCIÓN */}
          <section className="space-y-4">
            <h2 className="text-lg font-semibold text-slate-800">
              Datos de la institución
            </h2>

            <div>
              <label
                htmlFor="institutionName"
                className="block text-sm font-medium text-slate-700"
              >
                Nombre de la institución *
              </label>
              <input
                id="institutionName"
                name="institutionName"
                required
                className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Colegio San Martín"
              />
            </div>
          </section>

          {/* DATOS SUPER ADMIN */}
          <section className="space-y-4">
            <h2 className="text-lg font-semibold text-slate-800">
              Primer administrador de la institución
            </h2>

            <div>
              <label
                htmlFor="superAdminName"
                className="block text-sm font-medium text-slate-700"
              >
                Nombre completo del administrador *
              </label>
              <input
                id="superAdminName"
                name="superAdminName"
                required
                className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Nombre y apellido"
              />
            </div>

            <div>
              <label
                htmlFor="superAdminEmail"
                className="block text-sm font-medium text-slate-700"
              >
                Email del administrador (para entrar a DUCTU) *
              </label>
              <input
                id="superAdminEmail"
                name="superAdminEmail"
                type="email"
                required
                className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="admin@institucion.cl"
              />
            </div>

            <p className="text-xs text-slate-500">
              Más adelante, este administrador podrá invitar a otros usuarios
              (profesores, estudiantes, equipo administrativo).
            </p>
          </section>

          <button
            type="submit"
            className="w-full rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
          >
            Crear institución
          </button>
        </form>
      </div>
    </main>
  );
}
