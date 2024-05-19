'use client'
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
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
      }}
    >
     
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        style={{ padding: "8py", marginRight: "8px" }}
        placeholder="Enter username"
      />
      <button
        onClick={fetchContestDetail}
        style={{
          padding: "12py 1px",
          backgroundColor: "#007bff",
          color: "#fff",
          border: "none",
          cursor: "pointer",
          marginLeft: "8px",
        }}
      >
        Fetch Contest Details
      </button>
      
      {isLoading && <p style={{ marginTop: "20px" }}>Loading...</p>}
      
      {error && <p style={{ color: "red", marginTop: "20px" }}>{error}</p>}
      
      {contest && (
        <div
          style={{
            marginTop: "20px",
            border: "1px solid #ccc",
            padding: "10px",
            borderRadius: "5px",
            backgroundColor: "#f9f9f9",
          }}
        >
          <p>Total Contest: {contest.totalcontest}</p>
          <p>Rating: {contest.rating}</p>
          <p>Global Ranking: {contest.globalranking}</p>
          <p>Top Percent: {contest.toppercent}</p>
        </div>
      )}
    </div>
  );
}

export default Page;
