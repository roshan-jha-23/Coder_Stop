"use client";
import React, { useEffect, useState } from "react";
import { Label } from "@/app/components/ui/label";
import { Input } from "@/app/components/ui/input";
import { cn } from "@/utils/cn";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { FaGoogle } from "react-icons/fa"; // Importing Google icon

function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [disableButton, setDisableButton] = useState(true);

  useEffect(() => {
    if (email.length > 0 && password.length > 0) {
      setDisableButton(false);
    } else {
      setDisableButton(true);
    }
  }, [email, password]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (email.length < 5 || password.length < 6) {
      setError("Please enter valid details");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post("/api/users/login", {
        email,
        password,
      });

      toast.success("Signin successful!");
      router.push("/dashboard"); // Navigate to the dashboard on successful login
    } catch (error: any) {
      console.log("Signin failed", error);
      toast.error(
        "Signin failed. Please check your credentials and try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="mt-20">
      <div className="max-w-md mt-24 w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
        <header>
          <h1 className="font-bold text-center text-xl text-neutral-800 dark:text-neutral-200">
            Welcome to CoderStop
          </h1>
          <p className="text-neutral-600 text-2xl max-w-sm text-center mt-2 dark:text-neutral-300">
            Sign In to CoderStop
          </p>
        </header>

        {error && <p className="text-red-600 text-sm">{error}</p>}

        <form className="my-8" onSubmit={handleSubmit}>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              placeholder="tylerdurderden@gmail.com"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </LabelInputContainer>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              placeholder="••••••••"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </LabelInputContainer>

          <button
            className={cn(
              "bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]",
              { "opacity-50 cursor-not-allowed": disableButton }
            )}
            type="submit"
            disabled={disableButton}
          >
            {loading ? "Signing in..." : "Sign In"}
            <BottomGradient />
          </button>

          <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-10 h-[1px] w-full" />

          <div className="flex flex-col space-y-4">
            <button
              className="flex items-center justify-center space-x-2 bg-red-600 text-white w-full py-2 rounded-md shadow-md"
              onClick={() => {
                router.push("/account");
              }}
            >
              <FaGoogle size={20} />
              <span>Sign Up with Google</span>
            </button>
          </div>
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
