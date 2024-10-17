import React from 'react';
import { Link } from 'react-router-dom'; // Import de Link

export default function ProfileItem({ profilePicture, name, path }) {
  return (
    <Link to={path} className="flex items-center gap-4 p-4 hover:bg-[#334477] cursor-pointer rounded-lg transition-all duration-200">
      <img
        src={profilePicture || "https://via.placeholder.com/50"}
        alt="Profile"
        className="w-12 h-12 rounded-full border-2 border-white"
      />
      <span className="text-lg font-semibold">{name || "Username"}</span>
    </Link>
  );
}
