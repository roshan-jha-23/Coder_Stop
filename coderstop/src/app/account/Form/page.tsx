"use client";
import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";


const ProfileCompletionForm: React.FC = () => {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [bio, setBio] = useState<string>("");
  const [profilePictureUrl, setProfilePictureUrl] = useState<string>("");
  const [skills, setSkills] = useState<string>("");
  const [favoriteLanguage, setFavoriteLanguage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    setError("");
  }, [email, bio, profilePictureUrl, skills, favoriteLanguage]);

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleBioChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setBio(e.target.value);
  };

  const handleProfilePictureUrlChange = (e: ChangeEvent<HTMLInputElement>) => {
    setProfilePictureUrl(e.target.value);
  };

  const handleSkillsChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSkills(e.target.value);
  };

  const handleFavoriteLanguageChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFavoriteLanguage(e.target.value);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!email || !bio || !profilePictureUrl || !skills || !favoriteLanguage) {
      setError("Please fill in all fields.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post("/api/users/formdata", {
        email,
        bio,
        profilePicUrl: profilePictureUrl,
        skills,
        favoriteCodingLanguage: favoriteLanguage,
      });

      if (response.status === 200) {
        router.push("/dashboard"); // Navigate to the dashboard on successful profile update
      } else {
        setError("Failed to update profile.");
      }
    } catch (error: any) {
      console.error("Profile update failed", error);
     
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-800 to-purple-300">
      <form
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md"
        onSubmit={handleSubmit}
      >
        <header className="text-center mb-4">
          <h1 className="font-bold text-xl text-neutral-800">
            Complete Your Profile
          </h1>
          <p className="text-neutral-600 text-sm">
            Fill in the details to complete your profile
          </p>
        </header>

        {error && <p className="text-red-600 text-sm mb-4">{error}</p>}

        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email:
          </label>
          <input
            id="email"
            type="email"
            placeholder="eg: user@example.com"
            value={email}
            onChange={handleEmailChange}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="bio"
            className="block text-sm font-medium text-gray-700"
          >
            Beast coder Bio:
          </label>
          <textarea
            id="bio"
            placeholder="eg: I am Hungry coder"
            value={bio}
            onChange={handleBioChange}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="skills"
            className="block text-sm font-medium text-gray-700"
          >
            Skills:
          </label>
          <input
            id="skills"
            type="text"
            placeholder="eg: JavaScript, React, Node.js"
            value={skills}
            onChange={handleSkillsChange}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="favoriteLanguage"
            className="block text-sm font-medium text-gray-700"
          >
            Favorite Coding Language:
          </label>
          <input
            id="favoriteLanguage"
            type="text"
            placeholder="eg: Python, JavaScript"
            value={favoriteLanguage}
            onChange={handleFavoriteLanguageChange}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="profilePictureUrl"
            className="block text-sm font-medium text-gray-700"
          >
            Profile Picture URL:
          </label>
          <input
            id="profilePictureUrl"
            type="url"
            placeholder="eg: https://linkedin.com/in/yourprofilepic"
            value={profilePictureUrl}
            onChange={handleProfilePictureUrlChange}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          {loading ? "Updating..." : "Complete Profile"}
        </button>
      </form>
    </div>
  );
};

export default ProfileCompletionForm;
