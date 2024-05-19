'use client'
import Link from "next/link";
import { motion } from "framer-motion";
import { HeroHighlight, Highlight } from "./ui/hero-highlight";

function HeroSection() {
  return (
   <div
      className="h-auto md:h-[40rem] w-full rounded-md flex flex-col items-center justify-center relative overflow-hidden py-10 md:py-0 mx-auto mt-[4rem] md:mt-0"
      style={{ zIndex: 1 }}
    >
      <HeroHighlight>
        <motion.h1
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: [20, -5, 0],
          }}
          transition={{
            duration: 0.4,
            ease: [0.4, 0.0, 0.2, 1],
          }}
          className="text-2xl px-4 md:text-4xl lg:text-5xl font-bold text-neutral-700 dark:text-white max-w-4xl leading-relaxed lg:leading-snug text-center mx-auto "
        >
          Welcome to{" "}
          <Highlight className="text-black dark:text-white">
            CoderStop
          </Highlight>
          , your one-stop platform to manage and showcase your coding journey.
        </motion.h1>
      </HeroHighlight>
      <div className="p-4 relative z-10 w-full text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-800">
          Explore Your GitHub and LeetCode Profiles
        </h1>
        <p className="mt-4 text-lg md:text-xl text-gray-600">
          View your GitHub profile, followers, and avatar. Check out your
          LeetCode avatar and solved problems. Stay connected with our community
          and read insightful blogs.
        </p>
        <div className="mt-6">
          <Link href={"#"}>
            
              Explore Now
            
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
