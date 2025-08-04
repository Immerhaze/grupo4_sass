// components/CallToActionSection.jsx
"use client";

import { Button } from "@/components/ui/button";

export default function CallToActionSection() {
  return (
    <section className="bg-white h-1/2 py-24 text-blue-950 text-center px-4">
      <div className="max-w-3xl mx-auto space-y-6">
        <h2 className="text-4xl font-bold tracking-tight leading-tight">
          Comienza a simplificar la gestión académica
        </h2>
        <p className="text-lg text-blue-300">
          Únete a docentes y administradores que ya están optimizando su tiempo y mejorando la comunicación con estudiantes.
        </p>
        <div className="flex justify-center gap-4 flex-wrap">
          <Button className="bg-blue-950 text-white text-base hover:bg-blue-900 transition cursor-pointer">
            Probar gratis
          </Button>
          <Button variant="outline" className="border-white text-blue-950 hover:bg-blue-500 hover:text-white shadow-sm transition cursor-pointer">
            Solicitar demo
          </Button>
        </div>
      </div>
    </section>
  );
}
