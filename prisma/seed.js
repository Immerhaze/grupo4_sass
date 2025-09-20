const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { v4: uuidv4 } = require('uuid');

async function main() {
  const institution = await prisma.institution.create({
    data: {
      id: uuidv4(),
      name: "Instituto Educativo DUCTU",
      address: "Calle Ficticia 123",
    },
  });

  // Crear administradores
  const adminPositions = [
    "General Admin", "Secretary", "Coordinator", "Admin", "Admin", "Admin",
  ];

  const admins = await Promise.all(
    adminPositions.map((position, index) =>
      prisma.user.create({
        data: {
          name: `Admin ${index + 1}`,
          email: `admin${index + 1}@ductu.edu.co`,
          password: "hashed_password",
          role: "ADMIN",
          position,
          document: `10000000${index}`,
          institutionId: institution.id,
        },
      })
    )
  );

  // Asignaturas
  const subjectNames = [
    "Matemáticas", "Lengua", "Biología", "Química", "Física", "Historia",
    "Geografía", "Filosofía", "Educación Física", "Inglés", "Tecnología",
  ];

  // Crear profesores
  const teachers = await Promise.all(
    subjectNames.map((subject, i) =>
      prisma.user.create({
        data: {
          name: `Profesor ${subject}`,
          email: `profesor${i + 1}@ductu.edu.co`,
          password: "hashed_password",
          role: "TEACHER",
          institutionId: institution.id,
        },
      })
    )
  );

  // Crear cursos (de 7° a 11°)
  const courses = await Promise.all(
    Array.from({ length: 5 }, (_, i) =>
      prisma.course.create({
        data: {
          name: `Grado ${7 + i}°`,
          institutionId: institution.id,
        },
      })
    )
  );

  // Asignar materias a cursos con profesores
  await Promise.all(
    subjectNames.map((subject, i) =>
      prisma.subject.create({
        data: {
          name: subject,
          courseId: courses[i % courses.length].id,
          teacherId: teachers[i].id,
        },
      })
    )
  );

  // Crear estudiantes por curso
  for (const course of courses) {
    for (let i = 1; i <= 10; i++) {
      await prisma.user.create({
        data: {
          name: `Estudiante ${course.name} #${i}`,
          email: `student_${course.name}_${i}@ductu.edu.co`,
          password: "hashed_password",
          role: "STUDENT",
          birthDate: new Date(2008, 0, 1),
          institutionId: institution.id,
          studentCourses: {
            connect: { id: course.id },
          },
        },
      });
    }
  }

  // Crear un periodo actual
  const period = await prisma.period.create({
    data: {
      name: "Primer Semestre 2025",
      startDate: new Date("2025-01-10"),
      endDate: new Date("2025-06-10"),
    },
  });

  // Crear publicaciones con visibilidad y curso asignado
  for (let i = 1; i <= 10; i++) {
    await prisma.post.create({
      data: {
        title: `Publicación ${i}`,
        content: "Contenido de la publicación...",
        isPublic: i % 3 === 0,
        authorId: admins[0].id,
        institutionId: institution.id,
        courses: {
          connect: [{ id: courses[i % courses.length].id }],
        },
      },
    });
  }

  console.log("✅ Seed completo");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
