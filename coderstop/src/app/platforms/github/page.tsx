"use client";

import { Card } from "@/app/components/Card";
import React, { useState } from "react";

// Define a type for the user data
interface GitHubUser {
  name: string;
  avatar_url: string;
  bio: string;
}

function Page() {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [error, setError] = useState("");

  const fetchUser = async () => {
    setError(""); // Clear any previous errors
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
      setUser(null); // Clear the user state if there's an error
      console.log(error);
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      fetchUser();
    }
  };

  return (
    <>
      <h1 className="flex justify-center bg-black text-blue-400 py-10">
        Enter the Username You Want To Find
      </h1>
      <div className="flex flex-col items-center py-4">
        <div className="flex mb-4">
          <input
            className="py-2 px-4 border rounded mr-2 text-black"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Enter GitHub username"
          />
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
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
            />
          )}
        </div>
      </div>
    </>
  );
}

export default Page;
