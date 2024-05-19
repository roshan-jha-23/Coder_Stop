"use client";
import { Card1 } from "@/app/components/Card1";
import React, { useState } from "react";

interface LeetCodeUser {
  username: string;
  name: string;
  avatar: string;
  ranking: number;
  reputation: number;
  about: string;
}

function Page() {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState<LeetCodeUser | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchUser = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(
        `https://alfa-leetcode-api.onrender.com/${username}`
      );
      if (!response.ok) {
        throw new Error("User not found");
      }
      const data = await response.json();
      setUser(data);
    } catch (error) {
      setError("User not found or there was an error fetching the user.");
      setUser(null); // Clear the user state if there's an error
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      fetchUser();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Enter LeetCode username"
        className="border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:border-blue-500 mb-4 text-black"
      />
      <button
        onClick={fetchUser}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors mb-4"
      >
        Search
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {user && (
        <Card1
          username={user.name}
          avatar={user.avatar}
          bio={user.about}
          ranking={user.ranking}
        />
      )}
    </div>
  );
}

export default Page;
