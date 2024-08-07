import { cn } from "@/utils/cn";
import Link from "next/link";
import React from "react";

function Page() {
  return (
    <div className="bg-gray-900 min-h-screen flex justify-center items-center">
      <div className="bg-gray-800 p-8 rounded-lg shadow-md max-w-md text-center">
        <h1 className="text-3xl text-white font-bold mb-6">Hello User </h1>
        <p className="text-lg text-gray-300 mb-6">
          Congratulations! You have been verified in our database. Now you can
          Fill in the form .
        </p>
        <Link href="/account/login" className={cn('hover:bg-white')}>
          <div className="inline-block px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300">
            SIGN IN TO EXPLORE MORE
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Page;
