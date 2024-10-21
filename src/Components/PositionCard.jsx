import React, { useEffect, useState } from "react";
import DataHandler from "../DataHandler";

const PositionCard = () => {
  const [position, setPosition] = useState(null); // Pour stocker la position de l'utilisateur
  const [error, setError] = useState(""); // Pour gérer les erreurs
  const [isTailleur, setIsTailleur] = useState(false); // Pour savoir si l'utilisateur est un tailleur

  useEffect(() => {
    // Récupérer la position de l'utilisateur connecté
    DataHandler.getDatas("http://localhost:3004/myPosition")
      .then((res) => {
        setPosition(res);
        setIsTailleur(true); // Si la requête réussit, l'utilisateur est bien un tailleur
      })
      .catch((err) => {
        if (err.response && err.response.status === 400) {
          setError("Vous n'êtes pas connecté en tant que tailleur.");
        } else {
          setError("Impossible de récupérer la position.");
        }
      });
  }, []);

  // Si l'utilisateur n'est pas un tailleur, on n'affiche rien
  if (!isTailleur) {
    return null;
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md mx-auto hover:shadow-lg transition-shadow duration-300">
      <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">Ma Position</h3>
      {error ? (
        <p className="text-red-500 text-center">{error}</p>
      ) : position ? (
        <div className="flex flex-col items-center">
          <span className="text-4xl font-bold text-blue-500 mb-2">#{position}</span>
          <p className="text-gray-500 text-sm">Votre classement actuel</p>
        </div>
      ) : (
        <p className="text-gray-500 text-center">Chargement...</p>
      )}
    </div>
  );
};

export default PositionCard;
