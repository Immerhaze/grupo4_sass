// app/auth/login/page.jsx
import React from 'react';

export default function LoginPage() {
  return (
    <div className='bg-red-300 w-full h-screen flex  flex-col justify-center'>
      <h2 className='font-xl font-black text-black tracking-wider'>Bienvenido</h2>
      <h3 className='text-black text-lg font-medium'>Ingresa a tu perfil</h3>
      <form>
        <div className='border-gray-500 border-[0.5px] rounded-4xl'>
          <i class="icon-[material-symbols--arrow-back-ios-new]"></i>
          <input type="email" name="email" placeholder='Dirección Email' required />
        </div>
        <div>
          <label>Contraseña:</label>
          <input type="password" name="password" required />
        </div>
        <button type="submit">Ingresar</button>
      </form>
    </div>
  );
}
