'use client';

import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import SubjectTeacherDashboard from './teacher/SubjectTeacherDashboard';
import AdminGradesDashboard from './admin/AdminGradesDashboard';
import { DUMMY_TEACHERS } from '@/lib/DummyGradingData';


export default function GradesPage() {
  const [viewMode, setViewMode] = useState('admin');
  const [teacherId, setTeacherId] = useState('');

  const randomTeacher = DUMMY_TEACHERS[Math.floor(Math.random() * DUMMY_TEACHERS.length)];
const randomChief = DUMMY_TEACHERS.find(t => t.isChiefTeacher);
//   // Selecciona un docente aleatorio con cursos asignados al activar modo profesor
  useEffect(() => {
    if (viewMode === 'teacher') {
      const eligibleTeachers = DUMMY_TEACHERS.filter(
        (t) => !t.isChiefTeacher && t.coursesAssigned.length > 0
      );
      if (eligibleTeachers.length > 0) {
        const randomTeacher = eligibleTeachers[Math.floor(Math.random() * eligibleTeachers.length)];
        setTeacherId(randomTeacher.id);
      } else {
        setTeacherId('');
      }
    }
  }, [viewMode]);

  return (
    <div className="space-y-6 overflow-y-scroll bg-gray-50 p-8">
      <div className="flex gap-4">
        <Button onClick={() => setViewMode('admin')} variant={viewMode === 'admin' ? 'default' : 'outline'}>
          Vista Admin
        </Button>
        <Button onClick={() => setViewMode('teacher')} variant={viewMode === 'teacher' ? 'default' : 'outline'}>
          Vista Profesor
        </Button>
      </div>

      {viewMode === 'admin' ? (
        <AdminGradesDashboard />
      ) : teacherId ? (
    <SubjectTeacherDashboard teacherId={randomChief?.id ?? randomTeacher.id} />
       ) : (
        <p>No se encontró un docente con cursos asignados.</p>
      )}
    </div>
  );
}
