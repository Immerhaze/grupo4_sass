import crypto from "crypto";
import bcrypt from "bcrypt";
import prisma from "@/lib/prisma";

export async function POST(req) {
  try {
    const { name, email, password } = await req.json();
    if (!name || !email || !password) {
      return new Response(JSON.stringify({ error: "Missing name, email or password" }), { status: 400 });
    }

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return new Response(JSON.stringify({ error: "Email already in use" }), { status: 400 });
    }

    const onboardingToken = crypto.randomBytes(24).toString("hex");
    const onboardingExpiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7);

    const hashed = await bcrypt.hash(password, 10);

    const institution = await prisma.institution.create({
      data: {
        name,
        contactEmail: email,
        status: "DRAFT",
        onboardingToken,
        onboardingExpiresAt,
        users: {
          create: {
            name: "Superadmin",
            email,
            role: "SUPER_ADMIN",
            password: hashed, // <= important
          },
        },
      },
      include: { users: true },
    });

    return new Response(
      JSON.stringify({
        ok: true,
        institutionId: institution.id,
        institutionName: institution.name,
        email,
        onboardingToken,
      }),
      { status: 201 }
    );
  } catch (err) {
    console.error("register-institution", err);
    return new Response(JSON.stringify({ error: "Server error" }), { status: 500 });
  }
}
