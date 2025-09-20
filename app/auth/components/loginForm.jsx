// auth/login-form.js

"use client";

import { Button } from '@/components/ui/button';
import React from 'react';

export default function LoginForm() {
  // Aquí iría el estado para los campos del formulario (email, password)
  // y la lógica para manejar el envío (submit)
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica para enviar los datos de login a tu API
    console.log("Iniciando sesión...");
  };

  return (
    <section className="min-h-screen flex flex-col justify-center items-center p-6 ">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 space-y-6 animate-fade-in"
      >
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white animate-slide-in-right duration-300">Inicia sesión</h2>
      <div className='animate-slide-in-right duration-300 delay-300'>
        <label htmlFor="email" className="text-sm font-medium text-gray-700 dark:text-gray-300  flex  flex-row justify-start items-center">
          <span className="icon-[proicons--mail]  text-blue-500 text-lg mr-2"></span>
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2"
        />
      </div>
      <div className='animate-slide-in-right duration-300'>
        <label htmlFor="password" className="text-sm font-medium text-gray-700 dark:text-gray-300  flex  flex-row justify-start items-center">
          <span className="icon-[teenyicons--password-outline] text-blue-500 text-lg mr-2"></span>
          Contraseña
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2"
        />
      </div>
      <Button
        type="submit"
        className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 cursor-pointer animate-slide-in-right duration-300"
      >
        Ingresar
      </Button>
    </form>
    </section>
  );
}