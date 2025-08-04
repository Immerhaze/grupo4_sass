// src/lib/dummyPerformanceData.js

// ... (existing code for ALL_SUBJECTS, ALL_GRADES, DUMMY_TEACHERS, DUMMY_STUDENT_PERFORMANCE_DATA, getRandomGrade, generateId, etc. remains the same) ...

// Make sure these helper functions are defined as in the previous step:
// getStudentOverallAverageLatestSemester
// getStudentSubjectGradeLatestSemester

// --- CONFIGURATION CONSTANTS ---
const PASS_THRESHOLD = 6.0; // Grade >= this is considered passing

// 1. All Subjects in the School
export const ALL_SUBJECTS = [
    { id: 'math', name: 'Matemáticas', icon: "icon-[solar--calculator-minimalistic-broken]", color: "bg-blue-500", chartColor: "#4A90E2" },
    { id: 'spanish', name: 'Lengua Castellana', icon: "icon-[material-symbols--language-spanish]", color: "bg-green-500", chartColor: "#50E3C2" },
    { id: 'biology', name: 'Biología', icon: "icon-[ph--plant]", color: "bg-green-500", chartColor: "#F5A623" },
    { id: 'chemistry', name: 'Química', icon: "icon-[carbon--chemistry]", color: "bg-green-500", chartColor: "#BD10E0" },
    { id: 'physics', name: 'Física', icon: "icon-[hugeicons--physics]", color: "bg-yellow-500", chartColor: "#9013FE" },
    { id: 'social_studies', name: 'Ciencias Sociales', icon: "icon-[famicons--earth]", color: "bg-yellow-500", chartColor: "#4A4A4A" },
    { id: 'english', name: 'Inglés', icon: "icon-[meteor-icons--language]", color: "bg-green-500", chartColor: "#007AFF" },
    { id: 'arts', name: 'Artes', icon: "icon-[streamline-plump--paint-palette-remix]", color: "bg-green-500", chartColor: "#8E44AD" },
    { id: 'pe', name: 'Educación Física', icon: "icon-[material-symbols--exercise-outline]", color: "bg-green-500", chartColor: "#27AE60" },
    { id: 'ethics', name: 'Ética y Valores', icon: "icon-[la--dove]", color: "bg-green-500", chartColor: "#D35400" },
    { id: 'it', name: 'Informática', icon: "icon-[ri--computer-line]", color: "bg-green-500", chartColor: "#2C3E50" },
];

// Subject-specific teacher counts: total 33 teachers as requested
const SUBJECT_TEACHER_COUNTS = {
    'math': 5,
    'spanish': 4,
    'biology': 3,
    'chemistry': 3,
    'physics': 3,
    'social_studies': 3,
    'english': 4,
    'arts': 2,
    'pe': 2,
    'ethics': 2,
    'it': 2,
};

// 2. Grades in the School (1A, 1B, 1C ... 11A, 11B, 11C)
export const ALL_GRADES = [];
for (let i = 1; i <= 11; i++) {
    ALL_GRADES.push(`${i}A`, `${i}B`, `${i}C`);
}

// Helper to generate a random grade (1.0 to 10.0)
const getRandomGrade = () => parseFloat((Math.random() * (10 - 1) + 1).toFixed(1));

// Helper to generate a student/teacher ID
let idCounter = { student: 1000, teacher: 100 };
const generateId = (type) => {
    if (type === 'student') return `S${idCounter.student++}`;
    if (type === 'teacher') return `T${idCounter.teacher++}`;
    return null;
};

// --- DUMMY TEACHERS GENERATION ---
export const DUMMY_TEACHERS = [];
const NUM_CHIEF_TEACHERS = 11; // Explicitly 11 chief teachers as requested
const COURSES_PER_CHIEF_TEACHER = 3; // Each chief teacher handles 3 courses as requested

// Create teachers for each subject based on specified counts
// Use a map to easily get teachers by subject for assignment
const teachersBySubject = new Map();

for (const subject of ALL_SUBJECTS) {
    const count = SUBJECT_TEACHER_COUNTS[subject.id];
    teachersBySubject.set(subject.id, []); // Initialize array for this subject
    for (let i = 0; i < count; i++) {
        const newTeacher = {
            id: generateId('teacher'),
            name: `Profesor/a ${String.fromCharCode(65 + DUMMY_TEACHERS.length % 26)} ${subject.name.split(' ')[0]}`,
            rol: 'Docente',
            teachingSubjects: [subject.id], // For simplicity, one main subject per teacher
            coursesAssigned: [], // Courses they actually teach (e.g., ['8A', '7B'])
            isChiefTeacher: false, // Will be determined later
            chiefTeacherOfGrades: [], // Array of grades they are chief of
        };
        DUMMY_TEACHERS.push(newTeacher);
        teachersBySubject.get(subject.id).push(newTeacher);
    }
}

// Assign courses to teachers to ensure every course has teachers for every subject
// Each teacher teaches their subject in multiple random grades.
ALL_GRADES.forEach(grade => {
    ALL_SUBJECTS.forEach(subject => {
        const teachersForThisSubject = teachersBySubject.get(subject.id);
        if (teachersForThisSubject && teachersForThisSubject.length > 0) {
            // Distribute teaching load amongst teachers for this subject
            // Get a random teacher from the pool for this subject and assign the grade
            const teacherToAssign = teachersForThisSubject[Math.floor(Math.random() * teachersForThisSubject.length)];

            // Assign the grade to the teacher if not already assigned
            if (!teacherToAssign.coursesAssigned.includes(grade)) {
                teacherToAssign.coursesAssigned.push(grade);
            }
        }
    });
});

// --- CHIEF TEACHER ASSIGNMENT (Deterministic to meet requirements) ---
const unassignedChiefGrades = [...ALL_GRADES];
const potentialChiefTeachers = [...DUMMY_TEACHERS].sort(() => 0.5 - Math.random());

let assignedChiefTeachers = 0;

for (const teacher of potentialChiefTeachers) {
    if (assignedChiefTeachers >= NUM_CHIEF_TEACHERS) {
        break;
    }

    const gradesForThisChief = [];
    // Prioritize grades this teacher already teaches AND are still unassigned as chief grades.
    for (const course of teacher.coursesAssigned) {
        if (gradesForThisChief.length < COURSES_PER_CHIEF_TEACHER && unassignedChiefGrades.includes(course)) {
            gradesForThisChief.push(course);
            unassignedChiefGrades.splice(unassignedChiefGrades.indexOf(course), 1);
        }
    }

    // Fill remaining slots with any available unassigned chief grades.
    while (gradesForThisChief.length < COURSES_PER_CHIEF_TEACHER && unassignedChiefGrades.length > 0) {
        const randomIndex = Math.floor(Math.random() * unassignedChiefGrades.length);
        const grade = unassignedChiefGrades.splice(randomIndex, 1)[0];
        gradesForThisChief.push(grade);
    }

    if (gradesForThisChief.length === COURSES_PER_CHIEF_TEACHER) {
        teacher.isChiefTeacher = true;
        teacher.chiefTeacherOfGrades = gradesForThisChief;
        assignedChiefTeachers++;
    }
}

if (unassignedChiefGrades.length > 0) {
    console.warn(`Warning: Not all grades were assigned a chief teacher. ${unassignedChiefGrades.length} grades remaining:`, unassignedChiefGrades);
}
if (assignedChiefTeachers !== NUM_CHIEF_TEACHERS) {
    console.warn(`Warning: Expected ${NUM_CHIEF_TEACHERS} chief teachers but found ${assignedChiefTeachers}.`);
}

// --- DUMMY STUDENT PERFORMANCE DATA GENERATION ---
export const DUMMY_STUDENT_PERFORMANCE_DATA = [];

ALL_GRADES.forEach(grade => {
    const numStudents = Math.floor(Math.random() * (22 - 18 + 1)) + 18; // 18-22 students per course

    const chiefTeacherForGrade = DUMMY_TEACHERS.find(t => t.isChiefTeacher && t.chiefTeacherOfGrades.includes(grade));

    for (let i = 0; i < numStudents; i++) {
        const studentId = generateId('student');
        const studentName = `Estudiante ${studentId.slice(1)}`;

        const semesters = ['2024-1', '2024-2', '2025-1']; // Example semesters
        const studentGradesBySemester = {};

        semesters.forEach(semester => {
            studentGradesBySemester[semester] = ALL_SUBJECTS.map(subject => ({
                subjectId: subject.id,
                subjectName: subject.name,
                notes: Array.from({ length: Math.floor(Math.random() * (8 - 6 + 1)) + 6 }, () => getRandomGrade()),
                grade: getRandomGrade(), // Simplified: direct average grade for subject in semester
            }));
        });

        DUMMY_STUDENT_PERFORMANCE_DATA.push({
            studentId: studentId,
            studentName: studentName,
            grade: grade, // e.g., '1A', '2B'
            rol: 'Estudiante',
            chiefTeacherId: chiefTeacherForGrade ? chiefTeacherForGrade.id : null,
            gradesBySemester: studentGradesBySemester,
        });
    }
});


// --- HELPER FUNCTIONS FOR DATA QUERIES ---

/**
 * Calculates the overall average grade for a student in their latest semester.
 * @param {Object} student - The student object from DUMMY_STUDENT_PERFORMANCE_DATA.
 * @returns {number} The overall average grade.
 */
const getStudentOverallAverageLatestSemester = (student) => {
    const latestSemesterKey = Object.keys(student.gradesBySemester).sort().pop();
    if (!latestSemesterKey) return 0;

    const semesterGrades = student.gradesBySemester[latestSemesterKey];
    if (!semesterGrades || semesterGrades.length === 0) return 0;

    const total = semesterGrades.reduce((sum, sg) => sum + sg.grade, 0);
    return parseFloat((total / semesterGrades.length).toFixed(1));
};

/**
 * Gets a student's grade in a specific subject for the latest semester.
 * @param {Object} student - The student object.
 * @param {string} subjectId - The ID of the subject.
 * @returns {number|null} The grade in the subject, or null if not found.
 */
const getStudentSubjectGradeLatestSemester = (student, subjectId) => {
    const latestSemesterKey = Object.keys(student.gradesBySemester).sort().pop();
    if (!latestSemesterKey) return null;

    const subjectGradeEntry = student.gradesBySemester[latestSemesterKey].find(sg => sg.subjectId === subjectId);
    return subjectGradeEntry ? subjectGradeEntry.grade : null;
};


// --- ADMIN DASHBOARD DATA FUNCTIONS ---

/**
 * Calculates overall student pass/fail counts for the entire school based on latest semester average.
 * @returns {{total: number, passing: number, failing: number}} Counts.
 */
export const getAdminOverallStudentPassFailCounts = () => {
    let total = DUMMY_STUDENT_PERFORMANCE_DATA.length;
    let passing = 0;
    let failing = 0;

    DUMMY_STUDENT_PERFORMANCE_DATA.forEach(student => {
        const overallAvg = getStudentOverallAverageLatestSemester(student);
        if (overallAvg >= PASS_THRESHOLD) {
            passing++;
        } else {
            failing++;
        }
    });

    return { total, passing, failing };
};

/**
 * Calculates the average grade for a specific subject across all courses (grades).
 * Used for the Admin Dashboard's "Average per Subject across all Courses" chart.
 * @param {string} subjectId - The ID of the subject to get averages for.
 * @returns {Array<{name: string, avgGrade: number}>} Data for a bar chart.
 */
export const getAdminSubjectAveragesAcrossAllCourses = (subjectId) => {
    const courseAverages = ALL_GRADES.map(grade => {
        let totalGrade = 0;
        let studentCount = 0;

        DUMMY_STUDENT_PERFORMANCE_DATA.filter(student => student.grade === grade).forEach(student => {
            const subjectGrade = getStudentSubjectGradeLatestSemester(student, subjectId);
            if (subjectGrade !== null) {
                totalGrade += subjectGrade;
                studentCount++;
            }
        });

        return {
            name: grade, // X-axis label
            avgGrade: studentCount > 0 ? parseFloat((totalGrade / studentCount).toFixed(1)) : 0,
        };
    });
    return courseAverages;
};

/**
 * Calculates the overall school average for each subject.
 * Used for the Admin Dashboard's "Overall School Average per Subject" chart.
 * @returns {Array<{name: string, avgGrade: number}>} Data for a bar chart.
 */
export const getAdminOverallSubjectPerformance = () => {
    return ALL_SUBJECTS.map(subject => {
        let totalGrade = 0;
        let gradeCount = 0;
        DUMMY_STUDENT_PERFORMANCE_DATA.forEach(student => {
            const subjectGrade = getStudentSubjectGradeLatestSemester(student, subject.id);
            if (subjectGrade !== null) {
                totalGrade += subjectGrade;
                gradeCount++;
            }
        });
        return {
            name: subject.name, // X-axis label (Subject Name)
            avgGrade: gradeCount > 0 ? parseFloat((totalGrade / gradeCount).toFixed(1)) : 0,
        };
    }).sort((a, b) => b.avgGrade - a.avgGrade); // Sort by average grade (optional)
};

/**
 * NEW FUNCTION: Gets the average grade for all subjects within a specific course.
 * Used for Admin Dashboard's "Promedio por Curso y Materia" Line Chart.
 * @param {string} courseId - The ID of the course (e.g., '1A').
 * @returns {Array<Object>} Data for a multi-line chart where each object has 'subjectName' and 'avgGrade'.
 */
export const getAdminCourseSubjectOverallAverages = (courseId) => {
    // We need data where each object represents a 'point' on the X-axis (e.g., each subject).
    // The structure will be: [{ name: 'Subject 1', avgGrade: X }, { name: 'Subject 2', avgGrade: Y }, ...]
    // But for a multi-line chart where x-axis is 'Subjects', we need:
    // [{ subjectName: 'Math', course1A: 7.5, course1B: 8.0, ... }]
    // OR if x-axis is 'Courses':
    // [{ courseName: '1A', mathAvg: 7.5, spanishAvg: 8.0, ... }]

    // Let's assume the X-axis for this new LineChart is "Subjects", and the lines are "Courses".
    // The request implies "promedio por curso en linechart mostrando con diferentes lineas todas las materias"
    // This usually means: X-axis = Students, Lines = Subjects (for a single student's performance)
    // OR X-axis = Subjects, Lines = Courses (for overall subject averages across courses)

    // Re-reading: "promedio por curso en linehcart mostrando con difernetes lineas todas las materias"
    // This implies ONE specific course chosen by the user.
    // X-axis: Subjects (within that chosen course)
    // Lines: There will be only ONE line, representing the average of each subject in that course.
    // If we want multiple lines, it would mean comparing multiple courses on the same chart,
    // which then the X-axis would be Subjects, and each line would be a different Course.
    // Let's go with the interpretation: X-axis = Subjects, ONE Line = Average of each subject in the SELECTED course.
    // If the user meant "multiple lines for multiple courses at once," that would be a different data structure.

    // Let's assume for this chart, the X-axis is 'Subjects', and we show average of each subject IN THAT COURSE.
    // This would be similar to the existing BarChartComponent, but as a line chart.
    // If the intention is to show multiple courses on one chart, the data structure needs rethinking.
    // For now, let's provide data that Recharts can handle for a single line for the selected course.

    // If "diferentes lineas todas las materias" means each subject gets its own line,
    // and the x-axis represents individual students, then it's a very dense chart.
    // Let's go with a clearer interpretation for multi-line:
    // X-axis: Courses (e.g., 1A, 1B, ...)
    // Lines: Individual Subjects (Math, Spanish, ...)
    // This means data structure like:
    // [ { name: '1A', math: 7.5, spanish: 8.2, biology: 6.9, ... }, { name: '1B', ... } ]

    // Given the prompt "promedio por curso en linehcart mostrando con difernetes lineas todas las materias"
    // and the option to "elegir de que curso quieren ver la grafica", it strongly suggests:
    // X-axis: Student Names (or index)
    // Lines: Average grade for each subject (for that student in that course). This can become very messy.

    // Let's simplify and interpret it as:
    // For a SELECTED COURSE: Show the AVERAGE of each subject.
    // If it's a line chart, the X-axis is the Subject Name.
    // Data: [{ name: "Math", avgGrade: 7.5 }, { name: "Spanish", avgGrade: 8.2 }, ...]
    // This is essentially what `getAdminSubjectAveragesAcrossAllCourses` provides but for a single course.

    // NEW INTERPRETATION based on "diferentes lineas todas las materias":
    // For a SELECTED COURSE: X-Axis represents STUDENT IDs (or just indices 1, 2, 3...)
    // EACH LINE represents a SUBJECT, showing that student's grade in that subject.
    // This creates a spiderweb graph potentially, but fits "diferentes lineas todas las materias".
    // This chart would show individual student subject performance within one course.

    // Let's try this data structure:
    // [
    //   { studentName: 'Student 1', math: 7.5, spanish: 8.2, biology: 6.9, ... },
    //   { studentName: 'Student 2', math: 6.8, spanish: 7.1, biology: 7.5, ... },
    //   ...
    // ]
    // The `lineDataKey` in `LineChartComponent` would then be an array of subject IDs.

    const courseStudents = DUMMY_STUDENT_PERFORMANCE_DATA.filter(s => s.grade === courseId);

    const chartData = courseStudents.map(student => {
        const studentData = { name: student.studentName }; // X-axis will be student names
        const latestSemesterKey = Object.keys(student.gradesBySemester).sort().pop();

        if (latestSemesterKey) {
            student.gradesBySemester[latestSemesterKey].forEach(subjectGrade => {
                studentData[subjectGrade.subjectId] = subjectGrade.grade; // Add subject grade as a key
            });
        }
        return studentData;
    });
    return chartData;
};

/**
 * NEW FUNCTION: Gets average grades for courses, grouped by the teacher who teaches that subject in that course.
 * This is a more complex aggregation. The prompt implies a chart comparing teachers based on their courses' averages.
 *
 * Let's structure this as: X-axis = Teacher Name, Y-axis = Average Grade
 * Each bar represents a teacher, and its height is the average grade of all courses they teach,
 * for the subjects they teach.
 * This might be too simplistic. A better approach might be:
 * X-axis: Courses taught by a teacher
 * Lines/Bars: Average grade for each subject in that course by that teacher.
 * This still feels like individual teacher dashboard data.
 *
 * "otra grafica que represete a os profes mostrando los promdeiods que los cursos que manejan toienen con ellos"
 *
 * Interpretation: Overall average grade of all students *in courses where that teacher teaches*
 * in the *subjects that teacher teaches*. This gives a teacher-centric performance view.
 *
 * Data: [{ name: 'Teacher A', avgGrade: 7.8 }, { name: 'Teacher B', avgGrade: 6.5 }, ...]
 */
export const getAdminTeacherCourseAverages = () => {
    const teacherAverages = DUMMY_TEACHERS.map(teacher => {
        let totalGrade = 0;
        let gradeCount = 0;

        teacher.coursesAssigned.forEach(courseId => {
            DUMMY_STUDENT_PERFORMANCE_DATA.filter(student => student.grade === courseId).forEach(student => {
                teacher.teachingSubjects.forEach(subjectId => {
                    const studentSubjectGrade = getStudentSubjectGradeLatestSemester(student, subjectId);
                    if (studentSubjectGrade !== null) {
                        totalGrade += studentSubjectGrade;
                        gradeCount++;
                    }
                });
            });
        });

        return {
            name: teacher.name,
            avgGrade: gradeCount > 0 ? parseFloat((totalGrade / gradeCount).toFixed(1)) : 0,
            teacherId: teacher.id // Useful for debugging or linking
        };
    });

    // Filter out teachers who don't teach any courses or have no data
    return teacherAverages.filter(t => t.avgGrade > 0).sort((a, b) => b.avgGrade - a.avgGrade);
};


// --- TEACHER DASHBOARD DATA FUNCTIONS (These remain unchanged from previous step) ---
// ... (getTeacherKpiData, getTeacherIndividualSubjectPerformance, getTeacherStudentsAtRisk, etc.) ...
// Make sure to include all of them.

/**
 * Gets KPI data for a regular teacher's own subjects/courses.
 * @param {string} teacherId - The ID of the teacher.
 * @returns {Object} KPI data.
 */
export const getTeacherKpiData = (teacherId) => {
    const teacher = DUMMY_TEACHERS.find(t => t.id === teacherId);
    if (!teacher) return null;

    let totalStudentsTaught = new Set(); // Use a Set to count unique students
    let passingStudentsOwnSubject = 0;
    let failingStudentsOwnSubject = 0;

    // Identify all students taught by this teacher for their specific subjects
    DUMMY_STUDENT_PERFORMANCE_DATA.forEach(student => {
        if (teacher.coursesAssigned.includes(student.grade)) { // If student is in a course taught by this teacher
            teacher.teachingSubjects.forEach(subjectId => {
                const studentSubjectGrade = getStudentSubjectGradeLatestSemester(student, subjectId);
                if (studentSubjectGrade !== null) {
                    totalStudentsTaught.add(student.studentId); // Count unique students

                    if (studentSubjectGrade >= PASS_THRESHOLD) {
                        passingStudentsOwnSubject++;
                    } else {
                        failingStudentsOwnSubject++;
                    }
                }
            });
        }
    });

    return {
        coursesTaught: teacher.coursesAssigned.length,
        totalStudentsTaught: totalStudentsTaught.size, // Total unique students
        passingStudentsOwnSubject: passingStudentsOwnSubject, // Sum of passing instances
        failingStudentsOwnSubject: failingStudentsOwnSubject, // Sum of failing instances
    };
};

/**
 * Gets individual student performance for a teacher's specific subject in a chosen course.
 * Used for the Teacher Dashboard's "Individual Student Performance in Teacher's Subject(s)" line chart.
 * @param {string} teacherId - The ID of the teacher.
 * @param {string} courseId - The ID of the course to get student data from.
 * @returns {Array<{name: string, grade: number, id: string}>} Data for a line chart.
 */
export const getTeacherIndividualSubjectPerformance = (teacherId, courseId) => {
    const teacher = DUMMY_TEACHERS.find(t => t.id === teacherId);
    if (!teacher || !teacher.teachingSubjects.length || !teacher.coursesAssigned.includes(courseId)) {
        return [];
    }

    const teacherSubjectId = teacher.teachingSubjects[0]; // Assuming one main teaching subject for simplicity

    const chartData = [];
    DUMMY_STUDENT_PERFORMANCE_DATA.filter(student => student.grade === courseId).forEach(student => {
        const studentSubjectGrade = getStudentSubjectGradeLatestSemester(student, teacherSubjectId);
        if (studentSubjectGrade !== null) {
            chartData.push({
                name: student.studentName,
                grade: studentSubjectGrade,
                id: student.studentId, // Useful for linking to specific student if needed
            });
        }
    });

    return chartData;
};

/**
 * Gets a list of students at risk of failing the teacher's specific subject(s).
 * @param {string} teacherId - The ID of the teacher.
 * @param {string} filterCourse - 'all' or a specific course ID to filter by.
 * @returns {Array<{id: string, name: string, course: string, grade: number}>} List of students.
 */
export const getTeacherStudentsAtRisk = (teacherId, filterCourse = 'all') => {
    const teacher = DUMMY_TEACHERS.find(t => t.id === teacherId);
    if (!teacher || !teacher.teachingSubjects.length) {
        return [];
    }

    const teacherSubjectId = teacher.teachingSubjects[0]; // Assuming one main teaching subject

    const atRiskStudents = [];
    DUMMY_STUDENT_PERFORMANCE_DATA.forEach(student => {
        const isStudentInTeacherCourse = teacher.coursesAssigned.includes(student.grade);
        const matchesFilterCourse = (filterCourse === 'all' || student.grade === filterCourse);

        if (isStudentInTeacherCourse && matchesFilterCourse) {
            const studentSubjectGrade = getStudentSubjectGradeLatestSemester(student, teacherSubjectId);
            if (studentSubjectGrade !== null && studentSubjectGrade < PASS_THRESHOLD) {
                atRiskStudents.push({
                    id: student.studentId,
                    name: student.studentName,
                    course: student.grade,
                    grade: studentSubjectGrade,
                });
            }
        }
    });

    return atRiskStudents;
};


// --- CHIEF TEACHER DASHBOARD DATA FUNCTIONS (These remain unchanged from previous step) ---

/**
 * Gets KPI data for a chief teacher's led courses.
 * @param {string} teacherId - The ID of the chief teacher.
 * @returns {Object} KPI data.
 */
export const getChiefTeacherKpiData = (teacherId) => {
    const chiefTeacher = DUMMY_TEACHERS.find(t => t.id === teacherId && t.isChiefTeacher);
    if (!chiefTeacher) return null;

    let totalStudentsInChiefCourses = new Set();
    let passingStudentsChiefCourses = 0;
    let failingStudentsChiefCourses = 0;

    DUMMY_STUDENT_PERFORMANCE_DATA.forEach(student => {
        if (chiefTeacher.chiefTeacherOfGrades.includes(student.grade)) {
            totalStudentsInChiefCourses.add(student.studentId);
            const overallAvg = getStudentOverallAverageLatestSemester(student);
            if (overallAvg >= PASS_THRESHOLD) {
                passingStudentsChiefCourses++;
            } else {
                failingStudentsChiefCourses++;
            }
        }
    });

    return {
        totalStudentsInChiefCourses: totalStudentsInChiefCourses.size,
        coursesLed: chiefTeacher.chiefTeacherOfGrades.length,
        passingStudentsChiefCourses: passingStudentsChiefCourses,
        failingStudentsChiefCourses: failingStudentsChiefCourses,
    };
};

/**
 * Gets overall subject averages for a specific course led by a chief teacher.
 * Used for the Chief Teacher Dashboard's "Overall Subject Averages for a Chief Course" bar chart.
 * @param {string} teacherId - The ID of the chief teacher.
 * @param {string} courseId - The ID of the course led by the chief teacher.
 * @returns {Array<{name: string, avgGrade: number}>} Data for a bar chart.
 */
export const getChiefCourseSubjectOverallAverages = (teacherId, courseId) => {
    const chiefTeacher = DUMMY_TEACHERS.find(t => t.id === teacherId && t.isChiefTeacher);
    if (!chiefTeacher || !chiefTeacher.chiefTeacherOfGrades.includes(courseId)) {
        return [];
    }

    const courseSubjectAverages = ALL_SUBJECTS.map(subject => {
        let totalGrade = 0;
        let studentCount = 0;

        DUMMY_STUDENT_PERFORMANCE_DATA.filter(student => student.grade === courseId).forEach(student => {
            const subjectGrade = getStudentSubjectGradeLatestSemester(student, subject.id);
            if (subjectGrade !== null) {
                totalGrade += subjectGrade;
                studentCount++;
            }
        });

        return {
            name: subject.name, // Subject Name
            avgGrade: studentCount > 0 ? parseFloat((totalGrade / studentCount).toFixed(1)) : 0,
        };
    });
    return courseSubjectAverages;
};

/**
 * Gets individual student overall performance for a specific course led by a chief teacher.
 * Used for the Chief Teacher Dashboard's "Individual Student Overall Performance in a Chief Course" line chart.
 * @param {string} teacherId - The ID of the chief teacher.
 * @param {string} courseId - The ID of the course led by the chief teacher.
 * @returns {Array<{name: string, overallAvgGrade: number, id: string}>} Data for a line chart.
 */
export const getChiefCourseStudentOverallPerformance = (teacherId, courseId) => {
    const chiefTeacher = DUMMY_TEACHERS.find(t => t.id === teacherId && t.isChiefTeacher);
    if (!chiefTeacher || !chiefTeacher.chiefTeacherOfGrades.includes(courseId)) {
        return [];
    }

    const chartData = [];
    DUMMY_STUDENT_PERFORMANCE_DATA.filter(student => student.grade === courseId).forEach(student => {
        const overallAvg = getStudentOverallAverageLatestSemester(student);
        chartData.push({
            name: student.studentName,
            overallAvgGrade: overallAvg,
            id: student.studentId,
        });
    });

    return chartData;
};

/**
 * Gets a list of students at risk of failing overall in a specific course led by a chief teacher.
 * @param {string} teacherId - The ID of the chief teacher.
 * @param {string} courseId - The ID of the course led by the chief teacher.
 * @returns {Array<{id: string, name: string, overallAvgGrade: number, atRiskSubjects: string[]}>} List of students.
 */
export const getChiefCourseStudentsAtRisk = (teacherId, courseId) => {
    const chiefTeacher = DUMMY_TEACHERS.find(t => t.id === teacherId && t.isChiefTeacher);
    if (!chiefTeacher || !chiefTeacher.chiefTeacherOfGrades.includes(courseId)) {
        return [];
    }

    const atRiskStudents = [];
    DUMMY_STUDENT_PERFORMANCE_DATA.filter(student => student.grade === courseId).forEach(student => {
        const overallAvg = getStudentOverallAverageLatestSemester(student);
        const latestSemesterKey = Object.keys(student.gradesBySemester).sort().pop();
        const atRiskSubjects = [];

        if (latestSemesterKey) {
            student.gradesBySemester[latestSemesterKey].forEach(sg => {
                if (sg.grade < PASS_THRESHOLD) {
                    atRiskSubjects.push(sg.subjectId);
                }
            });
        }

        if (overallAvg < PASS_THRESHOLD || atRiskSubjects.length > 0) { // Student is at risk if overall average is low OR they have any failing subject
            atRiskStudents.push({
                id: student.studentId,
                name: student.studentName,
                overallAvgGrade: overallAvg,
                atRiskSubjects: atRiskSubjects, // IDs of subjects they are failing
            });
        }
    });

    return atRiskStudents.sort((a, b) => a.overallAvgGrade - b.overallAvgGrade); // Sort by lowest average
};


// --- CONSOLE LOGS FOR VERIFICATION ---
console.log('--- DUMMY DATA GENERATION SUMMARY (Post-Refinement) ---');
console.log('Total Grades (Courses):', ALL_GRADES.length);
console.log('Total Teachers:', DUMMY_TEACHERS.length);
console.log('Total Chief Teachers:', DUMMY_TEACHERS.filter(t => t.isChiefTeacher).length);
console.log('Total Students:', DUMMY_STUDENT_PERFORMANCE_DATA.length);
console.log('Unassigned Chief Grades (should be 0):', unassignedChiefGrades.length);

// Verify some chief teacher assignments
DUMMY_TEACHERS.filter(t => t.isChiefTeacher).slice(0, 3).forEach(t => { // Log first 3 chief teachers
    console.log(`Chief Teacher ${t.name} (ID: ${t.id}): Chief of grades [${t.chiefTeacherOfGrades.join(', ')}]`);
});

// Verify a non-chief teacher assignment
const nonChiefTeacher = DUMMY_TEACHERS.find(t => !t.isChiefTeacher);
if (nonChiefTeacher) {
    console.log(`Non-Chief Teacher ${nonChiefTeacher.name} (ID: ${nonChiefTeacher.id}): Teaches subjects [${nonChiefTeacher.teachingSubjects.join(', ')}], Assigned to courses [${nonChiefTeacher.coursesAssigned.join(', ')}]`);
}

// Test Admin KPIs
const adminKpis = getAdminOverallStudentPassFailCounts();
console.log('Admin KPIs:', adminKpis);

// Test Teacher KPIs for a dummy teacher (find one that exists)
const sampleTeacherId = DUMMY_TEACHERS[0] ? DUMMY_TEACHERS[0].id : 'T100'; // Fallback
const teacherKpis = getTeacherKpiData(sampleTeacherId);
console.log(`Teacher KPIs for ${sampleTeacherId}:`, teacherKpis);

// Test Chief Teacher KPIs for a dummy chief teacher (find one that exists)
const sampleChiefTeacher = DUMMY_TEACHERS.find(t => t.isChiefTeacher);
if (sampleChiefTeacher) {
    const chiefTeacherKpis = getChiefTeacherKpiData(sampleChiefTeacher.id);
    console.log(`Chief Teacher KPIs for ${sampleChiefTeacher.id}:`, chiefTeacherKpis);
}

// NEW TEST for getAdminCourseSubjectOverallAverages
const sampleCourse = ALL_GRADES[0];
const courseSubjectAveragesData = getAdminCourseSubjectOverallAverages(sampleCourse);
console.log(`Admin Course Subject Averages for ${sampleCourse}:`, courseSubjectAveragesData.slice(0, 3), '...'); // Log first few

// NEW TEST for getAdminTeacherCourseAverages
const teacherAveragesData = getAdminTeacherCourseAverages();
console.log('Admin Teacher Course Averages:', teacherAveragesData.slice(0, 3), '...'); // Log first few