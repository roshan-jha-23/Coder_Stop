"use client";
import React, { useState } from "react";
import { Label } from "@/app/components/ui/label";
import { Input } from "@/app/components/ui/input";
import { cn } from "@/utils/cn";
import axios from "axios";

import { useRouter } from "next/navigation";

function LoginPage() {
  const router=useRouter();
 
  const [newPassword, setNewPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Form validation
    if (newPassword.length < 6 || oldPassword.length < 6) {
      setError("Please enter valid Password passwords must be above 6 characters");
      setLoading(false);
      return;
    }
    try {
      const response = await axios.post("api/user/resetpassword", {
        oldPassword,
        newPassword,
      });
      
      router.push("/");
    } catch (error: any) {
      console.log("Signup failed", error);
  
    } finally {
      setLoading(false);
    }
  };
  const gotoprofile = () => {
    window.location.href = "/dashboard";
  };

  return (
    <main className="flex items-center justify-center min-h-screen">
      <div className="max-w-md mt-24 w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
        <header>
          <h1 className="font-bold text-center text-xl text-neutral-800 dark:text-neutral-200">
            Welcome Back Coder
          </h1>
          <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
            Login to your account
          </p>
        </header>

        {error && <p className="text-red-600 text-sm">{error}</p>}

        <form className="my-8" onSubmit={handleSubmit}>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="email">Old Password</Label>
            <Input
              id="email"
              placeholder="you@example.com"
              type="password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
          </LabelInputContainer>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="password">New Password</Label>
            <Input
              id="password"
              placeholder="••••••••"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </LabelInputContainer>

          <button
            onClick={gotoprofile}
            className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
            type="submit"
          >
            {loading ? "Logging in..." : "Login"}
            <BottomGradient />
          </button>
        </form>
      </div>
    </main>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};

export default LoginPage;
