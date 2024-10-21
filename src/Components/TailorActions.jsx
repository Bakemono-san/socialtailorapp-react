// Components/TailorActions.js
import React, { useState, useEffect } from 'react';
import DataHandler from '../DataHandler';
import { FaCertificate, FaCheckCircle } from 'react-icons/fa';

const TailorActions = ({ 
  tailor, 
  userFollowedTailors, 
  setUserFollowedTailors, 
  showModal 
}) => {
  const [isUserTailor, setIsUserTailor] = useState(false);
  const [isCertifiedFilter, setIsCertifiedFilter] = useState(false);

  useEffect(() => {
    const checkUserStatus = async () => {
      try {
        const userData = await DataHandler.getDatas('/myFollowings');
        setIsUserTailor(true);
      } catch (error) {
        console.error("Erreur lors de la vérification de l'utilisateur :", error);
      }
    };

    checkUserStatus();
  }, []);

  const handleFollow = async () => {
    try {
      await DataHandler.postData('/followUser', { followerId: tailor.id });
      setUserFollowedTailors((prev) => [...prev, tailor.id]);
      showModal("Vous suivez ce tailleur !");
    } catch (error) {
      console.error("Erreur lors du follow :", error);
    }
  };

  const handleUnfollow = async () => {
    try {
      await DataHandler.postData('/unfollowUser', { followerId: tailor.id });
      setUserFollowedTailors((prev) => prev.filter(id => id !== tailor.id));
      showModal("Vous avez arrêté de suivre ce tailleur.");
    } catch (error) {
      console.error("Erreur lors du unfollow :", error);
    }
  };

  const handleSignal = async () => {
    try {
      await DataHandler.postData(`/signale/${tailor.id}`, { reason: "mauvais contenu" });
      showModal("Le tailleur a été signalé.");
    } catch (error) {
      console.error("Erreur lors du signalement :", error);
    }
  };

  const toggleCertifiedFilter = () => {
    setIsCertifiedFilter((prev) => !prev);
  };

  return (
    <div>
      <div className="flex items-center">
        <div
          onClick={toggleCertifiedFilter}
          className={`cursor-pointer p-2 rounded-full ${isCertifiedFilter ? 'bg-green-500' : 'bg-gray-200'}`}
          title={isCertifiedFilter ? 'Afficher tous les tailleurs' : 'Afficher uniquement les certifiés'}
        >
          <FaCertificate className={`text-xl ${isCertifiedFilter ? 'text-white' : 'text-gray-700'}`} />
        </div>
        <span className="ml-2">{isCertifiedFilter ? 'Tailleurs certifiés' : 'Tous les tailleurs'}</span>
      </div>
      
      {isUserTailor && tailor.id === parseInt(localStorage.getItem('userId'), 10) ? null : (
        <div>
          <button onClick={handleFollow} className="bg-blue-500 text-white px-3 py-1 rounded">Suivre</button>
          <button onClick={handleUnfollow} className="bg-red-500 text-white px-3 py-1 rounded">Ne plus suivre</button>
          <button onClick={handleSignal} className="bg-yellow-500 text-white px-3 py-1 rounded">Signaler</button>
        </div>
      )}
    </div>
  );
};

export default TailorActions;
