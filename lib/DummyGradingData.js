import {
  generateDummyTeachers,
  assignCoursesToTeachers,
  assignChiefTeachers,
  generateDummyStudents,
} from './generateDummyData';

let teachers = [];
let students = [];
let bySubject = null;

const initialize = () => {
  const result = generateDummyTeachers();
  teachers = result.teachers;
  bySubject = result.bySubject;
  assignCoursesToTeachers(teachers, bySubject);
  assignChiefTeachers(teachers);
  students = generateDummyStudents(teachers);
};

// Siempre que se cargue el módulo, reinicia los datos
initialize();

export const DUMMY_TEACHERS = teachers;
export const DUMMY_STUDENT_PERFORMANCE_DATA_DETAILED = students;
