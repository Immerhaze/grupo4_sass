// app/auth/page.jsx
export const dynamic = 'force-dynamic';
export const revalidate = 0;

import AuthClient from './components/AuthClient';

export default async function AuthPage({ searchParams }) {
  // 👇 OBLIGATORIO: await
  const sp = await searchParams;

  // Maneja string | string[]
  const raw = Array.isArray(sp?.login) ? sp.login[0] : sp?.login;
  const isLoginDefault = String(raw ?? 'true') === 'true';

  return <AuthClient isLoginDefault={isLoginDefault} />;
}
