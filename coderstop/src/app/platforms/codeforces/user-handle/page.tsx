"use client";
import { CardForCF } from "@/app/components/CardForCodeF1";
import React, { useState } from "react";

interface CF {
  handle: string;
  firstName: string;
  country: string;
  rank: string;
  rating: number;
  avatar: string;
}

function Page() {
  const [user, setUser] = useState<CF | null>(null);
  const [handle, setHandle] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchUser = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(
        `https://codeforces.com/api/user.info?handles=${handle}`
      );
      const data = await response.json();
      if (data.status === "OK") {
        setUser(data.result[0]);
      } else {
        setError(data.comment);
        setUser(null);
      }
    } catch (error) {
      setError("Failed to fetch user data");
      setUser(null);
    }
    setLoading(false);
  };

  return (
    <div className="flex mt-24 items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md text-center">
        <h1 className="text-3xl font-bold mb-6">Codeforces User Info</h1>
        <input
          type="text"
          value={handle}
          onChange={(e) => setHandle(e.target.value)}
          placeholder="Enter Codeforces handle"
          className="w-full p-2 border border-gray-700 rounded-lg mb-4 focus:outline-none focus:border-indigo-500 bg-gray-900 text-white"
        />
        <button
          onClick={fetchUser}
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-500 transition duration-300"
        >
          Fetch User
        </button>

        {loading && <p className="mt-4 text-gray-500">Loading...</p>}
        {error && <p className="mt-4 text-red-500">Error: {error}</p>}
        {user && (
          <div className="mt-6">
            <CardForCF
              handle={user.handle}
              firstName={user.firstName}
              country={user.country}
              rank={user.rank}
              rating={user.rating}
              avatar={user.avatar}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default Page;
