// app/dashboard/userManagment/page.js
'use client' 

import React from 'react';
import UserManagementTable from './components/UserManagmentTable';

export default function UserManagmentPage() {
  return (
    <div className="h-screen w-full flex flex-col">
     <UserManagementTable/>
    </div>
  );
}