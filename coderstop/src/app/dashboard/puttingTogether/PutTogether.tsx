import React from "react";
import ProfileSection from "../profileSection/ProfileSection";

const Dashboard: React.FC = () => {
  // Mock data for demonstration purposes
  const profileData = {
    avatarUrl:
      "https://assets.leetcode.com/users/roshanjha_23/avatar_1712545399.png", // Replace with actual path to avatar
    name: "Roshan Jha",
    rank: 53388,
    bio: "Striving here for Rank 1",
    location: "India",
    institution: "B.P. Poddar Institute of Technology and Management",
    profileLinks: {
      website: "https://linktr.ee/roshanjha23",
      github: "https://github.com/roshan-jha-23",
      twitter: "https://twitter.com/roshan_jha_23",
      linkedin: "https://www.linkedin.com/in/roshan-jha-20m10",
    },
    skills: ["html-5.2", "css", "javascript", "python", "java"],
    views: 526,
    recentViews: 1,
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-10">
      <ProfileSection {...profileData} />
    </div>
  );
};

export default Dashboard;
