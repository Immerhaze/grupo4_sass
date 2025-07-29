// app/dashboard/userManagment/page.js

// Si usas hooks de React, siempre usa 'use client'
'use client' 

import React from 'react';
import PerformanceDashboard from './components/PerformanceDashboard';

export default function DataPage() {
  return (
    <div className="h-screen w-full flex flex-col overflow-hidden">
      <PerformanceDashboard/>
    </div>

  );
}