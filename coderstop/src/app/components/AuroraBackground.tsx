"use client";

import { motion } from "framer-motion";
import React from "react";
import { AuroraBackground } from "./ui/aurora-background";
interface props{
    problem:string;
    example:string;
    linktoprob:string;
    title:string;
}
export function AuroraBackgroundDemo({problem,example,linktoprob,title}:props) {
  const onpress=async()=>{

  }
  return (
    <AuroraBackground>
      <motion.div
        initial={{ opacity: 0.0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="relative flex flex-col gap-4 items-center justify-center px-4"
      >
        <div className="font-extralight text-base md:text-4xl dark:text-neutral-200 py-4">
          Title:{title}
        </div>
        <div className="text-3xl md:text-7xl font-bold dark:text-white text-center">
          {problem}
        </div>
        <div className="font-extralight text-base md:text-4xl dark:text-neutral-200 py-4">
          Example:{example}
        </div>
        <button
          onClick={onpress}
          className="bg-black dark:bg-white rounded-full w-fit text-white dark:text-black px-4 py-2 hover:bg-blue-300"
        >
          {linktoprob}:Solve Now
        </button>
      </motion.div>
    </AuroraBackground>
  );
}
