import React from 'react';

export default function TailorCard({ name, photo, isFollowing, onFollowUnfollow, onSignal }) {
  return (
    <div className="bg-white shadow-md rounded-md overflow-hidden w-80 p-4">
      <img className="w-full h-40 object-contain rounded-md mb-3" src={photo} alt={name} />
      <h3 className="text-lg font-bold text-center">{name}</h3>
      <div className="flex justify-between mt-4 space-x-2">
        <button
          onClick={onFollowUnfollow}
          className={`flex-1 px-3 py-2 rounded hover:bg-opacity-80 transition duration-200 ${
            isFollowing ? 'bg-red-500 text-white' : 'bg-blue-500 text-white'
          }`}
        >
          {isFollowing ? 'Unfollow' : 'Follow'}
        </button>
        <button
          onClick={onSignal}
          className="bg-yellow-500 text-white flex-1 px-3 py-2 rounded hover:bg-yellow-600 transition duration-200"
        >
          Signal
        </button>
      </div>
    </div>
  );
}
