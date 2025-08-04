'use client';

import React from 'react';
import { getStudentsForGradingList } from '@/lib/gradingUtils';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';

export default function AdminStudentList({ courseId, onSelectStudent }) {
  const students = getStudentsForGradingList(courseId);

  if (!students || students.length === 0) {
    return <p className="text-gray-500 mt-4">No hay estudiantes para este curso.</p>;
  }

  return (
    <div className="mt-6 space-y-4">
      <h3 className="text-xl font-semibold">Estudiantes del curso {courseId}</h3>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Nombre</TableHead>
            <TableHead>Promedio</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead>Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {students.map((student) => (
            <TableRow key={student.studentId}>
              <TableCell>{student.studentId}</TableCell>
              <TableCell>{student.studentName}</TableCell>
              <TableCell>{student.generalAverage}</TableCell>
              <TableCell className={student.status === 'Aprobado' ? 'text-green-600' : 'text-red-600'}>
                {student.status}
              </TableCell>
              <TableCell>
                <Button variant="link" onClick={() => onSelectStudent(student.studentId)}>
                  Ver más
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
