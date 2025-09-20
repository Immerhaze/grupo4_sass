// components/SignInButton.tsx
"use client"

import { signIn } from "next-auth/react"

export default function SignInButton() {
  return (
    <button
      onClick={() => signIn("google")}
      className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-md shadow hover:bg-gray-100 transition  cursor-pointer animate-slide-in-right duration-300 delay-200"
    >
      <span className="icon-[devicon--google]"></span>
      <span>Iniciar sesión con Google</span>
    </button>
  )
}
