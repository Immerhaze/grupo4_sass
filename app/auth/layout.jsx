// app/auth/layout.jsx
import React from 'react';
import { Button } from "@/components/ui/button"
import Image from 'next/image';
import loginImage from "@/public/ellipses.png";

export default function AuthLayout({ children }) {
  return (
    // Add 'flex' to make the two child divs sit side-by-side
    <div className="w-screen h-screen overflow-hidden flex">
      <div className='relative w-4/7 h-full bg-gradient-to-b from-blue-500 to-blue-950 flex flex-col justify-center items-start px-60 space-y-4'>
        <h1 className='text-white font-semibold text-4xl tracking-widest'>DUCTU</h1>
        <p className='text-white font-normal text-lg tracking-widest'>Conexión real con el ambiente educativo</p>
        <Button className="bg-blue-500 rounded-3xl p-5 px-6 text-lg font-medium tracking-widest">Leer más</Button>
        <Image src={loginImage} alt="Blue borders" className='absolute bottom-0 left-0 w-xl h-auto' />
      </div>
      {/* This div will now correctly sit next to the first one */}
      <div className='w-3/7 bg-white flex justify-center items-center'> {/* Added flex, justify-center, items-center for centering the content */}
        <main>{children}</main>
      </div>
    </div>
  );
}