// components/PerformanceDashboard.jsx
'use client';

import React, { useState, useEffect } from 'react'; // Import useEffect
import { Button } from '@/components/ui/button';
import TeacherGradesDashboard from './TeacherGradesDashboard';
import AdminGradesDashboard from './AdminGradesDashboard';

export default function GradesDashboard() {
  const [userRole, setUserRole] = useState('admin');
  // const [currentTeacherId, setCurrentTeacherId] = useState(''); // Initialize empty

  // Use useEffect to set a valid teacher ID once DUMMY_TEACHERS is available
  // useEffect(() => {
  //   if (DUMMY_TEACHERS.length > 0) {
  //     // Pick the first teacher's ID, or a specific one if you know it will exist
  //     setCurrentTeacherId(DUMMY_TEACHERS[0].id);
  //     // Optional: Log the teacher info to console to see what's available
  //     console.log("Available Teacher for Demo:", DUMMY_TEACHERS[0]);
  //   }
  // }, []); // Run once on component mount

  // ... (rest of the component)

  return (
    <div className="min-h-screen bg-gray-50 overflow-y-scroll">
      <div className="p-4 bg-white shadow-sm flex space-x-4 justify-center">
        <Button
          onClick={() => setUserRole('admin')}
          variant={userRole === 'admin' ? 'default' : 'outline'}
        >
          Ver como Administrador
        </Button>
        <Button
          onClick={() => {
            setUserRole('teacher')
          }}
          variant={userRole === 'teacher' ? 'default' : 'outline'}
        >
          Ver como Docente
          </Button>
      </div>

      {userRole === 'admin' && <AdminGradesDashboard />}
      {userRole === 'teacher'  && <TeacherGradesDashboard  />} 
    </div>
  );
}