// components/FooterSection.jsx
"use client";
import { TextHoverEffect } from "../ui/text-hover-effect";
import { useEffect, useState } from "react";

export default function FooterSection() {
  const [year, setYear] = useState(new Date().getFullYear());

  useEffect(() => {
    const now = new Date();
    setYear(now.getFullYear());
  }, []);

  return (
    <footer className="bg-blue-950 w-full h-1/2 flex flex-col justify-around text-white px-6  border-t border-neutral-700">
      <div className="max-w-8xl w-full mx-auto flex flex-row justify-between gap-12">
        {/* Brand / Logo */}
        <div className="w-1/3 ">
            <TextHoverEffect text="DUCTU" duration={0.4} />
          <p className="text-sm text-neutral-200  text-center">
            Simplifica la gestión académica con estilo y tecnología.
          </p>
        </div>

        {/* Links */}
        <div className="flex-1 flex flex-col items-start justify-center ">
          <h3 className="text-lg font-semibold mb-4">Explora</h3>
          <ul className="space-y-2 text-neutral-300 text-sm">
            <li><a href="#features" className="hover:text-white transition">Características</a></li>
            <li><a href="#pricing" className="hover:text-white transition">Precios</a></li>
            <li><a href="#demo" className="hover:text-white transition">Solicitar demo</a></li>
            <li><a href="#support" className="hover:text-white transition">Soporte</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div className="flex-1 flex flex-col items-center  justify-center">
          <h3 className="text-lg font-semibold mb-4">Contacto</h3>
          <p className="text-sm text-neutral-400 mb-2 text-center md:text-left">
            ¿Preguntas? Escríbenos a:
          </p>
          <a
            href="mailto:contacto@ductu.app"
            className="text-blue-400 hover:underline text-sm"
          >
            contacto@ductu.app
          </a>
        </div>
      </div>

      {/* Divider */}
      <div className="w-full border-t border-white my-8"></div>

      {/* Copyright */}
      <div className=" text-center text-sm text-white">
        &copy; {year} DUCTU. Todos los derechos reservados.
      </div>
    </footer>
  );
}
