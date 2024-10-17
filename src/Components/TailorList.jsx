import React, { useState, useEffect } from 'react';
import { FaExclamationTriangle, FaUserPlus, FaUserMinus, FaCheckCircle } from 'react-icons/fa';
import DataHandler from '../DataHandler'; // Assurez-vous d'importer correctement DataHandler

export default function TailorList() {
  const [tailors, setTailors] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [followedTailors, setFollowedTailors] = useState(new Set());
  const [successMessage, setSuccessMessage] = useState('');
  const [showCertifiedTailors, setShowCertifiedTailors] = useState(false);
  const [isUserTailor, setIsUserTailor] = useState(false); // Indique si l'utilisateur connecté est un tailleur


  // Récupération des tailleurs depuis l'API lors du montage du composant
  useEffect(() => {
    async function fetchTailors() {
      try {
        const data = await DataHandler.getDatas('http://localhost:3004/listeTailleurs');
        setTailors(data);
      } catch (error) {
        console.error('Erreur lors de la récupération des tailleurs:', error);
      }
    }
    fetchTailors();
  }, []);

  // Récupération des tailleurs suivis par l'utilisateur
  useEffect(() => {
    async function checkFollowedTailors() {
      try {
        const response = await DataHandler.getDatas('http://localhost:3004/myFollowings');
        const followed = response.followers || [];
        const followedSet = new Set(followed.map(follower => follower.Users_Followers_followerIdToUsers.id));
        setFollowedTailors(followedSet);
        setIsUserTailor(true)
      } catch (error) {
        console.error('Erreur lors de la récupération des tailleurs suivis:', error);
      }
    }
    checkFollowedTailors();
  }, []);

  // Filtrage des tailleurs, en excluant l'utilisateur connecté s'il est un tailleur
  const filteredTailors = tailors.filter(tailor => {
    const currentUserId = parseInt(localStorage.getItem('userId'), 10); // ID de l'utilisateur connecté stocké en local
    const isCurrentUser = isUserTailor && tailor.id === currentUserId; // Vérifie si c'est le tailleur connecté
    return !isCurrentUser && `${tailor.nom} ${tailor.prenom}`.toLowerCase().includes(searchTerm.toLowerCase());
  });

  // Fonction pour suivre un tailleur
  const handleFollow = async (tailorId) => {
    try {
      const response = await DataHandler.postData('http://localhost:3004/followUser', { followerId: tailorId });
      if (response.success) {
        setFollowedTailors((prev) => {
          const newSet = new Set(prev);
          newSet.add(tailorId);
          return newSet;
        });
        setSuccessMessage('Vous suivez maintenant ce tailleur !');
      }
    } catch (error) {
      console.error('Erreur lors du suivi du tailleur:', error);
    }
  };

  // Fonction pour désuivre un tailleur
  const handleUnfollow = async (tailorId) => {
    try {
      const response = await DataHandler.postData('http://localhost:3004/unfollowUser', { followerId: tailorId });
      if (response.success) {
        setFollowedTailors((prev) => {
          const newSet = new Set(prev);
          newSet.delete(tailorId);
          return newSet;
        });
        setSuccessMessage('Vous avez arrêté de suivre ce tailleur.');
      }
    } catch (error) {
      console.error('Erreur lors du désuivi du tailleur:', error);
    }
  };

  // Fonction pour signaler un tailleur
  const handleSignal = async (tailorId) => {
    try {
      await DataHandler.postData(`/signale/${tailorId}`, { reason: "mauvais contenu" });
      setSuccessMessage('Le tailleur a été signalé.');
    } catch (error) {
      console.error("Erreur lors du signalement :", error);
    }
  };

  // Efface le message de succès après un délai
  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  // Fonction pour filtrer les tailleurs certifiés
  const toggleCertifiedTailors = async () => {
    setShowCertifiedTailors((prev) => !prev);
    try {
      const endpoint = showCertifiedTailors ? '/listeTailleurs' : '/filterTailleurByCertificat';
      const data = await DataHandler.getDatas(endpoint);
      setTailors(data);
    } catch (error) {
      console.error('Erreur lors du filtrage des tailleurs certifiés:', error);
    }
  };

  return (
    <div className="bg-white shadow-md lg:block hidden rounded-lg p-4 h-96">
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
          className={`p-2 rounded-full ${showCertifiedTailors ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'} hover:bg-blue-600 transition`}
          onClick={toggleCertifiedTailors}
        >
          <FaCheckCircle size={20} />
        </button>
      </div>

      {/* Message de succès */}
      {successMessage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <div className="flex justify-center mb-4"> {/* Conteneur pour centrer l'icône */}
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
                onClick={() => handleSignal(tailor.id)}
              >
                <FaExclamationTriangle size={16} />
              </button>
              
              <button
                className={`p-2 rounded-full transition ${followedTailors.has(tailor.id) ? 'bg-red-500 text-white hover:bg-red-600' : 'bg-green-500 text-white hover:bg-green-600'}`}
                onClick={() => followedTailors.has(tailor.id) ? handleUnfollow(tailor.id) : handleFollow(tailor.id)}
              >
                {followedTailors.has(tailor.id) ? <FaUserMinus size={16} /> : <FaUserPlus size={16} />}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
