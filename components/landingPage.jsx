"use client";

import React, { useState, useEffect } from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { MacbookScroll } from "./ui/macbook-scroll";
import { TypewriterEffectSmooth } from "./ui/typewriter-effect";

export default function LandingPageContent() {
  // Nuevo estado para controlar la aparición del resto de la página
//   const [showFullPage, setShowFullPage] = useState(false);

//   useEffect(() => {
//     // 1. Duración del "parpadeo" del logo en el centro
//     const initialDelay = 400;
//     // 2. Duración de las animaciones de movimiento (logo y página)

//     // Primer temporizador: Inicia las dos animaciones al mismo tiempo
//     const startAnimationsTimer = setTimeout(() => {
//       setShowFullPage(true);  // Inicia la animación de la página
//     }, initialDelay);

//     return () => {
//       clearTimeout(startAnimationsTimer);
//     };
//   }, []);

  // Clases dinámicas para el logo
  const logoClasses = `text-blue-950 tracking-widest text-2xl font-semibold  absolute`;

  function NavItem({ children }) {
    return (
      <li className="cursor-pointer hover:text-blue-950  ">
        {children}
      </li>
    );
  }

  const words = [
    { text: "Conexion" },
    { text: "real", className: "text-blue-500 dark:text-blue-500" },
    { text: "con" },
    { text: "el" },
    { text: "ambiente" },
    { text: "educativo.", },
  ];

  return (
    <div className="relative w-full min-h-screen">
      
      {/* HEADER: Animación del logo y la barra de navegación */}
      <div className="w-full h-16 flex flex-row">
        {/* El logo se renderiza con el estilo inicial y se anima al estilo final */}
        <div className="w-1/3 h-16 flex justify-start items-center pl-8 ">
          <h1 
            className={logoClasses}
          >
            DUCTU
          </h1>
        </div>

        {/* El resto de la barra de navegación aparece después de la animación del logo */}
        <div className={`
          w-2/3 h-16 flex flex-row justify-center items-end`}>
          <div className="w-1/2 min-h-16 flex justify-center items-center">
            <ul className="w-full text-gray-400 tracking-wide flex flex-row justify-around text-sm">
              <NavItem>Características</NavItem>
              <NavItem>Precios</NavItem>
              <NavItem>Contacto</NavItem>
            </ul>
          </div>
          <div className="w-1/2 min-h-16 flex justify-center items-center space-x-8 ">
            <Button  className={"bg-blue-950 cursor-pointer"} asChild>
              <Link href={"/auth?login=true"} >
              Ingresar
              </Link>
              </Button>
            <Button className={"bg-blue-500 text-white hover:text-blue-950 cursor-pointer"} variant={"outline"}>
               <Link href={"/auth?login=false"}>
              Registrarse
               </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* CONTENIDO PRINCIPAL: Animación de la página principal */}
      <div className={ "animate-fade-in duration-300"}>
        <MacbookScroll
          title={ <TypewriterEffectSmooth words={words} /> }
          src={"/screenshot.jpg"}
          showGradient={false}
        />
      </div>
    </div>
  );
}