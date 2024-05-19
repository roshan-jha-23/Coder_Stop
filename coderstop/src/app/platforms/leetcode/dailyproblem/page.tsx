"use client";
import { AuroraBackground } from "@/app/components/ui/aurora-background";
import React, { useState, useEffect } from "react";

interface Leetcode {
  problem: string;
  example: string;
  linktoprob: string;
  title: string;
}

function Page(): JSX.Element {
  const [error, setError] = useState("");
  const [problem, setProblem] = useState<Leetcode | null>(null);

  const fetchDailyProblem = async () => {
    setError("");
    try {
      const response = await fetch("https://alfa-leetcode-api.onrender.com/daily");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setProblem(data);
    } catch (error) {
      setError("Cannot Fetch The Daily Problem");
      console.error(error);
    }
  };

  useEffect(() => {
    fetchDailyProblem();
  }, []);

  return (
    <div className=" flex-col items-center justify-center h-screen bg-red-500 text-center">
      {error && <p className="text-4xl mb-4">{error}</p>}
      {problem && (
        <AuroraBackground
          problem={problem.problem}
          example={problem.example}
          linktoprob={problem.linktoprob}
          title={problem.title}
        />
      )}
    </div>
  );
}

export default Page;
