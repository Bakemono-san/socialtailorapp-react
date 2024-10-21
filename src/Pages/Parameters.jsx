// Components/Parameters.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faRuler, faUserShield } from '@fortawesome/free-solid-svg-icons';

export default function Parameters() {
  const navigate = useNavigate(); // Hook pour la navigation

  // Rediriger vers la page des mesures
  const handleMeasurementsClick = () => {
    navigate('/measurements');
  };

  const handleRoleClick = () => {
    navigate("/changeRole");
  }

  const handleProfileClick = () => {
    navigate("/profile");
  }

  return (
    <div className="p-6 min-h-screen bg-gray-50 flex flex-col items-center">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Paramètres</h1>
      
      <ul className="w-full md:w-3/4 lg:w-1/2 space-y-4">
        <li className="flex items-center p-4 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer transform hover:scale-105 " onClick={handleProfileClick}>
          <span className="bg-blue-500 text-white rounded-full p-3 mr-4">
            <FontAwesomeIcon icon={faUser} className="text-xl" />
          </span>
          <div>
            <h2 className="text-xl font-semibold text-gray-800">Profil</h2>
            <p className="text-gray-500">Gérer vos informations de profil</p>
          </div>
        </li>

        <li className="flex items-center p-4 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer transform hover:scale-105" onClick={handleMeasurementsClick}>
          <span className="bg-green-500 text-white rounded-full p-3 mr-4">
            <FontAwesomeIcon icon={faRuler} className="text-xl" />
          </span>
          <div>
            <h2 className="text-xl font-semibold text-gray-800">Mesures</h2>
            <p className="text-gray-500">Configurer vos préférences de mesures</p>
          </div>
        </li>

        <li className="flex items-center p-4 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer transform hover:scale-105" onClick={handleRoleClick}>
          <span className="bg-purple-500 text-white rounded-full p-3 mr-4">
            <FontAwesomeIcon icon={faUserShield} className="text-xl" />
          </span>
          <div>
            <h2 className="text-xl font-semibold text-gray-800">Changer Role</h2>
            <p className="text-gray-500">Modifier vos droits d'accès</p>
          </div>
          
        </li>
        {/* <li className="flex items-center p-4 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer transform hover:scale-105" onClick={handleProfileClick}>
          <span className="bg-purple-500 text-white rounded-full p-3 mr-4">
            <FontAwesomeIcon icon={faUserShield} className="text-xl" />
          </span>
          <div>
            <h2 className="text-xl font-semibold text-gray-800">Changer Role</h2>
            <p className="text-gray-500">Modifier vos droits d'accès</p>
          </div>
          
        </li> */}
      </ul>
    </div>
  );
}
