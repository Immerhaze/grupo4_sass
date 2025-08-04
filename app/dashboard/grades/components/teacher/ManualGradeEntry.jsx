// components/ManualGradeEntry.jsx
'use client';

import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function ManualGradeEntry({ students }) {
  const [grades, setGrades] = useState(
    students.map(student => ({ id: student.id, name: student.name, grade: '' }))
  );

  const handleGradeChange = (id, value) => {
    setGrades(prev =>
      prev.map(g => g.id === id ? { ...g, grade: value } : g)
    );
  };

  const handleSave = () => {
    // Simulate API call with timeout
    setTimeout(() => {
      console.log('Grades saved:', grades);
      alert('Grades successfully submitted!');
    }, 1000);
  };

  return (
    <div className="space-y-6 p-4 bg-white rounded-lg shadow">
      <h2 className="text-xl font-semibold">Manual Grade Entry</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Student ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Grade</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {grades.map(({ id, name, grade }) => (
            <TableRow key={id}>
              <TableCell>{id}</TableCell>
              <TableCell>{name}</TableCell>
              <TableCell>
                <Input
                  type="number"
                  value={grade}
                  onChange={(e) => handleGradeChange(id, e.target.value)}
                  className="w-24"
                  min={0}
                  max={100}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Button onClick={handleSave} className="bg-blue-600 text-white hover:bg-blue-700">
        Save Grades
      </Button>
    </div>
  );
}
