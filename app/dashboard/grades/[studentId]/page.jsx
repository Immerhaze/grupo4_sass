// app/dashboard/grades/[studentId]/page.jsx
'use client';

import AdminStudentDetail from '../components/admin/AdminStudentDetail';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export default function StudentDetailPage({ params }) {
  const { studentId } = params;
  const router = useRouter();

  if (!studentId) {
    return (
      <div className="p-4 text-red-500">
        Error: ID de estudiante no proporcionado.
      </div>
    );
  }

  return (
    <div className="p-4 space-y-6">
      <Button onClick={() => router.back()} className="mb-4">
        ← Volver
      </Button>
      <AdminStudentDetail studentId={studentId} />
    </div>
  );
}
