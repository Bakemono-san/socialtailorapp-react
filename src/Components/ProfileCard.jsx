import React from 'react';
import { FaCertificate } from 'react-icons/fa';

const ProfileCard = ({ user, role }) => {
  return (
    <div className="bg-white shadow-lg rounded-xl p-8 mb-4 w-full max-w-5xl border border-gray-200 relative">
      {/* Photo de profil, en partie en dehors de la bannière */}
      <div className="absolute -top-14 left-6"> {/* "absolute" permet à l'image de sortir */}
        <img
          src={user.photoProfile}  
          alt="Profile"
          className="w-28 h-28 rounded-full border-4 border-white shadow-md"
        />
      </div>
      
      <div className="pl-36"> {/* Ajout de padding pour que le texte soit aligné correctement avec la photo */}
        <h2 className="text-2xl font-bold text-gray-800">{user.prenom}</h2>
        {user.certificat && (
          <div className="flex items-center text-blue-400 mt-2">
            <FaCertificate className="mr-2" />
            <span className="text-lg font-semibold">Certifié</span>
          </div>
        )}
        <p className="text-gray-500 mt-2">{user.role}</p>
      </div>
    </div>
  );
};

export default ProfileCard;
