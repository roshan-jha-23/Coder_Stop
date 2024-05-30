import React from "react";

interface ProfileProps {
  avatarUrl: string;
  name: string;
  rank: number;
  bio: string;
  location: string;
  institution: string;
  profileLinks: {
    website: string;
    github: string;
    twitter: string;
    linkedin: string;
  };
  skills: string[];
  views: number;
  recentViews: number;
}

const ProfileSection: React.FC<ProfileProps> = ({
  avatarUrl,
  name,
  rank,
  bio,
  location,
  institution,
  profileLinks,
  skills,
  views,
  recentViews,
}) => {
  return (
    <div className="bg-gray-800 mt-24 text-white p-6 rounded-lg text-center shadow-lg">
      <img
        src={avatarUrl}
        alt="Avatar"
        className="w-24 h-24 rounded-full mx-auto border-4 border-green-500"
      />
      <h2 className="text-2xl font-bold mt-4">{name}</h2>
      <p className="text-sm text-gray-400 mt-1">Rank: {rank}</p>
      <p className="mt-2 text-lg">{bio}</p>
      <button className="mt-4 bg-green-500 text-white py-2 px-4 rounded-full hover:bg-green-700 transition duration-300">
        Edit Profile
      </button>
      <div className="mt-4 text-left">
        <p className="mt-2">
          <span className="font-semibold">Location:</span> {location}
        </p>
        <p className="mt-2">
          <span className="font-semibold">Institution:</span> {institution}
        </p>
      </div>
      <div className="mt-4 flex justify-center space-x-4">
        <a
          href={profileLinks.website}
          className="text-blue-400 hover:underline"
        >
          Website
        </a>
        <a href={profileLinks.github} className="text-blue-400 hover:underline">
          GitHub
        </a>
        <a
          href={profileLinks.twitter}
          className="text-blue-400 hover:underline"
        >
          Twitter
        </a>
        <a
          href={profileLinks.linkedin}
          className="text-blue-400 hover:underline"
        >
          LinkedIn
        </a>
      </div>
      <div className="mt-4 flex flex-wrap justify-center space-x-2">
        {skills.map((skill) => (
          <span
            key={skill}
            className="bg-green-600 text-white py-1 px-3 rounded-full m-1"
          >
            {skill}
          </span>
        ))}
      </div>
      <div className="mt-4">
        <p className="text-lg">
          <span className="font-semibold">Views:</span> {views}
        </p>
        <p className="text-lg">
          <span className="font-semibold">Last week:</span> +{recentViews}
        </p>
      </div>
    </div>
  );
};

export default ProfileSection;
