// src/app/components/IntroPage.jsx
"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import loginImage from "@/public/ellipses.png";

export default function IntroPage({ onAnimationComplete }) {
  // Estado para controlar si la animación de salida ya empezó
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Calcula la duración total de la animación de entrada
    // El retraso más largo es 900ms (0.9s)
    // La duración de la animación de las letras es 300ms (0.3s)
    const entryAnimationDuration = 1800; // 1200ms = 1.2 segundos

    // La animación de salida dura 500ms
    const exitAnimationDuration = 500;

    // Configura un temporizador para iniciar la animación de salida
    const exitTimer = setTimeout(() => {
      setIsExiting(true);
    }, entryAnimationDuration);

    // Configura un segundo temporizador para notificar que la animación terminó
    const completeTimer = setTimeout(() => {
      if (onAnimationComplete) {
        onAnimationComplete();
      }
    }, entryAnimationDuration + exitAnimationDuration);

    // Limpia los temporizadores para evitar fugas de memoria
    return () => {
      clearTimeout(exitTimer);
      clearTimeout(completeTimer);
    };
  }, [onAnimationComplete]);

  // Si el componente ya está en la fase de salida, aplicamos la clase de animación
  const containerClass = `relative w-screen h-screen bg-gradient-to-b from-blue-500 to-blue-950 flex justify-center items-center ${
    isExiting ? "animate-fade-out duration-500" : "animate-blurred-fade-in duration-300"
  }`;

  return (
    <div className={containerClass}>
      <h1 className="text-9xl text-white tracking-widest z-20">
        {/* Clase 'animate-delay-800' corregida a 'delay-800' */}
        <span className="inline-block animate-slide-in-top duration-300 delay-250">D</span>
        <span className="inline-block animate-slide-in-bottom duration-300 delay-400">U</span>
        <span className="inline-block animate-slide-in-top duration-300 delay-700">C</span>
        <span className="inline-block animate-slide-in-bottom duration-300 delay-800">T</span>
        <span className="inline-block animate-slide-in-top duration-300 delay-900">U</span>
      </h1>
      <Image src={loginImage} className="absolute left-0 bottom-0 w-1/2 h-auto z-10 animate-zoom-in duration-300 delay-500" alt="background ellipses"/>
    </div>
  );
}

