'use client';

import { useEffect, useState } from 'react';
import { DUMMY_STUDENT_PERFORMANCE_DATA_DETAILED, DUMMY_TEACHERS } from '@/lib/DummyGradingData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider
} from '@/components/ui/tooltip';

export default function SubjectStudentDetail({ studentId, subjectId, onBack }) {
  const [student, setStudent] = useState(null);
  const [grades, setGrades] = useState([]);
  const [subjectName, setSubjectName] = useState('');
  const [average, setAverage] = useState(null);

  // Simulate logged-in teacher ID (for demo)
  const currentTeacherId = DUMMY_TEACHERS[0]?.id;

  useEffect(() => {
    const studentData = DUMMY_STUDENT_PERFORMANCE_DATA_DETAILED.find(s => s.studentId === studentId);
    if (!studentData) return;

    const semesters = Object.keys(studentData.gradesBySemester).sort();
    const latest = semesters[semesters.length - 1];
    const subjectData = studentData.gradesBySemester[latest].subjects.find(s => s.subjectId === subjectId);

    if (!subjectData) return;

    const detailedGrades = subjectData.individualGrades.map(grade => {
      const teacher = DUMMY_TEACHERS.find(t => t.id === grade.teacherId);
      return {
        ...grade,
        teacherName: teacher?.name || 'Desconocido',
      };
    });

    setStudent(studentData);
    setSubjectName(subjectData.subjectName);
    setGrades(detailedGrades);
    setAverage(subjectData.averageGrade);
  }, [studentId, subjectId]);

  const isEditableGrade = (grade) => {
    if (grade.teacherId !== currentTeacherId) return false;
    const gradeDate = new Date(grade.date);
    const now = new Date();
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(now.getDate() - 30);
    return gradeDate >= thirtyDaysAgo;
  };

  if (!student) {
    return <div className="text-red-500">Estudiante no encontrado.</div>;
  }

  return (
    <TooltipProvider>
      <Card className="space-y-4 p-4">
        <CardHeader>
          <CardTitle className="text-lg">
            {student.studentName} - {subjectName}
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="text-muted-foreground">Curso: {student.course}</div>
          <div>Promedio en {subjectName}: <strong>{average}</strong></div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Actividad</TableHead>
                <TableHead>Nota</TableHead>
                <TableHead>Fecha</TableHead>
                <TableHead>Descripción</TableHead>
                <TableHead>Comentarios</TableHead>
                <TableHead>Acción</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {grades.map((grade, idx) => {
                const editable = isEditableGrade(grade);
                return (
                  <TableRow key={idx}>
                    <TableCell>{grade.name}</TableCell>
                    <TableCell>{grade.score}</TableCell>
                    <TableCell>{grade.date}</TableCell>
                    <TableCell>{grade.description || '-'}</TableCell>
                    <TableCell>{grade.comments || '-'}</TableCell>
                    <TableCell>
                      {editable ? (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => alert(`Edit grade: ${grade.name}`)}
                        >
                          Edit
                        </Button>
                      ) : (
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <span className="icon-[lucide--lock] text-gray-400 cursor-help" />
                          </TooltipTrigger>
                          <TooltipContent className="bg-gray-800 text-white text-xs p-2 rounded-md max-w-xs">
                            You can only edit your own grades<br />from the past 30 days.
                          </TooltipContent>
                        </Tooltip>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>

          <div className="pt-4">
            <Button variant="outline" onClick={onBack}>
              ← Volver a la lista
            </Button>
          </div>
        </CardContent>
      </Card>
    </TooltipProvider>
  );
}
