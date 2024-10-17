import React from 'react';
import { FaComments, FaUserPlus, FaCheckCircle } from 'react-icons/fa'; // Import des icônes

export default function TailorList({ tailors }) {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 h-96 hidden lg:block">
      {/* Barre de recherche */}
      <input
        type="text"
        placeholder="Rechercher un tailleur..."
        className="w-full mb-4 p-2 border border-gray-300 rounded"
      />
      
      {/* Liste des tailleurs */}
      <div className="flex flex-col gap-4 pb-12 overflow-y-auto h-full">
        {tailors.map(tailor => (
          <div key={tailor.id} className="flex items-center justify-between bg-gray-100 p-4 rounded-lg shadow-sm transition-transform hover:scale-105">
            {/* Informations sur le tailleur */}
            <div className="flex items-center gap-4">
              <img src={tailor.photo} alt={tailor.name} className="w-12 h-12 rounded-full" />
              <div className="flex items-center gap-1">
                <p className="font-semibold text-gray-800">{tailor.name}</p>
                {/* Icône de certification */}
                <FaCheckCircle className="text-green-500" size={16} />
              </div>
              <p className="text-sm text-gray-600">{tailor.location}</p>
            </div>

            {/* Icônes d'actions */}
            <div className="flex items-center gap-2">
              {/* Bouton Discuter */}
              <button className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition">
                <FaComments size={16} />
              </button>
              
              {/* Bouton Suivre */}
              <button className="bg-green-500 text-white p-2 rounded-full hover:bg-green-600 transition">
                <FaUserPlus size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
