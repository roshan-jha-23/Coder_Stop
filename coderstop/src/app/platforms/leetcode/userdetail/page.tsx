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
    <div className="min-h-screen bg-gradient-to-r from-black to-gray-900 flex flex-col items-center mt-24 py-10">
      <div className="text-center my-8">
        <h1 className="text-3xl font-bold text-yellow-500 flex items-center justify-center">
       Enter the LeetCode Username You Want
          To Find
        </h1>
      </div>
      <div className="flex flex-col items-center py-4">
        <div className="flex mb-4">
          <input
            className="py-2 px-4 border border-yellow-500 rounded mr-2 text-white bg-black focus:outline-none focus:ring-2 focus:ring-yellow-500"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Enter LeetCode username"
          />
          <button
            className="bg-yellow-500 hover:bg-yellow-700 text-black font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-yellow-700"
            onClick={fetchUser}
          >
            Search
          </button>
        </div>
        <div className="flex flex-col items-center">
          {error && <p className="text-red-500">{error}</p>}
          {user && (
            <Card1
              username={user.name}
              avatar={user.avatar}
              bio={user.about}
              ranking={user.ranking}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Page;
