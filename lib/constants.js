// src/lib/constants.js

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

export const ALL_GRADES = Array.from({ length: 11 }, (_, i) =>
  [`${i + 1}A`, `${i + 1}B`, `${i + 1}C`]
).flat();

export const PASS_THRESHOLD = 6.0;
