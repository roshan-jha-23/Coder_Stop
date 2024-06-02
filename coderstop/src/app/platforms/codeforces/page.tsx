"use client";
import { useRouter } from "next/navigation";
import React from "react";

function Page() {
  const router = useRouter();

  const fetchHandle = async () => {
    router.push("/platforms/codeforces/user-handle");
  };

  const fetchProblemSet = async () => {
    router.push("/platforms/codeforces/problem-set");
  };

  return (
    <div className="flex items-center bg-dot-thick-black justify-center h-screen bg-gray-900 relative overflow-hidden">
      <div className="relative z-10 text-center p-10 bg-black shadow-lg rounded-lg">
        <h1 className="text-4xl font-bold mb-4 text-indigo-600">CodeForce</h1>
        <p className="text-2xl mb-8 text-gray-300">
          So, whats on your mind, coder?
        </p>
        <button
          onClick={fetchHandle}
          className="bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-500 transition duration-300 mb-4"
        >
          Handle
        </button>
        <br />
        <button
          onClick={fetchProblemSet}
          className="bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-500 transition duration-300"
        >
          Problem Set
        </button>
      </div>
      <div className="absolute top-0 left-1/3 h-full w-2 bg-yellow-500 z-0"></div>
      <div className="absolute top-0 left-1/2 h-full w-2 bg-blue-500 z-0"></div>
      <div className="absolute top-0 left-2/3 h-full w-2 bg-red-500 z-0"></div>
    </div>
  );
}

export default Page;
