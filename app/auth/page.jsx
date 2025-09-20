// auth/page.js

"use client";

import React, { useEffect, useState } from 'react';
import LoginForm from './components/loginForm';
import RegisterForm from './components/resgiterForm';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import loginImage from "@/public/ellipses.png"
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

export default function AuthPage() {
  const searchParams = useSearchParams();
  const [isLogin, setIsLogin] = useState(true);

  useEffect(()=>{
    const formtype = searchParams.get("login")
    if(formtype === "true"){
      setIsLogin(true)
    }else{ 
      setIsLogin(false)
    }
  },[])

  const handleToggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="flex w-screen min-h-screen overflow-hidden">
      {/* Lado izquierdo: Estático y compartido */}
      <div className='relative w-4/7 h-screen bg-gradient-to-b from-blue-500 to-blue-950 flex flex-col justify-center items-start px-60 space-y-4'>
        <h1 className='text-white font-semibold text-4xl tracking-widest'>DUCTU</h1>
        <p className='text-white font-normal text-lg tracking-widest'>Conexión real con el ambiente educativo</p>
        <Button className="bg-blue-500 rounded-3xl p-5 px-6 text-lg font-medium tracking-widest" asChild>
          <Link href={"/"}>
          Leer más
          </Link> 
          </Button>
        <Image src={loginImage} alt="Blue borders" className='absolute -bottom-10 left-0 w-xl h-auto' />
     <div className="mt-8 text-white">
          {isLogin ? (
            <p>
              ¿No tienes una cuenta?{' '}
              <button onClick={handleToggleForm} className="font-semibold underline">
                Regístrate
              </button>
            </p>
          ) : (
            <p>
              ¿Ya tienes una cuenta?{' '}
              <button onClick={handleToggleForm} className="font-semibold underline">
                Inicia sesión
              </button>
            </p>
          )}
        </div>
     
      </div>
        

      {/* Lado derecho: Dinámico (cambia entre login y registro) */}
      <div className="w-1/2 flex justify-center items-center p-8 bg-white dark:bg-gray-900">
        <div className="w-full max-w-md">

          {isLogin ? <LoginForm /> : <RegisterForm />}
        </div>
      </div>
    </div>
  );
}