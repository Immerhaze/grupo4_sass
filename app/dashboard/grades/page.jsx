// app/dashboard/userManagment/page.js

// Si usas hooks de React, siempre usa 'use client'
'use client' 

import React from 'react';
import GradesDashboard from './components/GradesDashboard';

export default function GradesPage() {
  return (
       <div className="h-screen w-full flex flex-col overflow-hidden">
      <GradesDashboard/>
    </div>

  );
}
