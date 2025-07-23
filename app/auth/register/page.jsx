// app/auth/register/page.jsx
import React from 'react';

export default function RegisterPage() {
  return (
    <div>
      <h2>Registrarse</h2>
      <form>
        <div>
          <label>Nombre:</label>
          <input type="text" name="name" required />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" name="email" required />
        </div>
        <div>
          <label>Contraseña:</label>
          <input type="password" name="password" required />
        </div>
        <button type="submit">Registrarse</button>
      </form>
    </div>
  );
}


