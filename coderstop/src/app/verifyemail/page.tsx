"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";


function Page() {
  const router = useRouter();
  const [token, setToken] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const fetchToken = async () => {
    setLoading(true);
    setError(false);
    setMessage("");
    try {
      const response = await axios.post("/api/users/verifyemail", { token });
      setMessage(response.data.message);
      router.push("/messages/postemailverification");
    } catch (error) {
      setError(true);
      setMessage("Verification failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  //http://localhost:3000/verifyemail?token=$2a$10$Ag7DvQbmyhXTkeawaVgdUus6tesoPC4svMZe5cz/0rlQir9oPSOLm
  //https://localhost:3000/verifyemail?token=$2a$10$Ag7DvQbmyhXTkeawaVgdUus6tesoPC4svMZe5cz/0rlQir9oPSOLm
  useEffect(() => {
    const urlToken: any = new URLSearchParams(window.location.search).get(
      "token"
    );
    setToken(urlToken);
  }, []);

  return (
    <div className="flex flex-col items-center mt-20">
      <h1 className="text-2xl font-semibold text-gray-800 mb-4 mt-16">
        Click on the button to verify
      </h1>
      <button
        onClick={fetchToken}
        className={`px-4 py-2 text-white rounded ${
          loading ? "bg-gray-500" : "bg-blue-500 hover:bg-blue-700"
        }`}
        disabled={loading}
      >
        {loading ? "Verifying..." : "Verify me"}
      </button>
      {message && (
        <p
          className={`mt-4 text-lg ${
            error ? "text-red-500" : "text-green-500"
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
}

export default Page;
