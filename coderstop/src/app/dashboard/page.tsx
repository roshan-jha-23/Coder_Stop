"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Logout } from "../components/LogoutButton";

interface UserData {
  name: string;
  email: string;
  username: string;
  skills: string;
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

  const takeMeToHome = () => {
    window.location.href = "/";
  };

  const handleConnectWithFriends = () => {
    const chatAppUrl = process.env.NEXT_PUBLIC_REAL_TIME_CHAT;
    if (chatAppUrl) {
      window.location.href = chatAppUrl;
    } else {
      console.error("Chat application URL is not defined");
    }
  };

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
    <div className="relative h-screen p-8 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 text-white">
      <header className="flex justify-between items-center p-4">
        <button
          onClick={takeMeToHome}
          className="bg-white text-black py-2 px-6 rounded-lg shadow-lg transform hover:scale-110 transition-transform"
        >
          Home
        </button>
        <button
          onClick={handleConnectWithFriends}
          className="bg-white text-black py-2 px-6 rounded-lg shadow-lg transform hover:scale-110 transition-transform"
        >
          Connect with Friends
        </button>
        <div className="text-xs">
          <Logout />
        </div>
      </header>
      <main className="max-w-4xl mx-auto mt-24 bg-white bg-opacity-80 p-6 rounded-lg shadow-md">
        <section className="flex items-center space-x-4">
          <div className="w-20 h-20 relative">
            <Image
              src={userData.profilePicUrl}
              alt="Profile"
              className="rounded-full border-4 border-blue-500"
              layout="fill"
              objectFit="cover"
            />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-black">{userData.name}</h1>
            <p className="text-gray-600">@{userData.username}</p>
          </div>
        </section>
        <section className="mt-4">
          <h2 className="text-xl font-semibold text-black">About Me</h2>
          <p className="mt-2 text-gray-700">{userData.bio}</p>
        </section>
        <section className="mt-4">
          <h2 className="text-xl font-semibold text-black">Skills</h2>
          <p className="mt-2 text-gray-700">{userData.skills}</p>
        </section>
        <section className="mt-4">
          <h2 className="text-xl font-semibold text-black">
            Favorite Coding Language
          </h2>
          <p className="mt-2 text-gray-700">
            {userData.favoriteCodingLanguage}
          </p>
        </section>
        <section className="mt-4">
          <h2 className="text-xl font-semibold text-black">Contact</h2>
          <p className="mt-2 text-gray-700">{userData.email}</p>
        </section>
      </main>
    </div>
  );
}

export default Dashboard;
