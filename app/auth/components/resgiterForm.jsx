// auth/register-form.js

"use client";

import React from 'react';

export default function RegisterForm() {
  // Aquí iría el estado para los campos del formulario (nombre, email, password)
  // y la lógica para manejar el envío
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica para enviar los datos de registro a tu API
    console.log("Registrando usuario...");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Regístra tu institución</h2>
      {/* Añade más campos como 'Nombre' si es necesario */}
      <div className='animate-slide-in-right duration-300'>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          <span className="icon-[pajamas--user] text-blue-500 text-lg mr-2"></span>
          Nombre Institución
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>
      <div className='animate-slide-in-right duration-300'>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        <span className="icon-[proicons--mail]  text-blue-500 text-lg mr-2"></span>
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>
      <div className='animate-slide-in-right duration-300'>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          <span className="icon-[teenyicons--password-outline] text-blue-500 text-lg mr-2"></span>
          Contraseña
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>
      <button
        type="submit"
        className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 animate-slide-in-right duration-300"
      >
        Registrar
      </button>
    </form>
  );
}