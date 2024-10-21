import React, { useState, useEffect } from 'react';
import DataHandler from '../DataHandler';

const TailorRankCard = ({ position }) => {
  const [rank, setRank] = useState(position); // Utiliser la prop position

  // Si tu veux toujours récupérer la position depuis l'API, tu peux laisser cette partie
  useEffect(() => {
    const fetchRank = async () => {
      try {
        const data = await DataHandler.getDatas('/myPosition');
        setRank(data.position);
      } catch (error) {
        console.error('Error fetching position', error);
      }
    };

    if (!rank) { // Ne pas refaire l'appel si rank est déjà défini
      fetchRank();
    }
  }, [rank]); // Dépend de rank pour éviter des appels répétitifs

  return (
    <div className="p-4 border rounded-lg bg-white shadow-md">
      <h3 className="font-semibold text-lg mb-3">Ma Position</h3>
      {rank !== null ? (
        <p className="text-xl">Rang actuel : {rank}</p>
      ) : (
        <p>Chargement...</p>
      )}
    </div>
  );
};

export default TailorRankCard;
