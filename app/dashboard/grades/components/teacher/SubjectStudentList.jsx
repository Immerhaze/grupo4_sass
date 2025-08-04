'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { passOrFail } from '@/lib/gradingUtils';


export default function SubjectStudentList({ students, onSelectStudent }) {
  const [showGradingSection, setShowGradingSection] = useState(false);
  const [assignmentTitle, setAssignmentTitle] = useState('');
  const [grades, setGrades] = useState({}); // { studentId: { grade, feedback } }

  if (!students || students.length === 0) {
    return <p className="text-muted-foreground mt-4">No hay estudiantes para este curso.</p>;
  }

  const handleGradeChange = (studentId, field, value) => {
    setGrades(prev => ({
      ...prev,
      [studentId]: {
        ...prev[studentId],
        [field]: value
      }
    }));
  };

  const handleSubmitGrades = () => {
    if (!assignmentTitle.trim()) {
      alert('Please enter the assignment title.');
      return;
    }

    console.log('Submitted Grades:', {
      assignmentTitle,
      grades,
      date: new Date().toISOString(),
    });

    alert('Grades submitted (simulated)');
    setAssignmentTitle('');
    setGrades({});
    setShowGradingSection(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800">Lista de Estudiantes</h2>
        <Button onClick={() => setShowGradingSection(prev => !prev)}>
          {showGradingSection ? 'Cancelar ' : 'Agregar Calificaciones'}
        </Button>
      </div>

      {showGradingSection && (
        <div className="space-y-4">
          <label className="block">
            <span className="text-sm font-medium">Item para calificar</span>
            <Input
              value={assignmentTitle}
              onChange={e => setAssignmentTitle(e.target.value)}
              placeholder="Ejm: test de aritmetica"
              className="mt-1"
            />
          </label>
        </div>
      )}

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Nombre</TableHead>
            <TableHead>Promedio</TableHead>
            <TableHead>Acciones</TableHead>
            {showGradingSection && (
              <>
                <TableHead>Nota</TableHead>
                <TableHead>Comentario</TableHead>
              </>
            )}
          </TableRow>
        </TableHeader>
        <TableBody>
          {students.map(student => (
            <TableRow key={student.studentId}>
              <TableCell>{student.studentId}</TableCell>
              <TableCell>{student.studentName}</TableCell>
              <TableCell className={passOrFail(student.subjectAvg) ? "text-green-700":"text-red-600"}>{student.subjectAvg ?? 'N/A'}</TableCell>
              <TableCell>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onSelectStudent(student.studentId)}
                >
                  Ver Detalles
                </Button>
              </TableCell>

              {showGradingSection && (
                <>
                  <TableCell>
                    <Input
                      type="number"
                      value={grades[student.studentId]?.grade || ''}
                      onChange={e =>
                        handleGradeChange(student.studentId, 'grade', e.target.value)
                      }
                      placeholder="0-10"
                      className="w-24"
                    />
                  </TableCell>
                  <TableCell>
                    <Textarea
                      value={grades[student.studentId]?.feedback || ''}
                      onChange={e =>
                        handleGradeChange(student.studentId, 'feedback', e.target.value)
                      }
                      placeholder="Comentario"
                      className="w-full"
                    />
                  </TableCell>
                </>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {showGradingSection && (
        <div className="flex justify-end mt-4">
          <Button onClick={handleSubmitGrades}>Enviar Notas</Button>
        </div>
      )}
    </div>
  );
}
