"use client";
import React, { useState } from "react";

interface CF {
  contestId: number;
  index: string;
  name: string;
  type: string;
  rating: number;
  tags: string[];
}

function Page() {
  const [tag, setTag] = useState<string>("");
  const [problems, setProblems] = useState<CF[]>([]);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const fetchProblem = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(
        `https://codeforces.com/api/problemset.problems?tags=${tag}`
      );
      const data = await response.json();
      if (data.status === "OK") {
        setProblems(data.result.problems);
      } else {
        setError(data.comment);
      }
    } catch (error) {
      setError("Failed to fetch problems data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <input
          type="text"
          value={tag}
          onChange={(e) => setTag(e.target.value)}
          placeholder="Enter problem tag (e.g., implementation, dp, math)"
          className="w-full p-2 border rounded mb-4"
        />
        <button
          onClick={fetchProblem}
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Fetch Problems
        </button>

        {loading && <p className="mt-4 text-center">Loading...</p>}
        {error && (
          <p className="mt-4 text-center text-red-500">Error: {error}</p>
        )}
        {problems.length > 0 && (
          <ul className="mt-4">
            {problems.map((problem) => (
              <li
                key={`${problem.contestId}-${problem.index}`}
                className="mb-4 p-4 bg-gray-50 rounded shadow"
              >
                <p>
                  <strong>Name:</strong> {problem.name}
                </p>
                <p>
                  <strong>Contest ID:</strong> {problem.contestId}
                </p>
                <p>
                  <strong>Index:</strong> {problem.index}
                </p>
                <p>
                  <strong>Type:</strong> {problem.type}
                </p>
                <p>
                  <strong>Rating:</strong> {problem.rating}
                </p>
                <p>
                  <strong>Tags:</strong> {problem.tags.join(", ")}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Page;
