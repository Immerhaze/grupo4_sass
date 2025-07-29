'use client'; // Necesario si usas hooks de React o interactividad futura

import React from 'react';

/**
 * Componente de Gráfico KPI Donut
 * @param {object} props - Propiedades del componente.
 * @param {number} props.value - El valor actual que se mostrará (e.g., 5.6).
 * @param {number} [props.maxValue=10] - El valor máximo del donut (total del 100%, por defecto 10).
 * @param {string} [props.fillColor="text-green-500"] - Clase de Tailwind para el color de la parte llena del donut (e.g., "text-green-500").
 * @param {string} [props.emptyColor="text-red-500"] - Clase de Tailwind para el color de la parte vacía del donut (e.g., "text-red-500").
 * @param {number} [props.size=100] - Tamaño (ancho y alto) del SVG en píxeles.
 * @param {number} [props.strokeWidth=10] - Grosor del anillo del donut.
 * @param {string|null} [props.label=null] - Etiqueta de texto para mostrar en el centro (e.g., el valor numérico).
 * @param {string|null} [props.icon=null] - Clase de Iconify para mostrar un icono debajo de la etiqueta (e.g., "icon-[bx--search]").
 */
export default function KpiDonutChart({
  value,
  maxValue = 10,
 fillColor = "stroke-green-500", 
  emptyColor = "stroke-red-500",  
  size = 100,
  strokeWidth = 10,
  label = null,
  icon = null
}) {
  const radius = (size - strokeWidth) / 2; // Radio del círculo, ajustado por el grosor del borde
  const circumference = 2 * Math.PI * radius; // Circunferencia total

  // Asegura que el valor esté dentro de los límites
  const normalizedValue = Math.min(Math.max(0, value), maxValue);

  // Calcula el offset para la parte llena del círculo
  // strokeDashoffset es la cantidad que se "desplaza" el inicio de la línea punteada.
  // Con strokeDasharray igual a la circunferencia, y un offset negativo, se dibuja un arco.
  const strokeDashoffset = circumference - (normalizedValue / maxValue) * circumference;

  return (
    <div className="relative flex flex-col items-center justify-center  transition-all duration-300 ease-in" style={{ width: size, height: size }}>
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="absolute top-0 left-0 transform -rotate-90 " // Rota para que el progreso inicie desde arriba
      >
        {/* Círculo de Fondo (parte vacía/roja) */}
        <circle
          cx={size / 2} // Centro X
          cy={size / 2} // Centro Y
          r={radius} // Radio
          strokeWidth={strokeWidth}
          className={`${emptyColor} opacity-70 transition-all duration-300 ease-in`} // Color de la parte vacía (rojo)
          fill="transparent"
        />

        {/* Círculo de Progreso (parte llena/verde/etc.) */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          className={`${fillColor} transition-all duration-300 ease-in`} // Color de la parte llena
          fill="transparent"
          strokeDasharray={circumference} // Longitud total del trazo
          strokeDashoffset={strokeDashoffset} // Offset para mostrar el progreso
          strokeLinecap="round" // Extremos redondeados para el trazo
        />
      </svg>

      {/* Contenido en el centro del donut (valor y/o icono) */}
      <div className="relative flex flex-col items-center justify-center  " style={{ zIndex: 1 }}>
        <p className='font-semibold tracking-wide'>
         {value}
         </p>
      </div>
    </div>
  );
}