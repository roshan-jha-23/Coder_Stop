import React from "react";

function Page() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="max-w-lg w-full mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-white">
          Signup Successful!
        </h1>
        <p className="text-center text-gray-600 dark:text-gray-300 mt-4">
          Ji, tusi signup kar chuke ho. Asin tuhade email vich ek confirmation
          mail paaya hai. Kripya, apne email vich jaake account confirm karo.
          Shukriya!
        </p>
        <div className="flex justify-center mt-8">
          <a
            href="https://mail.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 py-3 text-white bg-blue-600 rounded-full shadow hover:bg-blue-500 transition duration-300"
          >
            Go to Gmail
          </a>
        </div>
      </div>
    </main>
  );
}

export default Page;
