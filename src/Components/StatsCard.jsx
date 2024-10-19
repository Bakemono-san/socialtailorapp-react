import React, { useState, useEffect } from 'react';
import DataHandler from '../DataHandler'; // Assurez-vous que le chemin est correct

export default React.memo(function StatsCard(props) {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [modalMessage, setModalMessage] = useState(null); // Pour afficher le message du modal
  const [followersCount, setFollowersCount] = useState(0); // Nombre de followers

  // Récupérer l'utilisateur connecté du localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser); 
    } else {
      setLoading(false);
    }
  }, []);

  // Récupérer les statistiques si l'utilisateur est premium et tailleur
  const fetchStats = async () => {
    if (user?.status === 'premium' && user?.role === 'tailleur') {
      try {
        const data = await DataHandler.getDatas('/tailleurs/statistique');
        setStats(data);
      } catch (err) {
        console.error('Erreur lors de la récupération des statistiques :', err);
        setError('Erreur lors de la récupération des statistiques.');
      } finally {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  };

  // Appeler fetchStats lorsque l'utilisateur est premium et tailleur
  useEffect(() => {
    if (user) {
      fetchStats();
    }
  }, [user]);

  // Récupérer les followers de l'utilisateur connecté
  useEffect(() => {
    const fetchFollowersCount = async () => {
      try {
        const followersData = await DataHandler.getDatas('/myFollowers');
        if (followersData?.followers) {
          setFollowersCount(followersData.followers.length);
          console.log('Nombre de followers :', followersData.followers.length);
        }
      } catch (err) {
        console.error('Erreur lors de la récupération des followers :', err);
        setError('Erreur lors de la récupération des followers.');
      }
    };

    if (user) {
      fetchFollowersCount();
    }
  }, [user]);

  const handlePremiumSubscription = async () => {
    console.log("Nombre de followers :", followersCount);
    
    if (followersCount >= 1 && user?.credits >= 5) {
      try {
        // Appel de l'API sans body
        const response = await DataHandler.postData('/user/abonnementPremium');
        // Message de succès
        setModalMessage({ type: 'success', text: 'Votre abonnement premium a été activé avec succès.' });
        
        // Mettre à jour le localStorage et l'état utilisateur
        localStorage.setItem('user', JSON.stringify(response.user));
        setUser(response.user); // Mise à jour de l'état local utilisateur


        // Recharger les statistiques après l'abonnement
        fetchStats();
      } catch (err) {
        console.error('Erreur lors de l\'abonnement premium :', err);
        // Message d'erreur si l'API renvoie une erreur
        setModalMessage({ type: 'error', text: 'Erreur lors de l\'activation de l\'abonnement premium. Veuillez réessayer.' });
      }
    } else {
      // Si les conditions (followers et crédits) ne sont pas remplies
      setModalMessage({
        type: 'error',
        text: 'Vous devez avoir au moins 10 followers et 5 crédits pour vous abonner au service premium.',
      });
    }
  };

  const closeModal = () => {
    setModalMessage(null); // Ferme le modal
  };

  if (loading) {
    return (
      <div className={`w-full lg:block hidden shadow h-fit`}>
        <div className="bg-white rounded-lg shadow-md p-6">
          <p>Chargement des statistiques...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`w-full lg:block hidden shadow h-fit`}>
        <div className="bg-white rounded-lg shadow-md p-6">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (user?.status !== 'premium' || user?.role !== 'tailleur') {
    return (
      <div className={`w-full lg:block hidden shadow h-fit`}>
        <div className='flex items-center gap-2 px-4 py-3 bg-blue-300 rounded-t'>
          <h1 className='text-center text-2xl font-bold text-white w-full'>
            {props.title}
          </h1>
        </div>
        <div className="bg-black rounded-lg shadow-md p-6 relative">
          <div className="flex flex-col items-center justify-center w-full h-full p-4 bg-black">
            <p className='text-white text-lg text-center animate-bounce'>Faites un abonnement premium pour accéder à vos stats</p>
            <button className='mt-4 text-white bg-yellow-600 p-2 rounded' onClick={handlePremiumSubscription}>
              Abonnement premium
            </button>
          </div>
        </div>
        {modalMessage && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded shadow-md">
              <p className={modalMessage.type === 'success' ? 'text-green-600' : 'text-red-600'}>
                {modalMessage.text}
              </p>
              <button className="mt-4 bg-blue-500 text-white py-2 px-4 rounded" onClick={closeModal}>
                Fermer
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={`w-full lg:block hidden shadow h-fit`}>
      <div className='flex items-center gap-2 px-4 py-3 bg-blue-300 rounded-t'>
        <h1 className='text-center text-2xl font-bold text-white w-full'>
          {props.title}
        </h1>
      </div>

      {/* Card Body */}
      <div className="bg-white rounded-lg shadow-md p-6 relative">
        <div className="flex flex-col sm:flex-row sm:flex-wrap justify-between gap-4">
          {/* Stat: Nombre de posts */}
          <div className="flex-1">
            <p className="text-gray-600 text-sm">Nombre de posts :</p>
            <p className="text-xl font-semibold">{stats?.tailleursPostsCount}</p>
          </div>

          {/* Stat: Nombre de followers */}
          <div className="flex-1 text-right sm:text-end">
            <p className="text-gray-600 text-sm">Nombre de followers :</p>
            <p className="text-xl font-semibold">{followersCount}</p>
          </div>

          {/* Rang */}
          <div className="flex justify-center items-center w-full">
            <div className='p-8 w-14 h-14 flex items-center justify-center flex-col rounded-full bg-indigo-300'>
              <p className="text-gray-600 text-sm">Rang</p>
              <p className="text-xl font-semibold text-white">{stats?.tailleurRank}</p>
            </div>
          </div>

          {/* Stat: Nombre de followings */}
          <div className="flex-1">
            <p className="text-gray-600 text-sm">Nombre de followings :</p>
            <p className="text-xl font-semibold">{stats?.userFollowingsCount}</p>
          </div>

          {/* Stat: Moyenne de likes */}
          <div className="flex-1 text-right sm:text-end">
            <p className="text-gray-600 text-sm">Moyenne de likes :</p>
            <p className="text-xl font-semibold">{stats?.totalLikes}</p>
          </div>
        </div>
      </div>
    </div>
  );
});
