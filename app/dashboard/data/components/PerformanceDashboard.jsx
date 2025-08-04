// components/PerformanceDashboard.jsx
'use client';

import React, { useState, useEffect } from 'react'; // Import useEffect
import AdminPerformanceDashboard from './AdminPerformanceDashboard';
import TeacherPerformanceDashboard from './TeacherPerfromanceDashboard';
import { Button } from '@/components/ui/button';
import { DUMMY_TEACHERS } from "@/lib/DummyPerformanceOverallData"; // Import DUMMY_TEACHERS here too

export default function PerformanceDashboard() {
  const [userRole, setUserRole] = useState('admin');
  const [currentTeacherId, setCurrentTeacherId] = useState(''); // Initialize empty

  // Use useEffect to set a valid teacher ID once DUMMY_TEACHERS is available
  useEffect(() => {
    if (DUMMY_TEACHERS.length > 0) {
      // Pick the first teacher's ID, or a specific one if you know it will exist
      setCurrentTeacherId(DUMMY_TEACHERS[0].id);
      // Optional: Log the teacher info to console to see what's available
      console.log("Available Teacher for Demo:", DUMMY_TEACHERS[0]);
    }
  }, []); // Run once on component mount

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
            setUserRole('teacher');
            // Ensure a valid teacher ID is set when switching to teacher view
            if (!currentTeacherId && DUMMY_TEACHERS.length > 0) {
              setCurrentTeacherId(DUMMY_TEACHERS[0].id);
            }
          }}
          variant={userRole === 'teacher' ? 'default' : 'outline'}
          disabled={!currentTeacherId} // Disable if no teacher data
        >
          Ver como Docente ({currentTeacherId || 'Cargando...'})
        </Button>
      </div>

      {userRole === 'admin' && <AdminPerformanceDashboard />}
      {userRole === 'teacher' && currentTeacherId ? ( // Render only if currentTeacherId is set
        <TeacherPerformanceDashboard currentTeacherId={currentTeacherId} />
      ) : (
        userRole === 'teacher' && <div className="p-6 text-center text-gray-500">Cargando datos del docente...</div>
      )}
    </div>
  );
}