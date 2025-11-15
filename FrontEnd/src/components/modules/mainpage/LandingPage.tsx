import React from "react";
import petImage from "@/assets/img/pet.webp";
import HeaderSection from "@/components/landing/HeaderSection";
import HeroSection from "@/components/landing/HeroSection";
import FeaturesSection from "@/components/landing/FeaturesSection";
import HowItWorksSection from "@/components/landing/HowItWorksSection";
import FeaturesMainSection from "@/components/landing/FeaturesMainSection";
import CTASection from "@/components/landing/CTASection";
import { featuresData } from "@/components/landing/data/featuresData";
import { stepsData } from "@/components/landing/data/stepsData";
import { mainFeatures } from "@/components/landing/data/mainFeaturesData";

const LandingPage = () => {
  return (
    <div className="bg-gray-50 dark:bg-gray-900 font-display text-gray-800 dark:text-gray-100">
      <HeaderSection
        title="Pet Health Tracker"
        loginText="Iniciar Sesión"
        loginHref="/login"
        registerText="Registrarse Gratis"
        registerHref="/register"
      />

      <HeroSection
        title="La salud de tu mejor amigo, en un solo lugar"
        description="Gestiona vacunas, dieta y citas veterinarias de forma sencilla. Todo lo que necesitas para cuidar a tu mascota, siempre a mano."
        buttonText="Comienza Gratis Ahora"
        buttonHref="/register"
        imageSrc={petImage.src}
        imageAlt="Mascota feliz"
      />

      <FeaturesSection
        heading="Todo lo que necesitas"
        description="Herramientas diseñadas para organizar y mejorar la salud de tu mascota."
        features={featuresData}
      />

      <HowItWorksSection heading="¿Cómo funciona?" steps={stepsData} />

      <FeaturesMainSection
        heading="Funciones principales del sistema"
        features={mainFeatures}
      />

      <CTASection
        heading="¿Listo para darle a tu mascota el mejor cuidado?"
        description="Únete a miles de dueños que ya gestionan la salud de sus mascotas de forma sencilla."
        buttonText="Regístrate Gratis"
        buttonLink="/register"
      />
    </div>
  );
};

export default LandingPage;
