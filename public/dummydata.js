// dummyDashboardData.js

// --- 1. Caso de uso: General / Colegio (Admin) ---
// Muestra el promedio de todos los estudiantes en cada materia a nivel colegio.
export const schoolOverallStatistics = [
  { id: 1, subject: "Matemáticas", avgGrade: 4.0, icon: "icon-[solar--calculator-minimalistic-broken]", color: "bg-blue-500", description: "Promedio general del colegio" },
  { id: 2, subject: "Lengua Castellana", avgGrade: 7.5, icon: "icon-[material-symbols--language-spanish]", color: "bg-green-500", description: "Promedio general del colegio" },
  { id: 3, subject: "Biología", avgGrade: 5.8, icon: "icon-[ph--plant]", color: "bg-green-500", description: "Promedio general del colegio" },
  { id: 4, subject: "Química", avgGrade: 6.0, icon: "icon-[carbon--chemistry]", color: "bg-green-500", description: "Promedio general del colegio" },
  { id: 5, subject: "Física", avgGrade: 4.5, icon: "icon-[hugeicons--physics]", color: "bg-yellow-500", description: "Promedio general del colegio" },
  { id: 6, subject: "Ciencias Sociales", avgGrade: 5.1, icon: "icon-[famicons--earth]", color: "bg-yellow-500", description: "Promedio general del colegio" },
  { id: 7, subject: "Inglés", avgGrade: 6.9, icon: "icon-[meteor-icons--language]", color: "bg-green-500", description: "Promedio general del colegio" },
  { id: 8, subject: "Artes", avgGrade: 8.8, icon: "icon-[streamline-plump--paint-palette-remix]", color: "bg-green-500", description: "Promedio general del colegio" },
  { id: 9, subject: "Educación Física", avgGrade: 9.0, icon: "icon-[material-symbols--exercise-outline]", color: "bg-green-500", description: "Promedio general del colegio" },
  { id: 10, subject: "Ética y Valores", avgGrade: 7.1, icon: "icon-[la--dove]", color: "bg-green-500", description: "Promedio general del colegio" },
  { id: 11, subject: "Informática", avgGrade: 8.0, icon: "icon-[ri--computer-line]", color: "bg-green-500", description: "Promedio general del colegio" },
  { id: 8, subject: "Artes", avgGrade: 8.8, icon: "icon-[streamline-plump--paint-palette-remix]", color: "bg-green-500", description: "Promedio general del colegio" },
  { id: 9, subject: "Educación Física", avgGrade: 9.0, icon: "icon-[material-symbols--exercise-outline]", color: "bg-green-500", description: "Promedio general del colegio" },
  { id: 10, subject: "Ética y Valores", avgGrade: 7.1, icon: "icon-[la--dove]", color: "bg-green-500", description: "Promedio general del colegio" },
  { id: 11, subject: "Informática", avgGrade: 8.0, icon: "icon-[ri--computer-line]", color: "bg-green-500", description: "Promedio general del colegio" },
];

// --- 2. Caso de uso: Estudiante ---
// Muestra las notas individuales del estudiante en cada materia.
export const studentPersonalStatistics = {
  studentId: "STU001",
  studentName: "José Pérez",
  currentGradeLevel: "8°A",
  subjects: [
    { id: 1, subject: "Matemáticas", grade: 5.6, icon: "icon-[solar--calculator-minimalistic-broken]", color: "bg-green-500" },
    { id: 2, subject: "Lengua Castellana", grade: 7.0, icon: "icon-[material-symbols--language-spanish]", color: "bg-green-500" },
    { id: 3, subject: "Biología", grade: 4.8, icon: "icon-[ph--plant]", color: "bg-yellow-500" },
    { id: 4, subject: "Química", grade: 6.5, icon: "icon-[carbon--chemistry]", color: "bg-green-500" },
    { id: 5, subject: "Física", grade: 3.5, icon: "icon-[hugeicons--physics]", color: "bg-red-500" },
    { id: 6, subject: "Ciencias Sociales", grade: 1.0, icon: "icon-[famicons--earth]", color: "bg-red-500" },
    { id: 7, subject: "Inglés", grade: 3.0, icon: "icon-[meteor-icons--language]", color: "bg-red-500" },
    { id: 8, subject: "Artes", grade: 8.5, icon: "icon-[streamline-plump--paint-palette-remix]", color: "bg-green-500" },
    { id: 9, subject: "Educación Física", grade: 9.2, icon: "icon-[material-symbols--exercise-outline]", color: "bg-green-500" },
    { id: 10, subject: "Ética y Valores", grade: 6.8, icon: "icon-[la--dove]", color: "bg-green-500" },
    { id: 11, subject: "Informática", grade: 7.5, icon: "icon-[ri--computer-line]", color: "bg-green-500" },
  ],
  overallAverage: 5.66 // Promedio general del estudiante
};


// --- 3. Caso de uso: Docente ---
// Muestra el promedio de los diferentes cursos/grupos a los que imparte la materia.
export const teacherCourseStatistics = {
  teacherId: "TEA001",
  teacherName: "Profesora Ana López",
  subjectTaught: "Matemáticas", // La materia que imparte este docente
  courses: [
    {
      courseId: "M8A",
      courseName: "Matemáticas 8°A",
      avgGrade: 6.8, // Promedio de este curso/grupo
      icon: "icon-[solar--calculator-minimalistic-broken]", // Icono de la materia que enseña
      color: "bg-green-500"
    },
    {
      courseId: "M8B",
      courseName: "Matemáticas 8°B",
      avgGrade: 5.5,
      icon: "icon-[game-icons--numerical-sequence]",
      color: "bg-yellow-500"
    },
    {
      courseId: "M9A",
      courseName: "Matemáticas 9°A",
      avgGrade: 7.2,
      icon: "icon-[game-icons--numerical-sequence]",
      color: "bg-green-500"
    },
    {
      courseId: "M9B",
      courseName: "Matemáticas 9°B",
      avgGrade: 6.1,
      icon: "icon-[game-icons--numerical-sequence]",
      color: "bg-green-500"
    },
    {
      courseId: "M10A",
      courseName: "Matemáticas 10°A",
      avgGrade: 7.8,
      icon: "icon-[game-icons--numerical-sequence]",
      color: "bg-green-500"
    },
  ],
  overallCourseAverage: 6.68 // Promedio general de todos los cursos que imparte en esta materia
};

// Puedes añadir más datos de estudiantes o docentes si lo necesitas

export const DUMMY_POSTS = [
  {
    id: "post-1",
    author: "Marwin Gaviria",
    authorRole: "Administración",
    authorAvatar: "https://github.com/shadcn.png",
    timestamp: "2025-07-26T10:00:00.000Z", // Example ISO string
    content: "¡Recordatorio de la guía de números primos! Es importante repasar estos conceptos antes del examen final. Adjunto el documento.",
    attachment: {
      name: "NumeroPrimos.pdf",
      type: "application/pdf",
      url: "/dummy_assets/NumeroPrimos.pdf" // Placeholder URL, replace with actual path or Blob URL
    },
    visibilityGroups: ['1a', '2a', '3a', 'teachers'],
  },
  {
    id: "post-2",
    author: "Lorena Fuentes",
    authorRole: "Profesora",
    authorAvatar: "https://api.dicebear.com/7.x/initials/svg?seed=LF", // Dummy avatar
    timestamp: "2025-07-25T14:30:00.000Z",
    content: "El proyecto de arte ha quedado espectacular. ¡Felicitaciones a todos los estudiantes que participaron! Aquí una foto.",
    attachment: {
      name: "ProyectoArte.jpg",
      type: "image/jpeg",
      url: "/ellipses.png" // Dummy image URL
    },
    visibilityGroups: ['4a', 'teachers'],
  },
  {
    id: "post-3",
    author: "Carlos Gómez",
    authorRole: "Estudiante",
    authorAvatar: "https://api.dicebear.com/7.x/initials/svg?seed=CG",
    timestamp: "2025-07-24T09:15:00.000Z",
    content: "Próxima reunión del club de robótica el viernes a las 3 PM en la sala de computación.",
    attachment: null, // No attachment for this post
    visibilityGroups: ['all'],
  },
  {
    id: "post-4",
    author: "Marwin Gaviria",
    authorRole: "Administración",
    authorAvatar: "https://github.com/shadcn.png",
    timestamp: "2025-07-23T11:45:00.000Z",
    content: "Aquí tienen la plantilla para el informe del segundo semestre. Por favor, usen este formato para evitar inconsistencias.",
    attachment: {
      name: "InformeSemestre.xlsx",
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // Excel MIME type
      url: "/dummy_assets/InformeSemestre.xlsx" // Placeholder URL
    },
    visibilityGroups: ['teachers', 'admins'],
  },
];


// data para gestion de usuarios:

// dummydata.js (o un archivo similar para tus datos de prueba)

export const DUMMY_USERS = [
    {
        id: '1014283348',
        name: 'Nicolas Romero',
        rol: 'Estudiante',
        cargo: 'Estudiante',
        estado: 'Inactivo',
        curso: ["8A"] // Changed to an array
    },
    {
        id: '1014283348', // Still a duplicate ID in the dummy data, consider making unique in real app
        name: 'Juan Gomez',
        rol: 'Docente',
        cargo: 'Fisica',
        estado: 'Activo',
        curso: ["8A", "7A", "6B"] // Changed to an array
    },
    {
        id: '1014283349',
        name: 'Lucia Martinez',
        rol: 'Docente',
        cargo: 'Ingles',
        estado: 'Activo',
        curso: ["4A", "5A", "6A"] // Changed to an array
    },
    {
        id: '1014283350',
        name: 'Paz Martinez',
        rol: 'Administracion',
        cargo: 'Direccion',
        estado: 'Activo',
        // No 'curso' property or: curso: [] if preferred
    },
    {
        id: '1014283351',
        name: 'Andrea Carrillo',
        rol: 'Docente',
        cargo: 'Historia',
        estado: 'Activo',
        curso: ["10A", "9C", "11A"] // Changed to an array
    },
    {
        id: '1014283352',
        name: 'Macarena Laree',
        rol: 'Estudiante',
        cargo: 'Estudiante',
        estado: 'Inactivo',
        curso: ["6A"] // Changed to an array
    },
    {
        id: '1014283353',
        name: 'Francisca Olmos',
        rol: 'Administracion',
        cargo: 'Secretaria',
        estado: 'Inactivo',
        // No 'curso' property or: curso: [] if preferred
    },
    {
        id: '1014283354',
        name: 'Moises Jofre',
        rol: 'Estudiante',
        cargo: 'Estudiante',
        estado: 'Activo',
        curso: ["4A"] // Changed to an array
    },
];