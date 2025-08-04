"use client";

import { BentoGrid, BentoGridItem } from "../ui/bentogrid";
import { ThreeDMarquee } from "../ui/3d-marquee";

const FEATURES = [
  {
    title: "Gestión Rápida de Calificaciones",
    description: "Agrega, edita e importa notas fácilmente, sin complicaciones.",
    className: "md:col-span-2",
    icon: "icon-[ic--twotone-history-edu]",
  },
  {
    title: "Paneles Personalizados",
    description: "Interfaz separada para docentes, jefes de curso y administradores.",
    className: "md:col-span-1",
    icon: "icon-[ic--twotone-manage-accounts]",
  },
  {
    title: "Importación Masiva vía Excel",
    description: "Carga evaluaciones en segundos con archivos compatibles.",
    className: "md:col-span-1",
    icon: "icon-[ph--microsoft-excel-logo-duotone]",
  },
  {
    title: "Comentarios Individuales",
    description: "Agrega retroalimentación específica para cada estudiante.",
    className: "md:col-span-2",
    icon: "icon-[solar--notes-bold-duotone]",
  },
  {
    title: "Toma decisiones Informadas",
    description: "Tablero de Datos para entender globalmente el rendimiento escolar.",
    className: "md:col-span-1",
    icon: "icon-[solar--database-bold-duotone]",
  },
  {
    title: "Seguridad y Control de Edición",
    description: "Notas editables solo por profesores y con control de fechas.",
    className: "md:col-span-2",
    icon: "icon-[solar--lock-keyhole-unlocked-bold-duotone]",
  },
];


 const images = [
    "https://assets.aceternity.com/cloudinary_bkp/3d-card.png",
    "https://assets.aceternity.com/animated-modal.png",
    "https://assets.aceternity.com/animated-testimonials.webp",
    "https://assets.aceternity.com/cloudinary_bkp/Tooltip_luwy44.png",
    "https://assets.aceternity.com/github-globe.png",
    "https://assets.aceternity.com/glare-card.png",
    "https://assets.aceternity.com/layout-grid.png",
    "https://assets.aceternity.com/flip-text.png",
    "https://assets.aceternity.com/hero-highlight.png",
    "https://assets.aceternity.com/carousel.webp",
    "https://assets.aceternity.com/placeholders-and-vanish-input.png",
    "https://assets.aceternity.com/shooting-stars-and-stars-background.png",
    "https://assets.aceternity.com/signup-form.png",
    "https://assets.aceternity.com/cloudinary_bkp/stars_sxle3d.png",
    "https://assets.aceternity.com/spotlight-new.webp",
    "https://assets.aceternity.com/cloudinary_bkp/Spotlight_ar5jpr.png",
    "https://assets.aceternity.com/cloudinary_bkp/Parallax_Scroll_pzlatw_anfkh7.png",
    "https://assets.aceternity.com/tabs.png",
    "https://assets.aceternity.com/cloudinary_bkp/Tracing_Beam_npujte.png",
    "https://assets.aceternity.com/cloudinary_bkp/typewriter-effect.png",
    "https://assets.aceternity.com/glowing-effect.webp",
    "https://assets.aceternity.com/hover-border-gradient.png",
    "https://assets.aceternity.com/cloudinary_bkp/Infinite_Moving_Cards_evhzur.png",
    "https://assets.aceternity.com/cloudinary_bkp/Lamp_hlq3ln.png",
    "https://assets.aceternity.com/macbook-scroll.png",
    "https://assets.aceternity.com/cloudinary_bkp/Meteors_fye3ys.png",
    "https://assets.aceternity.com/cloudinary_bkp/Moving_Border_yn78lv.png",
    "https://assets.aceternity.com/multi-step-loader.png",
    "https://assets.aceternity.com/vortex.png",
    "https://assets.aceternity.com/wobble-card.png",
    "https://assets.aceternity.com/world-map.webp",
  ];

export default function FeaturesSection() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-blue-950">
      {/* Background 3D Marquee */}
      <div className="absolute inset-0 z-0">
        <ThreeDMarquee images={images} />
      </div>

      {/* Foreground Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 py-24">
        <h2 className="text-4xl font-bold text-center tracking-wider mb-12 text-white drop-shadow-lg">
          Características Principales
        </h2>

        <BentoGrid className="max-w-4xl mx-auto md:auto-rows-[15rem]">
          {FEATURES.map((item, i) => (
            <BentoGridItem
              key={i}
              title={item.title}
              description={item.description}
              icon={item.icon}
              className={item.className}
            />
          ))}
        </BentoGrid>
      </div>
    </section>
  );
}
