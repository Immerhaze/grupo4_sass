// gradingUtils.js

// Requiere los datos generados
import { PASS_THRESHOLD } from './constants';
import { DUMMY_STUDENT_PERFORMANCE_DATA_DETAILED, DUMMY_TEACHERS } from './DummyGradingData';

// Obtener estudiantes por curso
export const getStudentsForGradingList = (course) => {
  return DUMMY_STUDENT_PERFORMANCE_DATA_DETAILED.filter(
    (student) => student.course === course
  );
};

// Obtener promedios por materia de un estudiante
export const getStudentSubjectAverages = (studentId, semester) => {
  const student = DUMMY_STUDENT_PERFORMANCE_DATA_DETAILED.find(s => s.studentId === studentId);
  if (!student) return [];

  const semesterData = student.gradesBySemester[semester];
  if (!semesterData) return [];

  return semesterData.subjects.map((subject) => ({
    subjectId: subject.subjectId,
    subjectName: subject.subjectName,
    average: subject.averageGrade,
  }));
};

// Obtener detalles de notas por materia
export const getStudentSubjectGradeDetails = (studentId, semester, subjectId) => {
  const student = DUMMY_STUDENT_PERFORMANCE_DATA_DETAILED.find(s => s.studentId === studentId);
  if (!student) return null;

  const semesterData = student.gradesBySemester[semester];
  if (!semesterData) return null;

  return semesterData.subjects.find(s => s.subjectId === subjectId) || null;
};

// Obtener cursos donde un profesor enseña su materia
export const getCoursesForTeacher = (teacherId) => {
  const teacher = DUMMY_TEACHERS.find(t => t.id === teacherId);
  if (!teacher) return [];
  return teacher.coursesAssigned || [];
};

// Obtener cursos donde un profesor es jefe de curso
export const getCoursesForChiefTeacher = (teacherId) => {
  const teacher = DUMMY_TEACHERS.find(t => t.id === teacherId);
  if (!teacher || !teacher.isChiefTeacher) return [];
  return teacher.chiefTeacherOfGrades || [];
};

// Obtener materia del profesor (asumimos una sola materia por profesor)
export const getTeacherSubject = (teacherId) => {
  const teacher = DUMMY_TEACHERS.find(t => t.id === teacherId);
  return teacher?.teachingSubjects?.[0] || null;
};

// Obtener estudiantes para un profesor (solo cursos asignados)
export const getStudentsForTeacher = (teacherId) => {
  const teacherCourses = getCoursesForTeacher(teacherId);
  return DUMMY_STUDENT_PERFORMANCE_DATA_DETAILED.filter(student =>
    teacherCourses.includes(student.course)
  );
};

// Obtener estudiantes para un profesor jefe
export const getStudentsForChiefTeacher = (teacherId) => {
  const chiefCourses = getCoursesForChiefTeacher(teacherId);
  return DUMMY_STUDENT_PERFORMANCE_DATA_DETAILED.filter(student =>
    chiefCourses.includes(student.course)
  );
};


export const passOrFail=(grade)=>{
    if(grade >= PASS_THRESHOLD){
        return true
    }else{
        return false
    }
}