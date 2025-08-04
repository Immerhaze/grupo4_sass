'use client';

import { useState, useEffect } from 'react';
import { getCoursesForChiefTeacher, getStudentsForChiefTeacher } from '@/lib/gradingUtils';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import AdminStudentList from '../admin/AdminStudentList';
import AdminStudentDetail from '../admin/AdminStudentDetail';

export default function ChiefTeacherDashboard({ teacherId }) {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [students, setStudents] = useState([]);
  const [selectedStudentId, setSelectedStudentId] = useState(null);

  
    useEffect(() => {
    if (!courses.includes(selectedCourse)) {
      setSelectedCourse('');
      setStudents([]);
      setSelectedStudentId(null);
    }
  }, [courses, selectedCourse]);

   useEffect(() => {
  const courseList = getCoursesForChiefTeacher(teacherId);
  setCourses(courseList);

  // Seleccionar automáticamente el primero si no hay uno ya asignado
  if (courseList.length > 0) {
    console.log(courseList)
    setSelectedCourse(courseList[0]);
    console.log(selectedCourse)
  }
}, [teacherId]);

  useEffect(() => {
    if (selectedCourse) {
      const filtered = getStudentsForChiefTeacher(teacherId).filter(s => s.course === selectedCourse);
      setStudents(filtered);
    }
  }, [selectedCourse, teacherId]);


  if (!courses.length) {
    return <p className="p-4 text-muted-foreground">No estás asignado como jefe de curso.</p>;
  }

  return (
    <Card className="p-4 space-y-6 w-full">
      <CardHeader>
        <CardTitle className="text-xl">Panel del Profesor Jefe</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {!selectedStudentId ? (
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

           {selectedCourse && courses.includes(selectedCourse) && (
             <AdminStudentList
              courseId={selectedCourse}
              students={students}
              onSelectStudent={setSelectedStudentId}
               />
           )}

          </>
        ) : (
          <AdminStudentDetail studentId={selectedStudentId} onBack={() => setSelectedStudentId(null)} />
        )}
      </CardContent>
    </Card>
  );
}
