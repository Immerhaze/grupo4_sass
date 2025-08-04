'use client'
import Image from "next/image";
import { useState, useEffect } from "react";
import LandingPageContent from "@/components/landing/landingPage";
import IntroPage from "@/components/landing/introPage";

export default function Home() {
  const [showIntro, setShowIntro] = useState(true);

   useEffect(() => {
    // Configura un temporizador para que la animación termine después de N segundos
    const timer = setTimeout(() => {
      setShowIntro(false);
    }, 4000); // Por ejemplo, 4 segundos. Ajusta este tiempo

    // Limpia el temporizador si el componente se desmonta
    return () => clearTimeout(timer);
  }, []);


  return (
    <>
      {showIntro ? <IntroPage /> : 
      <div className=" w-full justify-self-center">
        <LandingPageContent />
      </div>
      }
    </>
    
  );
}
