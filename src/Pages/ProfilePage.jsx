import React, { useEffect, useContext, useState } from 'react';
import { DataContext } from '../App';
import ProfileCard from '../Components/ProfileCard';
// import Post from '../Components/Forms/Post';
import PostCardContainer from '../Components/PostCardContainer';
import Ranking from '../Components/Ranking.jsx'; // Utiliser Notifications ici
import PositionCard from '../Components/PositionCard'; // Ajouter un composant pour la position
import { useNavigate } from 'react-router-dom'; // Pour la redirection

const ProfilePage = () => {
  const { value } = useContext(DataContext);
  const [notifications, setNotifications] = useState([]);
  const role = value.user.role;
  const navigate = useNavigate(); // Utiliser useNavigate pour la redirection

  // Simulation de données
  useEffect(() => {
    const fakeNotifications = [
      { id: 1, title: "Nouvelle commande", body: "Vous avez reçu une nouvelle commande." },
      { id: 2, title: "Rappel paiement", body: "Veuillez effectuer votre paiement avant le 20." }
    ];
    setNotifications(fakeNotifications);
  }, []);

  const handleAchatClick = () => {
    navigate('/achat-credit'); // Rediriger vers la page achat crédit
  };

  return (
    <div className="flex flex-col items-center p-6 bg-gray-100">
      <div className="relative w-full h-48 bg-gray-300 rounded-lg shadow-md">
        {/* Le bouton Achat Crédit */}
        <div className="absolute bottom-4 right-4">
          <button
            onClick={handleAchatClick}
            className="bg-white text-blue-500 px-4 py-2 rounded-lg font-semibold shadow hover:bg-blue-100"
          >
            Achat Crédit
          </button>
        </div>
      </div>

      {/* Le profil (Photo en dehors du bg) */}
      <div className="relative w-full max-w-7xl -mt-16 z-10"> {/* Le "-mt-16" remonte le contenu au-dessus de la bannière */}
        <div className="flex flex-col lg:flex-row justify-between space-y-6 lg:space-y-0">
          <div className="w-full lg:w-2/3 space-y-6">
            <ProfileCard user={value.user} role={role} onAchatClick={handleAchatClick} />
            <div className='flex flex-col gap-4 h-full w-full'>
              <PostCardContainer />
              {/* <Post /> */}
            </div>
          </div>

          <div className="w-full lg:w-1/3">
            <Ranking /> {/* Affiche les notifications ici */}
            <PositionCard /> {/* Card de position ajoutée ici */}
          </div>
        </div>
      </div>

    </div>
  );
};

export default ProfilePage;