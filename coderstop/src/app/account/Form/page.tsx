"use client";
import { useState, ChangeEvent, FormEvent } from "react";

interface ProfileCompletionFormProps {
  onSubmit: (formData: FormData) => void;
}

const ProfileCompletionForm: React.FC<ProfileCompletionFormProps> = ({
  onSubmit,
}) => {
  const [bio, setBio] = useState<string>("");
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [skills, setSkills] = useState<string>("");
  const [favoriteLanguage, setFavoriteLanguage] = useState<string>("");

  const handleBioChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setBio(e.target.value);
  };

  const handleProfilePictureChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setProfilePicture(e.target.files[0]);
    }
  };

  const handleSkillsChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSkills(e.target.value);
  };

  const handleFavoriteLanguageChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFavoriteLanguage(e.target.value);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("bio", bio);
    if (profilePicture) {
      formData.append("profilePicture", profilePicture);
    }
    formData.append("skills", skills);
    formData.append("favoriteLanguage", favoriteLanguage);
    onSubmit(formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-800 to-purple-300">
      <form
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md"
        onSubmit={handleSubmit}
      >
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
            htmlFor="profilePicture"
            className="block text-sm font-medium text-gray-700"
          >
            Profile Picture:
          </label>
          <input
            id="profilePicture"
            type="file"
            accept="image/*"
            onChange={handleProfilePictureChange}
            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-gray-50 file:text-gray-700 hover:file:bg-gray-100"
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Complete Profile
        </button>
      </form>
    </div>
  );
};

export default ProfileCompletionForm;
