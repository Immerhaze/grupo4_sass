'use client';

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "./ui/button";

// Sidebar recibe el rol actual del usuario
export default function SideBar({ userRole }) {
  const pathname = usePathname();

  // Opciones por rol
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
      { icon: "icon-[carbon--certificate]", path: "/dashboard/grades", label: "Calificaciones" },
      { icon: "icon-[feather--settings]", path: "/dashboard/settings", label: "Ajustes" },
    ],
    Teacher: [
      { icon: "icon-[lineicons--home]", path: "/dashboard", label: "Inicio" },
      { icon: "icon-[fluent--data-pie-32-regular]", path: "/dashboard/data", label: "Datos" },
      { icon: "icon-[carbon--certificate]", path: "/dashboard/grades", label: "Calificaciones" },
      { icon: "icon-[feather--settings]", path: "/dashboard/settings", label: "Ajustes" },
    ],
  };

  const currentOptions = optionsMap[userRole] || [];

const isActive = (itemPath) => {
  if (itemPath === '/dashboard') {
    return pathname === '/dashboard';
  }
  return pathname === itemPath || pathname.startsWith(`${itemPath}/`);
};



  return (
    <div className="bg-white text-blue-950 h-full flex flex-col">
      {/* Título */}
      <div className="h-1/4 w-full flex justify-center items-center">
        <h1 className="text-2xl font-semibold tracking-wide">DUCTU</h1>
      </div>

      {/* Menú de navegación */}
      <nav className="h-2/4 w-full my-2">
        <ul className="h-full flex flex-col justify-around">
          {currentOptions.length > 0 ? (
            currentOptions.map((item, index) => (
              <Link href={item.path} className="w-full h-full group-hover:text-white cursor-pointer">
              <li
                key={index}
                className={`${isActive(item.path) ? "bg-blue-950 text-white" : "text-gray-500"} cursor-pointer h-full flex items-center hover:bg-blue-900 group transition-all duration-300`}
              >
                <span className="flex flex-col items-center w-full group-hover:text-white">
                  <span className={`${item.icon} text-3xl`}></span>
                  <span className="text-xs">{item.label}</span>
                </span>
              </li>
                </Link>
            ))
          ) : (
            <li className="text-gray-400 p-2">No hay opciones disponibles para este rol.</li>
          )}
        </ul>
      </nav>

      {/* Avatar y botón de logout */}
      <div className="h-1/4 flex flex-col justify-around items-center">
        <Avatar className="w-1/2 h-auto border-2 border-blue-500">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <Button variant="ghost" className="cursor-pointer flex flex-col justify-center items-center group hover:bg-red-600">
          <span className="icon-[material-symbols--logout] group-hover:text-white text-red-600 text-2xl"></span>
        </Button>
        <p className="text-sm text-muted-foreground">{userRole}</p>
      </div>
    </div>
  );
}
