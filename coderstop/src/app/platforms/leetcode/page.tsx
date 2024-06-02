import React from "react";
import Link from "next/link";

function Layout({ children }: any) {
  return (
    <div className="relative h-screen bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 flex items-center justify-center">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-[500px] font-extrabold text-yellow-400 animate-pulse">
          C
        </div>
      </div>
      <div className="relative z-10 max-w-xl mx-auto bg-white bg-opacity-80 backdrop-blur-md p-8 rounded-lg shadow-lg text-center">
        {children}
      </div>
    </div>
  );
}

function Page() {
  return (
    <Layout>
      <div>
        <h1 className="text-4xl font-extrabold mb-8 text-black">Select one</h1>
        <ol className="text-xl text-black space-y-4">
          <li>
            <Link href="/platforms/leetcode/contest-rating">
          
                Rating
             
            </Link>
          </li>
          <li>
            <Link href="/platforms/leetcode/dailyproblem">
           
                Daily Problem
              
            </Link>
          </li>
          <li>
            <Link href="/platforms/leetcode/userdetail">
        
                User Details
             
            </Link>
          </li>
        </ol>
      </div>
    </Layout>
  );
}

export default Page;
