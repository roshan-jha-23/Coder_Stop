"use client";
import React, { useState } from "react";

// Define interface for LeetCodeContest
interface LeetCodeContest {
  totalcontest: number;
  rating: number;
  globalranking: number;
  toppercent: number;
}

// Define Page component
function Page() {
  // State hooks for username, contest details, error message, and loading state
  const [username, setUsername] = useState("");
  const [contest, setContest] = useState<LeetCodeContest | null>(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Function to fetch contest details
  const fetchContestDetail = async () => {
    setIsLoading(true);
    setError(""); // Clear previous error messages
    try {
      const response = await fetch(
        `https://alfa-leetcode-api.onrender.com/${username}/contest`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      setContest(data);
    } catch (error) {
      setError("Error fetching data");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black p-4">
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="p-2 mb-4 text-black bg-yellow-300 border border-yellow-500 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
        placeholder="Enter username"
      />
      <button
        onClick={fetchContestDetail}
        className="px-4 py-2 bg-yellow-500 text-black font-bold rounded-md hover:bg-yellow-600 transition duration-300"
      >
        Fetch Contest Details
      </button>
      {isLoading && (
        <p className="mt-4 text-yellow-500 animate-pulse">Loading...</p>
      )}
      {error && <p className="mt-4 text-red-500">{error}</p>}
      {contest && (
        <div className="mt-6 p-4 border border-yellow-500 rounded-md bg-black text-yellow-300 shadow-md w-full max-w-md">
          <h2 className="text-2xl font-extrabold mb-4">Contest Details</h2>
          <p className="mb-2">
            <strong>Total Contest:</strong> {contest.totalcontest}
          </p>
          <p className="mb-2">
            <strong>Rating:</strong> {contest.rating}
          </p>
          <p className="mb-2">
            <strong>Global Ranking:</strong> {contest.globalranking}
          </p>
          <p className="mb-2">
            <strong>Top Percent:</strong> {contest.toppercent}
          </p>
        </div>
      )}
    </div>
  );
}

export default Page;
