import React, { useState, useEffect } from 'react';
import DataHandler from '../DataHandler'; // Assurez-vous que le chemin est correct

export default React.memo(function StatsCard(props) {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null); // Pour stocker l'utilisateur récupéré depuis localStorage

  useEffect(() => {
    // Fonction pour récupérer l'utilisateur depuis le localStorage
    const storedUser = localStorage.getItem('user');
    
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser); // Mise à jour de l'état avec les données de l'utilisateur
    } else {
      setLoading(false); // Pas d'utilisateur, donc pas besoin de charger les stats
    }
  }, []);

  useEffect(() => {
    // Fonction asynchrone pour récupérer les statistiques
    const fetchData = async () => {
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
        setLoading(false); // Ne pas charger les stats si l'utilisateur ne correspond pas
      }
    };

    if (user) {
      fetchData(); // Récupérer les statistiques si les infos de l'utilisateur sont disponibles
    }
  }, [user]);

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
            <button className='mt-4 text-white bg-yellow-600 p-2 rounded'>Abonnement premium</button>
          </div>
        </div>
      </div>
    );
  }

  // Affichage des statistiques si l'utilisateur est un tailleur avec un statut premium
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
            <p className="text-xl font-semibold">{stats?.userFollowersCount}</p>
          </div>

          {/* Rang (centered on all screen sizes) */}
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
