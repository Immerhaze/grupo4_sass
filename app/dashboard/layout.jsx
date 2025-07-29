'use client'
import React from 'react';
import SideBar from '@/components/sidebar';
export default function DashboardLayout({ children }) {
  // Aquí podríamos simular o recibir el rol del usuario para pasarlo al Sidebar
   const userRole = "Admin";

  return (
    <div className="flex min-h-screen">
      {/* Lado Izquierdo: La barra lateral, cuya apariencia base es consistente */}
      <div className="w-1/12 border-2 rounded-tr-lg rounded-br-lg shadow-md">
        <SideBar userRole={userRole} /> {/* El Sidebar recibe el rol para adaptar sus opciones */}
      </div>
        {/* El contenido específico de la página (tu dashboard/page.js) se renderiza aquí */}
        <main className="max-w-11/12 min-w-11/12">
          {children} {/* <-- ¡Este es tu dashboard/page.js! */}
        </main>

    </div>
  );
}