import React, { useState, useEffect } from 'react';
import TailorCard from '../Components/TailorCard';
import TailorTable from '../Components/TailorTable';
import DataHandler from '../DataHandler';
import { FaCertificate, FaCheckCircle } from 'react-icons/fa';

export default function TailleursListe() {
  const [tailors, setTailors] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);
  const [filter, setFilter] = useState('');
  const [viewMode, setViewMode] = useState('card');
  const [isUserTailor, setIsUserTailor] = useState(false);
  const [userFollowedTailors, setUserFollowedTailors] = useState([]);
  const [isCertifiedFilter, setIsCertifiedFilter] = useState(false);
  const [modalMessage, setModalMessage] = useState(null);

  // Récupération des tailleurs
  useEffect(() => {
    async function fetchTailors() {
      try {
        const url = isCertifiedFilter 
          ? '/filterTailleurByCertificat' 
          : '/listeTailleurs';
        const data = await DataHandler.getDatas(url);
        setTailors(data);
      } catch (error) {
        console.error("Erreur lors de la récupération des tailleurs :", error);
      }
    }

    fetchTailors();
  }, [isCertifiedFilter]);

  // Vérification si l'utilisateur est tailleur et récupération des tailleurs suivis
  useEffect(() => {
    const checkUserStatus = async () => {
      try {
        const userData = await DataHandler.getDatas('/myFollowings');
        setIsUserTailor(true); // Supposons que l'utilisateur est un tailleur
        const followedTailors = userData.followings ? userData.followings.map(following => following.id) : [];
        setUserFollowedTailors(followedTailors); // Mettez à jour avec les IDs des tailleurs suivis
        console.log(userData);
      } catch (error) {
        console.error("Erreur lors de la vérification de l'utilisateur :", error);
      }
    };

    checkUserStatus();
  }, []);

  // Filtrage des tailleurs en fonction du filtre de recherche et du fait que l'utilisateur soit tailleur ou non
  const filteredTailors = tailors.filter(tailor => {
    const currentUserId = parseInt(localStorage.getItem('userId'), 10);
    const isCurrentUser = isUserTailor && tailor.id === currentUserId;
    return !isCurrentUser && `${tailor.nom} ${tailor.prenom}`.toLowerCase().includes(filter.toLowerCase());
  });

  // Pagination des tailleurs
  const currentTailorsForTable = filteredTailors.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  // Affichage d'une modal pour les messages
  const showModal = (message) => {
    setModalMessage(message);
    setTimeout(() => setModalMessage(null), 5000); // Ferme la modal après 5 secondes
  };

  // Gestion du suivi/désuivi d'un tailleur
  const handleToggleFollow = async (tailorId) => {
    try {
      if (userFollowedTailors.includes(tailorId)) {
        console.log(`Unfollowing tailor with ID: ${tailorId}`);
        await DataHandler.postData('/unfollowUser', { followerId: tailorId });
        setUserFollowedTailors(prev => prev.filter(id => id !== tailorId)); // Retirer de la liste suivie
        showModal("Vous avez arrêté de suivre ce tailleur.");
      } else {
        console.log(`Following tailor with ID: ${tailorId}`);
        await DataHandler.postData('/followUser', { followerId: tailorId });
        setUserFollowedTailors(prev => [...prev, tailorId]); // Ajouter à la liste suivie
        showModal("Vous suivez ce tailleur !");
      }
    } catch (error) {
      console.error("Erreur lors du toggle follow :", error);
    }
  };

  // Gestion du signalement d'un tailleur
  const handleSignal = async (tailorId) => {
    try {
      await DataHandler.postData(`/signale/${tailorId}`, { reason: "mauvais contenu" });
      showModal("Le tailleur a été signalé.");
    } catch (error) {
      console.error("Erreur lors du signalement :", error);
    }
  };

  // Gestion du filtre des tailleurs certifiés
  const toggleCertifiedFilter = () => {
    setIsCertifiedFilter((prev) => !prev);
  };

  return (
    <div className='w-full p-4 overflow-y-scroll'>
      <h2 className='text-2xl font-bold mb-4'>Liste des tailleurs</h2>

      {modalMessage && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white px-8 py-4 rounded-lg shadow-lg text-center">
            <FaCheckCircle className="text-green-500 text-6xl mb-4 mx-auto" />
            <h3 className="text-xl font-bold mb-2">{modalMessage}</h3>
            <button
              className="bg-blue-500 text-white px-3 py-1 mt-4 rounded"
              onClick={() => setModalMessage(null)}
            >
              Fermer
            </button>
          </div>
        </div>
      )}

      <div className="mb-4 flex items-center">
        <input
          type="text"
          placeholder="Rechercher un tailleur"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="p-2 border rounded w-full mr-4"
        />

        <div
          onClick={toggleCertifiedFilter}
          className={`cursor-pointer p-2 rounded-full ${isCertifiedFilter ? 'bg-green-500' : 'bg-gray-200'}`}
          title={isCertifiedFilter ? 'Afficher tous les tailleurs' : 'Afficher uniquement les certifiés'}
        >
          <FaCertificate className={`text-xl ${isCertifiedFilter ? 'text-white' : 'text-gray-700'}`} />
        </div>

        <span className="ml-2">
          {isCertifiedFilter ? 'Tailleurs certifiés' : 'Tous les tailleurs'}
        </span>
      </div>

      <div className="mb-4">
        <button onClick={() => setViewMode('card')} className="bg-blue-500 text-white px-4 py-2 mr-2">Vue Cards</button>
        <button onClick={() => setViewMode('table')} className="bg-blue-500 text-white px-4 py-2">Vue Tableau</button>
      </div>

      {viewMode === 'card' ? (
        <div className='flex flex-wrap gap-6'>
          {filteredTailors.map(tailor => (
            <TailorCard
              key={tailor.id}
              name={`${tailor.prenom} ${tailor.nom}`}
              photo={`${tailor.photoProfile}`}
              onToggleFollow={() => handleToggleFollow(tailor.id)}
              onSignal={() => handleSignal(tailor.id)} // Utilisation de handleSignal
              isFollowed={userFollowedTailors.includes(tailor.id)}  // Vérification si tailleur est suivi
            />
          ))}
        </div>
      ) : (
        <>
          <TailorTable
            tailors={currentTailorsForTable}
            handleToggleFollow={handleToggleFollow}
            handleSignal={handleSignal}
            userFollowedTailors={userFollowedTailors}
          />
          <div className="flex justify-center mt-4">
            {Array.from({ length: Math.ceil(filteredTailors.length / itemsPerPage) }, (_, index) => (
              <button
                key={index}
                className={`mx-1 px-3 py-1 rounded ${index + 1 === currentPage ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                onClick={() => setCurrentPage(index + 1)}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
