"use client";

import { Card } from "@/app/components/Card";
import React, { useState } from "react";
import { FaGithub } from "react-icons/fa";

interface GitHubUser {
  name: string;
  avatar_url: string;
  bio: string;
  followers: string;
  html_url: string;
}

function Page() {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [error, setError] = useState("");

  const fetchUser = async () => {
    setError("");
    try {
      const response = await fetch(`https://api.github.com/users/${username}`);
      if (!response.ok) {
        throw new Error(
          "User not found or there was an error fetching the user."
        );
      }
      const data = await response.json();
      setUser(data);
    } catch (error) {
      setError("User not found or there was an error fetching the user.");
      setUser(null);
      console.log(error);
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      fetchUser();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 flex flex-col items-center mt-24  py-10">
      <div className="text-center my-8">
        <h1 className="text-3xl font-bold text-orange-500 flex items-center justify-center">
          <FaGithub className="mr-2" /> Enter the GitHub Username You Want To
          Find
        </h1>
      </div>
      <div className="flex flex-col items-center py-4">
        <div className="flex mb-4">
          <input
            className="py-2 px-4 border border-orange-500 rounded mr-2 text-white focus:outline-none focus:ring-2 focus:ring-orange-500 "
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Enter GitHub username"
          />
          <button
            className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-orange-700"
            onClick={fetchUser}
          >
            Fetch User
          </button>
        </div>
        <div className="flex flex-col items-center">
          {error && <p className="text-red-500">{error}</p>}
          {user && (
            <Card
              username={user.name}
              avatar={user.avatar_url}
              bio={user.bio}
              followers={user.followers}
              url={user.html_url}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Page;
