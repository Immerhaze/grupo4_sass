'use client';

import { useState,useEffect } from 'react';
import Link from 'next/link';
import { ALL_GRADES } from '@/lib/constants';
import { DUMMY_TEACHERS } from '@/lib/DummyGradingData';
import { getStudentsForGradingList } from '@/lib/gradingUtils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Label } from '@/components/ui/label';
import { passOrFail } from '@/lib/gradingUtils';

export default function AdminGradesDashboard() {
  const [selectedCourse, setSelectedCourse] = useState('');
  const [students, setStudents] = useState([]);

  const randomTeacher = DUMMY_TEACHERS[Math.floor(Math.random() * DUMMY_TEACHERS.length)];
const randomChief = DUMMY_TEACHERS.find(t => t.isChiefTeacher);


useEffect(() => {
  if (ALL_GRADES.length > 0 && !selectedCourse) {
    const firstCourse = ALL_GRADES[0];
    setSelectedCourse(firstCourse);
    const data = getStudentsForGradingList(firstCourse);
    setStudents(data);
  }
}, [selectedCourse]);

  const handleCourseSelect = (value) => {
    setSelectedCourse(value);
    const data = getStudentsForGradingList(value);
    setStudents(data);
  };

  return (
    <Card className="p-4 space-y-6 w-full">
      <CardHeader>
        <CardTitle className="text-xl">Panel de Notas - Administrador</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>Selecciona un curso</Label>
          <Select value={selectedCourse} onValueChange={handleCourseSelect}>
            <SelectTrigger className="w-[220px]">
              <SelectValue placeholder="Seleccione un curso" />
            </SelectTrigger>
            <SelectContent>
              {ALL_GRADES.map((grade) => (
                <SelectItem key={grade} value={grade}>
                  {grade}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {students.length > 0 && (
          <div className="pt-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Nombre</TableHead>
                  <TableHead>Curso</TableHead>
                  <TableHead>Promedio</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {students.map((s) => (
                  <TableRow key={s.studentId}>
                    <TableCell>{s.studentId}</TableCell>
                    <TableCell>{s.studentName}</TableCell>
                    <TableCell>{s.course}</TableCell>
                    <TableCell className={passOrFail(s.generalAverage) ? "text-green-700":"text-red-600"}>{s.generalAverage}</TableCell>
               <TableCell>
                 <span
                   className={`inline-block px-4 py-1 rounded-xl border text-sm font-medium 
                   ${s.status === 'Aprobado' 
                    ? 'bg-green-100 text-green-800 border-green-600' 
                    : 'bg-red-100 text-red-800 border-red-600'}
                    `}
                     >
                       {s.status}
                  </span>
                </TableCell>
  
                    <TableCell>
                      <Link href={`/dashboard/grades/${s.studentId}`} className="text-blue-600 underline">
                        Ver más
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
