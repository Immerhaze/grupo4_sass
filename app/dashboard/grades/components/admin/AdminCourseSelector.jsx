// components/grades/admin/AdminCourseSelector.jsx
'use client';
import React from 'react';
import { Label } from '@/components/ui/label';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { ALL_GRADES } from '@/lib/constants'; // Asegúrate de que esto existe

export default function AdminCourseSelector({ selectedCourse, onSelectCourse }) {
  const courses = ALL_GRADES; // Puedes ajustar esta función según tu dummy data

  return (
    <div className="mb-4">
      <Label>Seleccionar Curso</Label>
      <Select value={selectedCourse} onValueChange={onSelectCourse}>
        <SelectTrigger className="w-[200px]">
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
  );
}
