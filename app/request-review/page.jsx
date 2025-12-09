// app/request-review/page.jsx
export default function RequestReviewPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-6 space-y-4 text-center">
        <h1 className="text-xl font-bold text-slate-900">
          Hemos recibido los datos de tu institución
        </h1>
        <p className="text-sm text-slate-600">
          Tu institución ha sido registrada en DUCTU en estado de revisión.
          Un administrador de DUCTU se pondrá en contacto contigo para
          activar los usuarios y el acceso al panel.
        </p>
        <p className="text-xs text-slate-500">
          Si crees que esto es un error, puedes cerrar sesión e intentar con otra cuenta
          o contactarnos directamente.
        </p>
      </div>
    </main>
  );
}
