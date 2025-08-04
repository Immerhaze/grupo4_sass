'use client';

import { useState, useEffect } from 'react';
import { getCoursesForTeacher, getStudentsForTeacher, getTeacherSubject } from '@/lib/gradingUtils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import SubjectStudentDetail from './SubjectStudentDetail';
import SubjectStudentList from './SubjectStudentList';
import ChiefTeacherDashboard from './ChiefTeacherDashboard';
import { DUMMY_TEACHERS } from '@/lib/DummyGradingData';



export default function SubjectTeacherDashboard({ teacherId }) {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [students, setStudents] = useState([]);
  const [selectedStudentId, setSelectedStudentId] = useState(null);
  const [subjectId, setSubjectId] = useState('');
  const [isChiefView, setIsChiefView] = useState(false);
  const [isChiefTeacher, setIsChiefTeacher] = useState(false);

useEffect(() => {
  const teacher = DUMMY_TEACHERS.find(t => t.id === teacherId);
  setIsChiefTeacher(teacher?.isChiefTeacher || false);
}, [teacherId]);



 useEffect(() => {
  const teacherCourses = getCoursesForTeacher(teacherId);
  setCourses(teacherCourses);
  if (teacherCourses.length > 0) {
    setSelectedCourse(teacherCourses[0]); // Selecciona el primer curso por defecto
  }
  const subject = getTeacherSubject(teacherId);
  setSubjectId(subject);
}, [teacherId]);


  useEffect(() => {
    if (selectedCourse && subjectId) {
      const filtered = getStudentsForTeacher(teacherId)
        .filter(s => s.course === selectedCourse)
        .map(s => {
          const semesters = Object.keys(s.gradesBySemester).sort();
          const latest = semesters[semesters.length - 1];
          const subject = s.gradesBySemester[latest]?.subjects.find(sub => sub.subjectId === subjectId);
          return {
            ...s,
            subjectAvg: subject?.averageGrade?.toFixed(2) ?? 'N/A',
          };
        });
      setStudents(filtered);
    }
  }, [selectedCourse, teacherId, subjectId]);

  const handleBackToList = () => {
    setSelectedStudentId(null);
  };

  if (!subjectId) {
    return <p className="text-red-500 p-4">Este profesor no tiene una asignatura asignada.</p>;
  }

  return (
    <Card className="p-4 space-y-6 w-full">
      <CardHeader>
        <CardTitle className="text-xl">Panel del Docente</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {isChiefTeacher && (
            <div className="flex items-center gap-4">
             <Label>Modo:</Label>
             <Switch checked={isChiefView} onCheckedChange={setIsChiefView} />
             <span>{isChiefView ? 'Jefe de Curso' : 'Docente'}</span>
             </div>
        )}


        {isChiefView ? (
          <ChiefTeacherDashboard teacherId={teacherId} />
        ) : !selectedStudentId ? (
          <>
            <div className="space-y-2">
              <Label>Seleccionar Curso</Label>
              <Select value={selectedCourse} onValueChange={setSelectedCourse}>
                <SelectTrigger className="w-[220px]">
                  <SelectValue placeholder="Seleccione un curso" />
                </SelectTrigger>
                <SelectContent>
                  {courses.map((course) => (
                    <SelectItem key={course} value={course}>
                      {course}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {students.length > 0 && (
              <div className="pt-4">
                <SubjectStudentList
                  students={students}
                  subjectId={subjectId}
                  onSelectStudent={setSelectedStudentId}
                />
              </div>
            )}
          </>
        ) : (
          <SubjectStudentDetail
            studentId={selectedStudentId}
            subjectId={subjectId}
            onBack={handleBackToList}
          />
        )}
      </CardContent>
    </Card>
  );
}
