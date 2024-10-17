import React, { useState } from "react";

const MyFollowersCompo = ({ follower }) => {
  const [isFollowing, setIsFollowing] = useState(false);

  console.log(follower);
  
  const handleFollowToggle = () => {
    setIsFollowing(!isFollowing); // Toggle entre Follow et Unfollow
  };
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      {/* Entête : Nom et rôle */}
      <div className="flex justify-between items-center p-4 bg-gray-100">
        <h3 className="text-lg font-semibold text-gray-700">
          {follower.nom} {follower.prenom}
        </h3>
        <p className="text-sm text-gray-500">
          {follower.role.charAt(0).toUpperCase() + follower.role.slice(1)}
        </p>
      </div>

      {/* Image au centre */}
      <div className="flex justify-center py-4">
        <a href="#" onClick={() => console.log("Image cliquée")}>
          <img
            src={follower.photoProfile}
            alt={`${follower.nom} ${follower.prenom}`}
            className="w-24 h-24 rounded-full object-cover"
          />
        </a>
      </div>

      {/* Footer : Bouton Follow/Unfollow */}
      <div className="p-4 border-t border-gray-200 flex justify-center">
        <button
          onClick={handleFollowToggle}
          className={`px-4 py-2 rounded-lg font-medium text-white ${
            isFollowing ? 'bg-red-500' : 'bg-blue-500'
          }`}
        >
          {isFollowing ? 'Unfollow' : 'Follow'}
        </button>
      </div>
    </div>
  );
};

export default MyFollowersCompo;
