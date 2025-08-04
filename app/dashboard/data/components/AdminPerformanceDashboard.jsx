// src/components/AdminDashboard.jsx
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChartComponent } from './BarChartComponent'; // Corrected import path
import { LineChartComponent, MultiLineChartComponent } from './LineChartComponent'; // Now using this for multi-line

import {
    ALL_SUBJECTS,
    ALL_GRADES,
    getAdminOverallStudentPassFailCounts,
    getAdminSubjectAveragesAcrossAllCourses,
    getAdminOverallSubjectPerformance,
    getAdminCourseSubjectOverallAverages, // New import
    getAdminTeacherCourseAverages, // New import
} from '@/lib/DummyPerformanceOverallData'; // Corrected import path from '@/DummyPerformanceOverallData' to '@/lib/dummyPerformanceData'


const AdminDashboard = () => {
    const [selectedSubjectId, setSelectedSubjectId] = useState(ALL_SUBJECTS[0]?.id || '');
    const [selectedCourseForSubjectAverages, setSelectedCourseForSubjectAverages] = useState(ALL_GRADES[0] || ''); // For new Line Chart
    const [teacherPerformanceData, setTeacherPerformanceData] = useState([]); // For new Teacher Bar Chart

    const [totalStudents, setTotalStudents] = useState(0);
    const [passingStudents, setPassingStudents] = useState(0);
    const [failingStudents, setFailingStudents] = useState(0);
    const [courseSubjectAverages, setCourseSubjectAverages] = useState([]); // Data for existing Bar Chart 1
    const [overallSubjectAverages, setOverallSubjectAverages] = useState([]); // Data for existing Bar Chart 2
    const [courseSubjectLineData, setCourseSubjectLineData] = useState([]); // Data for new Line Chart (Avg per course per subject)


    useEffect(() => {
        // --- ADMIN DASHBOARD DATA LOADING ---

        // KPI Data
        const kpiData = getAdminOverallStudentPassFailCounts();
        setTotalStudents(kpiData.total);
        setPassingStudents(kpiData.passing);
        setFailingStudents(kpiData.failing);

        // Chart 1 Data: "Average per Subject across all Courses" (Bar Chart)
        setCourseSubjectAverages(getAdminSubjectAveragesAcrossAllCourses(selectedSubjectId));

        // Chart 2 Data: "Overall School Average per Subject" (Bar Chart)
        setOverallSubjectAverages(getAdminOverallSubjectPerformance());

        // New Chart 3 Data: "Average per Course per Subject" (Line Chart)
        if (selectedCourseForSubjectAverages) {
            setCourseSubjectLineData(getAdminCourseSubjectOverallAverages(selectedCourseForSubjectAverages));
        }

        // New Chart 4 Data: "Teacher Performance Averages" (Bar Chart)
        setTeacherPerformanceData(getAdminTeacherCourseAverages());

    }, [selectedSubjectId, selectedCourseForSubjectAverages]); // Re-run effect when selectors change

    // Dynamically get the data keys for the LineChartComponent
    // These are the subject IDs
    const lineChartDataKeys = ALL_SUBJECTS.map(subject => subject.id);
    const lineChartStrokes = ALL_SUBJECTS.map(subject => subject.chartColor); // Use chartColor from ALL_SUBJECTS

    return (
        <div className="p-4 space-y-6">
            <h1 className="text-3xl font-bold mb-6">Panel de Administración</h1>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Total de Estudiantes
                        </CardTitle>
                        <span className="text-2xl text-gray-500">🧑‍🎓</span>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{totalStudents}</div>
                        <p className="text-xs text-gray-500">
                            Estudiantes registrados en la escuela
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Estudiantes Aprobados
                        </CardTitle>
                        <span className="text-2xl text-green-500">✅</span>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{passingStudents}</div>
                        <p className="text-xs text-gray-500">
                            Basado en el rendimiento del último año
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Estudiantes No Aprobados
                        </CardTitle>
                        <span className="text-2xl text-red-500">❌</span>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{failingStudents}</div>
                        <p className="text-xs text-gray-500">
                            Necesitan refuerzo o repiten el año
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 gap-6">
                {/* Chart 1: Average per Subject across all Courses (Bar Chart) */}
                <Card className="p-4">
                    <CardHeader className="flex flex-row justify-between items-center pb-2">
                        <CardTitle className="text-lg">Promedio por Materia en Todos los Cursos</CardTitle>
                        <Select value={selectedSubjectId} onValueChange={setSelectedSubjectId}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Seleccionar Materia" />
                            </SelectTrigger>
                            <SelectContent>
                                {ALL_SUBJECTS.map(subject => (
                                    <SelectItem key={subject.id} value={subject.id}>
                                        {subject.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </CardHeader>
                    <CardContent>
                        <BarChartComponent
                            data={courseSubjectAverages}
                            xAxisDataKey="name"
                            barDataKey="avgGrade"
                            title={`Promedio de ${ALL_SUBJECTS.find(s => s.id === selectedSubjectId)?.name || 'Materia'} por Curso`}
                            description="Muestra el promedio de una materia específica en todos los cursos del colegio."
                            fill="#60a5fa"
                        />
                    </CardContent>
                </Card>

                {/* Chart 2: Overall School Average per Subject (Bar Chart) */}
                <Card className="p-4">
                    <CardHeader>
                        <CardTitle className="text-lg">Promedio General del Colegio por Asignatura</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <BarChartComponent
                            data={overallSubjectAverages}
                            xAxisDataKey="name"
                            barDataKey="avgGrade"
                            title="Promedio General del Colegio por Asignatura"
                            description="Muestra el promedio general de cada asignatura en todo el colegio."
                            fill="#84cc16"
                        />
                    </CardContent>
                </Card>

                {/* NEW CHART 3: Average per Course per Subject (Line Chart with multiple lines) */}
                <Card className="p-4">
                    <CardHeader className="flex flex-row justify-between items-center pb-2">
                        <CardTitle className="text-lg">Rendimiento Detallado por Alumno en Curso</CardTitle>
                        <Select value={selectedCourseForSubjectAverages} onValueChange={setSelectedCourseForSubjectAverages}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Seleccionar Curso" />
                            </SelectTrigger>
                            <SelectContent>
                                {ALL_GRADES.map(grade => (
                                    <SelectItem key={grade} value={grade}>
                                        {grade}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </CardHeader>
                    <CardContent>
                        <MultiLineChartComponent
                            data={courseSubjectLineData}
                            xAxisDataKey="name" // Student name will be on X-axis
                            lineDataKeys={lineChartDataKeys} // All subject IDs as individual lines
                            strokes={lineChartStrokes} // Colors for each subject line
                            title={`Promedio de Materias por Alumno en Curso ${selectedCourseForSubjectAverages}`}
                            description="Muestra el promedio de cada materia para los alumnos del curso seleccionado."
                        />
                    </CardContent>
                </Card>

                {/* NEW CHART 4: Teacher Performance Averages (Bar Chart) */}
                <Card className="p-4">
                    <CardHeader>
                        <CardTitle className="text-lg">Rendimiento Promedio de Cursos por Profesor</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <BarChartComponent
                            data={teacherPerformanceData}
                            xAxisDataKey="name" // Teacher name
                            barDataKey="avgGrade" // Average grade of courses/subjects they teach
                            title="Promedio de Cursos Impartidos por Profesor"
                            description="Muestra el promedio general de los cursos que cada profesor imparte en sus asignaturas."
                            fill="#ef4444" // Tailwind red-500
                        />
                    </CardContent>
                </Card>

            </div>
        </div>
    );
};

export default AdminDashboard;