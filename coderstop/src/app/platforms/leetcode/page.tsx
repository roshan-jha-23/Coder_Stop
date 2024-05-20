import React from "react";
import Link from "next/link";

function Layout({ children }: any) {
  return (
    <div className="relative h-screen bg-black flex items-center justify-center">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-[500px] font-bold text-yellow-500">C</div>
      </div>
      <div className="relative z-10 max-w-xl mx-auto bg-opacity-75 bg-white p-8 rounded-lg text-center">
        {children}
      </div>
    </div>
  );
}

function Page() {
  return (
    <Layout>
      <div>
        <h1 className="text-3xl font-bold mb-8 text-black">Select one</h1>
        <ol className="text-xl text-black">
          <li className="mb-4">
            <Link href="/platforms/leetcode/contest-rating">
              Rating
            </Link>
          </li>
          <li className="mb-4">
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
