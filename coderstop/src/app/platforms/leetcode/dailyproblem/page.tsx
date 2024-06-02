"use client";
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
      const response = await fetch(
        "https://alfa-leetcode-api.onrender.com/daily"
      );
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
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 text-center p-8">
      {error && <p className="text-4xl mb-4 text-yellow-300">{error}</p>}
      {problem && (
        <div className="bg-black bg-opacity-75 p-6 rounded-lg shadow-lg max-w-2xl w-full">
          <h1 className="text-4xl font-extrabold text-yellow-300 mb-4">
            {problem.title}
          </h1>
          <p className="text-lg text-white mb-4">
            <strong>Problem:</strong> {problem.problem}
          </p>
          <p className="text-lg text-white mb-4">
            <strong>Example:</strong> {problem.example}
          </p>
          <a
            href={problem.linktoprob}
            className="text-xl text-yellow-300 underline hover:text-yellow-400 transition duration-300"
            target="_blank"
            rel="noopener noreferrer"
          >
            View Problem
          </a>
        </div>
      )}
    </div>
  );
}

export default Page;
