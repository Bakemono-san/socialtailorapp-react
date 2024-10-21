import React, { useState, useEffect } from 'react';
import { FaExclamationTriangle, FaUserPlus, FaUserMinus, FaCheckCircle, FaCertificate } from 'react-icons/fa';
import { fetchTailors, checkUserStatus, filterTailors, handleToggleFollow, handleSignal } from '../Utils/TailorUtils';

export default function TailorList() {
  const [tailors, setTailors] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [userFollowedTailors, setUserFollowedTailors] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  const [showCertifiedTailors, setShowCertifiedTailors] = useState(false);
  const [isUserTailor, setIsUserTailor] = useState(false);

  // Récupération des tailleurs depuis l'API lors du montage du composant
  useEffect(() => {
    fetchTailors(showCertifiedTailors, setTailors);
  }, [showCertifiedTailors]);

  // Récupération des tailleurs suivis par l'utilisateur et statut de l'utilisateur
  useEffect(() => {
    checkUserStatus(setIsUserTailor, setUserFollowedTailors);
  }, []);

  // Filtrage des tailleurs, en excluant l'utilisateur connecté s'il est un tailleur
  const filteredTailors = filterTailors(tailors, searchTerm, isUserTailor);

  // Efface le message de succès après un délai
  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  return (
    <div className="bg-white shadow-md rounded-lg p-4 h-96 hidden lg:block">
      {/* Barre de recherche */}
      <div className="flex justify-between items-center mb-4 overflow-hidden">
        <input
          type="text"
          placeholder="Rechercher un tailleur par nom ou prénom..."
          className="w-full mr-4 p-2 border border-gray-300 rounded"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          className={`p-2 rounded-full ${showCertifiedTailors ? 'bg-green-500 text-white' : 'bg-gray-300 text-black'}`}
          onClick={() => setShowCertifiedTailors(prev => !prev)}
        >
          <FaCertificate size={20} />
        </button>
      </div>

      {/* Message de succès */}
      {successMessage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <div className="flex justify-center mb-4">
              <FaCheckCircle className="text-green-500" size={64} />
            </div>
            <p className="mt-4 text-lg font-semibold">{successMessage}</p>
            <button
              className="mt-4 bg-green-500 text-white px-4 py-2 rounded"
              onClick={() => setSuccessMessage('')}
            >
              OK
            </button>
          </div>
        </div>
      )}

      {/* Liste des tailleurs */}
      <div className="flex flex-col gap-4 pb-12">
        {filteredTailors.map(tailor => (
          <div key={tailor.id} className="flex items-center justify-between bg-gray-100 p-4 rounded-lg shadow-sm transition-transform hover:scale-105">
            <div className="flex items-center gap-4">
              <img src={tailor.photoProfile} alt={`${tailor.prenom} ${tailor.nom}`} className="w-12 h-12 rounded-full" />
              <div className="flex items-center gap-1">
                <p className="font-semibold text-gray-800">{`${tailor.prenom} ${tailor.nom}`}</p>
                {tailor.certified && <FaCheckCircle className="text-green-500" size={16} />}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition"
                onClick={() => handleSignal(tailor.id, setSuccessMessage)}
              >
                <FaExclamationTriangle size={16} />
              </button>
              
              <button
                className={`p-2 rounded-full transition ${userFollowedTailors.includes(tailor.id) ? 'bg-red-500 text-white hover:bg-red-600' : 'bg-green-500 text-white hover:bg-green-600'}`}
                onClick={() => handleToggleFollow(tailor.id, userFollowedTailors, setUserFollowedTailors, setSuccessMessage)}
              >
                {userFollowedTailors.includes(tailor.id) ? <FaUserMinus size={16} /> : <FaUserPlus size={16} />}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
