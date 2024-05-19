import React from "react";
import Link from "next/link";

function Layout({ children }:any) {
  return (
    <div
      className="container mx-auto mt-16 px-4"
      style={{
        backgroundImage:
          "url('https://leetcode.com/static/images/LeetCode_Sharing.png')",
      }}
    >
      {children}
    </div>
  );
}

function Page() {
  return (
    <Layout>
      <div className="max-w-xl mx-auto bg-opacity-75 bg-teal-400 p-8 rounded-lg text-center">
        <h1 className="text-3xl font-bold mb-8">Select one</h1>
        <ol className="text-xl">
          <li className="mb-4">
            <Link href="/platforms/leetcode/contest-rating">Rating</Link>
          </li>
          <li className="mb-4">
            <Link href="/platforms/leetcode/dailyproblem">Daily Problem</Link>
          </li>
          <li>
            <Link href="/platforms/leetcode/userdetail">User Details</Link>
          </li>
        </ol>
      </div>
    </Layout>
  );
}

export default Page;
