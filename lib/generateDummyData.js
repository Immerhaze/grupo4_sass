import { ALL_SUBJECTS, ALL_GRADES, PASS_THRESHOLD } from './constants';

let idCounter = { student: 1000, teacher: 100 };

const getRandomGrade = () => parseFloat((Math.random() * (10 - 1) + 1).toFixed(1));
const generateId = (type) => {
    if (type === 'student') return `S${idCounter.student++}`;
    if (type === 'teacher') return `T${idCounter.teacher++}`;
    return null;
};

export const generateDummyTeachers = () => {
    const teachers = [];
    const subjectCounts = {
        'math': 5, 'spanish': 4, 'biology': 3, 'chemistry': 3, 'physics': 3,
        'social_studies': 3, 'english': 4, 'arts': 2, 'pe': 2, 'ethics': 2, 'it': 2,
    };

    const bySubject = new Map();

    ALL_SUBJECTS.forEach(subject => {
        const count = subjectCounts[subject.id] || 2;
        bySubject.set(subject.id, []);
        for (let i = 0; i < count; i++) {
            const teacher = {
                id: generateId('teacher'),
                name: `Prof. ${String.fromCharCode(65 + teachers.length % 26)} ${subject.name}`,
                teachingSubjects: [subject.id],
                coursesAssigned: [],
                isChiefTeacher: false,
                chiefTeacherOfGrades: [],
                rol: 'Docente'
            };
            teachers.push(teacher);
            bySubject.get(subject.id).push(teacher);
        }
    });

    return { teachers, bySubject };
};

export const assignCoursesToTeachers = (teachers, bySubject) => {
    for (const course of ALL_GRADES) {
        for (const subject of ALL_SUBJECTS) {
            const pool = bySubject.get(subject.id);
            const teacher = pool[Math.floor(Math.random() * pool.length)];
            if (!teacher.coursesAssigned.includes(course)) {
                teacher.coursesAssigned.push(course);
            }
        }
    }
};

export const assignChiefTeachers = (teachers) => {
  const unassignedCourses = [...ALL_GRADES];
  const numTeachers = teachers.length;
  const numChiefs = Math.floor(numTeachers / 2); // 50% exacto
  let chiefsAssigned = 0;

  // Barajamos aleatoriamente los profesores
  const shuffledTeachers = [...teachers].sort(() => Math.random() - 0.5);

  for (const teacher of shuffledTeachers) {
    if (chiefsAssigned >= numChiefs) break;

    const assignedCourses = [];

    // Usar cursos que ya tiene asignados
    for (const course of teacher.coursesAssigned) {
      if (assignedCourses.length >= 3) break;
      if (unassignedCourses.includes(course)) {
        assignedCourses.push(course);
        unassignedCourses.splice(unassignedCourses.indexOf(course), 1);
      }
    }

    // Si no llenó los 3 cursos, asignar aleatoriamente entre los no asignados aún
    while (assignedCourses.length < 3 && unassignedCourses.length > 0) {
      const randomIdx = Math.floor(Math.random() * unassignedCourses.length);
      assignedCourses.push(unassignedCourses.splice(randomIdx, 1)[0]);
    }

    if (assignedCourses.length > 0) {
      teacher.isChiefTeacher = true;
      teacher.chiefTeacherOfGrades = assignedCourses;
      chiefsAssigned++;
    }
  }
};


export const generateDummyStudents = (teachers) => {
    const students = [];

    for (const course of ALL_GRADES) {
        const chief = teachers.find(t => t.isChiefTeacher && t.chiefTeacherOfGrades.includes(course));
        const studentCount = Math.floor(Math.random() * 5) + 18;

        for (let i = 0; i < studentCount; i++) {
            const id = generateId('student');
            const studentGrades = {};
            const semesters = ['2024-1', '2024-2', '2025-1'];

            semesters.forEach(sem => {
                let semesterAverageSum = 0;
                let subjectCount = 0;

                const subjectGrades = ALL_SUBJECTS.map(subject => {
                    const grades = Array.from({ length: Math.floor(Math.random() * 3) + 3 }, (_, idx) => {
                        const score = getRandomGrade();
                        const assignedTeacher = teachers.find(t =>
                            t.teachingSubjects.includes(subject.id) &&
                            t.coursesAssigned.includes(course)
                        );
                        return {
                            id: `grade-${subject.id}-${id}-${sem}-${idx}`,
                            name: `Actividad ${idx + 1}`,
                            score,
                            date: new Date(2024, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toISOString().split('T')[0],
                            description: score < 5 ? 'Necesita mejorar en este tema' : 'Desempeño adecuado',
                            comments: score < 4 ? 'Requiere seguimiento adicional' :
                                      score < 6 ? 'Puede mejorar con más práctica' :
                                      'Buen trabajo',
                            teacherId: assignedTeacher?.id || 'unknown',
                        };
                    });

                    const averageGrade = parseFloat((grades.reduce((s, g) => s + g.score, 0) / grades.length).toFixed(1));
                    semesterAverageSum += averageGrade;
                    subjectCount++;

                    return {
                        subjectId: subject.id,
                        subjectName: subject.name,
                        individualGrades: grades,
                        averageGrade
                    };
                });

                const semesterAverage = parseFloat((semesterAverageSum / subjectCount).toFixed(1));
                studentGrades[sem] = {
                    subjects: subjectGrades,
                    semesterAverage
                };
            });

            const allSemesterAverages = Object.values(studentGrades).map(g => g.semesterAverage);
            const generalAverage = parseFloat((allSemesterAverages.reduce((a, b) => a + b, 0) / allSemesterAverages.length).toFixed(1));
            const status = generalAverage >= PASS_THRESHOLD ? 'Aprobado' : 'Reprobado';

            students.push({
                studentId: id,
                studentName: `Estudiante ${id.slice(1)}`,
                course,
                chiefTeacherId: chief?.id || null,
                gradesBySemester: studentGrades,
                generalAverage,
                status,
                rol: 'Estudiante'
            });
        }
    }

    return students;
};
