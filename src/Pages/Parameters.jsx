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

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Paramètres</h1>
      <ul className="list-disc pl-5 space-y-2">
        <li className="flex items-center cursor-pointer p-2 rounded-md hover:bg-blue-100 transition-colors">
          <span className="bg-blue-400 text-white rounded-md p-2 mr-2">
            <FontAwesomeIcon icon={faUser} />
          </span>
          <span className="text-xl font-semibold">Profil</span>
        </li>
        <li className="flex items-center cursor-pointer p-2 rounded-md hover:bg-blue-100 transition-colors" onClick={handleMeasurementsClick}>
          <span className="bg-blue-400 text-white rounded-md p-2 mr-2">
            <FontAwesomeIcon icon={faRuler} />
          </span>
          <span className="text-xl font-semibold">Mesures</span>
        </li>
        <li className="flex items-center cursor-pointer p-2 rounded-md hover:bg-blue-100 transition-colors">
          <span className="bg-blue-400 text-white rounded-md p-2 mr-2">
            <FontAwesomeIcon icon={faUserShield} />
          </span>
          <span className="text-xl font-semibold" onClick={handleRoleClick}>Changer Role</span>
        </li>
      </ul>
    </div>
  );
}
