'use client'
import React, { useEffect, useState } from "react";
import { Logout } from "../components/LogoutButton";

interface UserData {
  name: string;
  email: string;
  username: string;
  skill: string;
  favoriteCodingLanguage: string;
  bio: string;
  profilePicUrl: string;
}

function Dashboard() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("/api/users/me");
        const data = await response.json();
        if (response.ok) {
          setUserData(data.data);
        } else {
          setError(data.message);
        }
      } catch (error) {
        setError("Failed to fetch user data");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!userData) {
    return <div>No user data available</div>;
  }

  return (
    <div className="relative h-screen p-8">
      <div className="absolute top-0 right-0 m-4">
        <Logout />
      </div>
      <div className="max-w-4xl mx-auto mt-10 bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center space-x-4">
          <img
            src={userData.profilePicUrl}
            alt="Profile"
            className="w-20 h-20 rounded-full"
          />
          <div>
            <h2 className="text-2xl font-bold">{userData.name}</h2>
            <p className="text-gray-600">@{userData.username}</p>
          </div>
        </div>
        <div className="mt-4">
          <h3 className="text-xl font-semibold">About Me</h3>
          <p className="mt-2 text-gray-700">{userData.bio}</p>
        </div>
        <div className="mt-4">
          <h3 className="text-xl font-semibold">Skills</h3>
          <p className="mt-2 text-gray-700">{userData.skill}</p>
        </div>
        <div className="mt-4">
          <h3 className="text-xl font-semibold">Favorite Coding Language</h3>
          <p className="mt-2 text-gray-700">
            {userData.favoriteCodingLanguage}
          </p>
        </div>
        <div className="mt-4">
          <h3 className="text-xl font-semibold">Contact</h3>
          <p className="mt-2 text-gray-700">{userData.email}</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
