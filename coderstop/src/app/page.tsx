import React from "react";
import HeroSection from "@/app/components/HeroSection";
import { AnimatedTooltipPreview } from "./components/OurTeam";
import { TracingBeam1 } from "@/app/components/TracingBeam";
import { Reveal } from "./components/Reveal";
import { MacbookScrollDemo } from "./components/MacBook";
import { Heroji } from "./components/Heroji.";

const MainPage = () => {
  return (
    <main className="min-h-screen bg-dot-thick-slate-800 bg-black">
      <div className="mt-24">
        <section>
          <HeroSection />
        </section>
        <section>
          <Heroji/>
        </section>
        <section>
          <MacbookScrollDemo/>
        </section>
        <section>
          <TracingBeam1 />
        </section>
        <section>
          <Reveal />
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
