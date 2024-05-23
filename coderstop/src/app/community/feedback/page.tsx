"use client";
import React from "react";
import { BackgroundBeams } from "@/app/components/ui/background-beams";
import Link from "next/link"; // Corrected import from next/link

function FeedbackPage() {
  return (
    <main className="h-[40rem] w-full rounded-md bg-neutral-950 relative flex flex-col items-center justify-center antialiased">
      <div className="max-w-2xl mx-auto p-6">
        <h1 className="relative z-10 text-4xl md:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-blue-500 text-center font-sans font-extrabold leading-tight">
          Your Feedback Matters
        </h1>
        <p className="text-neutral-400 max-w-lg mx-auto my-4 text-md md:text-lg text-center relative z-10">
          Welcome to CoderStop, the ultimate destination for all your coding
          needs. From tutorials to tools and resources, we have everything a
          coder requires to thrive. Join us and elevate your coding journey! We
          would love to hear your feedback—let us know how we can improve your
          experience.
        </p>
        <div className="relative z-10 w-full">
          <input
            type="text"
            placeholder="Your Feedback"
            className="rounded-lg border border-neutral-700 focus:ring-2 focus:ring-teal-400 w-full mt-4 bg-neutral-900 text-neutral-200 placeholder-neutral-500 p-3"
            aria-label="Enter your feedback"
          />
          <Link href="/">
            <button className="mt-4 w-full py-3 rounded-lg bg-gradient-to-r from-teal-400 to-blue-500 text-white font-semibold hover:from-teal-500 hover:to-blue-600 transition-all duration-300 ease-in-out">
              Submit Feedback
            </button>
          </Link>
        </div>
      </div>
      <BackgroundBeams />
    </main>
  );
}

export default FeedbackPage;
