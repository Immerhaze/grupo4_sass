// auth/register-form.js
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import SignIn from "./signInButton";

export default function RegisterForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    if (loading) return;

    setErr("");
    setLoading(true);

    const fd = new FormData(e.currentTarget);
    const name = fd.get("name")?.toString().trim();
    const email = fd.get("email")?.toString().trim().toLowerCase();
    const password = fd.get("password")?.toString();

    if (!name || !email || !password) {
      setErr("Please fill in all fields.");
      setLoading(false);
      return;
    }

    try {
      // 1) Create institution in DRAFT + super admin user
      const res = await fetch("/api/register-institution", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result?.error || "Registration failed.");

      // 2) Immediately sign in with Credentials
      const callbackUrl =
        `/onboarding/${result.institutionId}` +
        `?name=${encodeURIComponent(result.institutionName || name)}` +
        `&email=${encodeURIComponent(result.email || email)}` +
        (result.onboardingToken ? `&token=${encodeURIComponent(result.onboardingToken)}` : "");

      // Auth.js signIn will redirect for us
      const loginRes = await signIn("credentials", {
        redirect: true,
        email,
        password,
        callbackUrl,
      });

      // If signIn didn't redirect (edge case), push manually
      if (loginRes === undefined) {
        router.push(callbackUrl);
      }
    } catch (e) {
      console.error(e);
      setErr(e.message || "Something went wrong.");
      setLoading(false);
    }
  }

  return (
    <section className="min-h-screen flex flex-col justify-center items-center p-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 space-y-6 animate-fade-in"
      >
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
          Registra tu institución
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Registrar la institución creará un superadmin con el correo seleccionado.
        </p>

        {err && (
          <div className="rounded-md bg-red-50 border border-red-200 p-3 text-sm text-red-700">
            {err}
          </div>
        )}

        <div className="animate-slide-in-right delay-100">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            <span className="icon-[pajamas--user] text-blue-500 text-lg mr-2" />
            Nombre de la institución
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            autoComplete="organization"
            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            disabled={loading}
          />
        </div>

        <div className="animate-slide-in-right delay-200">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            <span className="icon-[proicons--mail] text-blue-500 text-lg mr-2" />
            Email del superadmin
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            disabled={loading}
          />
        </div>

        <div className="animate-slide-in-right delay-300">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            <span className="icon-[teenyicons--password-outline] text-blue-500 text-lg mr-2" />
            Contraseña
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            autoComplete="new-password"
            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            disabled={loading}
          />
        </div>

        <button
          type="submit"
          className={`w-full py-2 px-4 rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200 animate-slide-in-right delay-400 ${
            loading ? "opacity-70 cursor-not-allowed" : "cursor-pointer"
          }`}
          disabled={loading}
        >
          {loading ? "Registrando..." : "Registrar"}
        </button>
      </form>

      <div className="mt-6 animate-fade-in delay-500">
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 text-center">o</p>
        <SignIn />
      </div>
    </section>
  );
}
