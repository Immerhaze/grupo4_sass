// components/sidebar.js
'use client'
import React from "react";
import { useState } from "react";
import Link from "next/link"; // ¡Importa el componente Link!
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "./ui/button";
import { usePathname } from "next/navigation";

export default function SideBar({ userRole }) { // userRole recibido correctamente
  // Objeto para mapear el rol a su array de opciones
  const optionsMap = {
    Admin: [
      { icon: "icon-[lineicons--home]", path: "/dashboard", label: "Inicio" },
      { icon: "icon-[mynaui--users-group-solid]", path: "/dashboard/userManagment", label: "Gestión de Usuarios" }, 
      { icon: "icon-[fluent--data-pie-32-regular]", path: "/dashboard/data", label: "Datos" },
      { icon: "icon-[carbon--certificate]", path: "/dashboard/grades", label: "Calificaciones" },
      { icon: "icon-[feather--settings]", path: "/dashboard/settings", label: "Ajustes" },
    ],
    Student: [
      { icon: "icon-[lineicons--home]", path: "/dashboard/dashboard", label: "Inicio" },
      { icon: "icon-[carbon--certificate]", path: "/dashboard/grades", label: "Calificaciones" }, // Cambié a "Mis Calificaciones"
      { icon: "icon-[feather--settings]", path: "/dashboard/settings", label: "Ajustes" },
    ],
    Teacher: [
      { icon: "icon-[lineicons--home]", path: "/dashboard", label: "Inicio" },
      { icon: "icon-[fluent--data-pie-32-regular]", path: "/dashboard/data", label: "Datos" }, // Puede ser "Mis Datos" o "Datos del Curso"
      { icon: "icon-[carbon--certificate]", path: "/dashboard/grades", label: "Calificaciones" },
      { icon: "icon-[feather--settings]", path: "/dashboard/settings", label: "Ajustes" },
    ],
  };

  // Obtener las opciones correctas basándose en el userRole
  // Si userRole no coincide con ninguna clave, devolvemos un array vacío para evitar errores
  const currentOptions = optionsMap[userRole] || [];

  const pathname = usePathname();

 // Función para determinar si un elemento de navegación está activo
 // Simplemente comparamos la ruta actual del navegador con la ruta del elemento
 const isActive = (path) => pathname === path;
  return (
    <div className="bg-white text-blue-950 h-full flex flex-col ">
      <div className=" h-1/4 w-full flex justify-center items-center-safe">
        <h1 className="text-2xl font-semibold tracking-wide">DUCTU</h1>
      </div>
      <nav className=" h-2/4 w-full my-2"> {/* Usamos flex-grow para que la nav ocupe el espacio restante */}
        <ul className="h-full flex  flex-col justify-around">
          {currentOptions.length > 0 ? (
            currentOptions.map((item, index) => (
              <li key={index} onClick={()=>handleNavClick(item.label)} className={`${isActive(item.path) && "bg-blue-950 text-white  transition-all duration-400" } cursor-pointer  h-full flex items-center text-gray-500 hover:bg-blue-900 group  transition-all duration-400`}>
                <Link href={item.path} className="flex flex-col items-center w-full group-hover:text-white ">
                  <span className={`${item.icon} text-3xl`}></span> {/* Cuidado con dangerouslySetInnerHTML si el icono viene de fuentes externas no confiables */}
                  <span className="text-xs">{item.label}</span>
                </Link>
              </li>
            ))
          ) : (
            <li className="text-gray-400 p-2">No hay opciones disponibles para este rol.</li>
          )}
        </ul>
      </nav>
      {/* Puedes agregar un botón de logout o información del usuario aquí abajo */}
      <div className="h-1/4  flex flex-col justify-around items-center  ">
        <Avatar className={"w-1/2 h-auto border-2 border-blue-500 "}  >
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        {/* Espacio para logout o info de perfil */}
        <Button variant={"Ghost"} className="cursor-pointer flex flex-col justify-center items-center  group  hover:bg-red-600">
        <span className="icon-[material-symbols--logout] group-hover:text-white text-red-600 text-2xl"></span>
        </Button>
      </div>
    </div>
  );
}