// auth/login-form.js

"use client";
import React from 'react';
import { SignIn } from '@stackframe/stack';

export default function LoginForm() {
return (
      <div className="animate-slide-in-right duration-300 delay-300">
        <SignIn
          fullPage={false}
          automaticRedirect={true}
          firstTab="password"
          extraInfo={
            <p className="mt-4 text-xs text-gray-500">
              Al iniciar sesión aceptas nuestros términos y política de privacidad.
            </p>
          }
        />
      </div>
  );
  
}