'use client'

import React, { useState } from "react"
import { Card, CardHeader,CardTitle,CardContent } from "@/components/ui/card"
import { Select,SelectTrigger, SelectValue, SelectContent } from "@/components/ui/select"

export default function AdminGradesDashboard(){
    const [students, setStudents] = useState(second)
     const [searchName, setSearchName] = useState('');
       const [filterCourse, setFilterCourse] = useState('Todos');
       const [filterStatus, setFilterStatus] = useState('Todos');

       
         const [currentPage, setCurrentPage] = useState(1);
         const usersPerPage = 10 ;
    return(
        <div className="p-4 space-y-6">
            <h1 className="text-3xl font-bold mb-6">Panel de Administración</h1>
               <Card className="p-4">
                    <CardHeader className="flex flex-row justify-between items-center pb-2">
                        <CardTitle className="text-lg">Tabla de Calificaciones por Curso</CardTitle>
                        <Select value={null} onValueChange={null}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Seleccionar Materia" />
                            </SelectTrigger>
                            <SelectContent>
                                {/* {ALL_SUBJECTS.map(subject => (
                                    <SelectItem key={subject.id} value={subject.id}>
                                        {subject.name}
                                    </SelectItem>
                                ))} */}
                            </SelectContent>
                        </Select>
                    </CardHeader>
                    <CardContent>
                      
                    </CardContent>
                </Card>

        </div>

    )
}