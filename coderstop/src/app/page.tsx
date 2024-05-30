import React from "react";
import HeroSection from "@/app/components/HeroSection";
import { AnimatedTooltipPreview } from "./components/OurTeam";

const MainPage = () => {
  return (
    <main className="min-h-screen bg-gray-100">
      <div className="mt-24">
        {" "}
        <header className="bg-gray-800 text-white py-6">
          <h1 className="text-3xl text-center font-bold">Coders! Whats Up</h1>
        </header>
        <section>
          <HeroSection />
        </section>
        <section>
          <AnimatedTooltipPreview />
        </section>
      </div>
      <footer className="bg-gray-800 text-white py-4 text-center">
        <p>&copy; 2024 CoderStop. All rights reserved.</p>
      </footer>
    </main>
  );
};

export default MainPage;
