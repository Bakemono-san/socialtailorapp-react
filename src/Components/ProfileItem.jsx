import React from 'react';
import { Link } from 'react-router-dom';

export default function ProfileItem({ profilePicture, name, path }) {
  return (
    <Link
      to={path}
      className="flex items-center gap-3 mt-auto p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors duration-300 ease-in-out"
    >
      <img src={profilePicture} alt={name} className="w-10 h-10 rounded-full border-2 border-blue-400" />
      <div className="hidden md:block">
        <p className="text-gray-800 font-semibold">{name}</p>
      </div>
    </Link>
  );
}
