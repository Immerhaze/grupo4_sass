'use client';

import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DUMMY_STUDENT_PERFORMANCE_DATA_DETAILED, DUMMY_TEACHERS } from '@/lib/DummyGradingData';
import { passOrFail } from '@/lib/gradingUtils';

export default function AdminStudentDetail({ studentId, onBack }) {
  const [student, setStudent] = useState(null);
  const [subjectAverages, setSubjectAverages] = useState([]);
  const [selectedSubjectId, setSelectedSubjectId] = useState('');
  const [gradeDetails, setGradeDetails] = useState([]);

  const getStudent = (id) => {
    return DUMMY_STUDENT_PERFORMANCE_DATA_DETAILED.find(s => s.studentId === id);
  };

  const getLatestSemester = (student) => {
    const semesters = Object.keys(student.gradesBySemester).sort();
    return semesters[semesters.length - 1];
  };

  const getStudentSubjectAverages = (student) => {
    const latest = getLatestSemester(student);
    return student.gradesBySemester[latest]?.subjects || [];
  };

  const getStudentSubjectGradeDetails = (student, subjectId) => {
    const latest = getLatestSemester(student);
    const subject = student.gradesBySemester[latest]?.subjects.find(s => s.subjectId === subjectId);
    if (!subject) return [];

    return subject.individualGrades.map((grade) => {
      const teacher = DUMMY_TEACHERS.find(t => t.id === grade.teacherId);
      return {
        ...grade,
        teacherName: teacher?.name || 'Desconocido',
      };
    });
  };

  useEffect(() => {
    const data = getStudent(studentId);
    if (!data) return;
    setStudent(data);

    const averages = getStudentSubjectAverages(data);
    setSubjectAverages(averages);

    if (averages.length > 0) {
      setSelectedSubjectId(averages[0].subjectId);
    }
  }, [studentId]);

  useEffect(() => {
    if (student && selectedSubjectId) {
      const details = getStudentSubjectGradeDetails(student, selectedSubjectId);
      setGradeDetails(details);
    }
  }, [student, selectedSubjectId]);

  if (!student) {
    return <div className="p-4 text-red-500">Estudiante no encontrado.</div>;
  }

  return (
    <div className="space-y-6">
      {onBack && (
        <Button variant="outline" onClick={onBack}>
          ← Volver a la Lista de Estudiantes
        </Button>
      )}

      <div className="space-y-2">
        <h2 className="text-2xl font-bold">{student.studentName}</h2>
        <p className="text-muted-foreground">Curso: {student.course}</p>
        <p className={student.status === 'Aprobado' ? 'text-green-600' : 'text-red-600'}>
          <span className='font-semibold text-blue-950'>Estado:</span> {student.status} <span className='text-blue-500'>|</span> <span className='font-semibold text-blue-950'> Promedio general:</span> {student.generalAverage}
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Promedios por Asignatura</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Asignatura</TableHead>
                <TableHead>Promedio</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {subjectAverages.map((subj) => (
                <TableRow key={subj.subjectId}>
                  <TableCell>{subj.subjectName}</TableCell>
                  <TableCell className={passOrFail(subj.averageGrade.toFixed(2)) ? "text-green-700":"text-red-600"}>{subj.averageGrade.toFixed(2)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Detalle de Calificaciones</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <Label htmlFor="subject-select">Seleccionar Asignatura</Label>
            <Select value={selectedSubjectId} onValueChange={setSelectedSubjectId}>
              <SelectTrigger id="subject-select" className="w-[250px] mt-1">
                <SelectValue placeholder="Seleccione asignatura" />
              </SelectTrigger>
              <SelectContent>
                {subjectAverages.map((subj) => (
                  <SelectItem key={subj.subjectId} value={subj.subjectId}>
                    {subj.subjectName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {gradeDetails.length === 0 ? (
            <p className="text-gray-500">No hay calificaciones registradas.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Evaluación</TableHead>
                  <TableHead>Nota</TableHead>
                  <TableHead>Fecha</TableHead>
                  <TableHead>Descripción</TableHead>
                  <TableHead>Profesor</TableHead>
                  <TableHead>Comentarios</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {gradeDetails.map((grade, idx) => (
                  <TableRow key={idx}>
                    <TableCell>{grade.name}</TableCell>
                    <TableCell className={passOrFail(grade.score) ? "text-green-700":"text-red-600"}>{grade.score}</TableCell>
                    <TableCell>{grade.date}</TableCell>
                    <TableCell>{grade.description || '-'}</TableCell>
                    <TableCell>{grade.teacherName}</TableCell>
                    <TableCell>{grade.comments || '-'}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
