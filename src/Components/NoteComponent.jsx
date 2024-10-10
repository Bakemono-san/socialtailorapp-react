import React from "react";

const NoteComponent = ({ tailleur }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden flex my-4 max-w-4xl mx-auto">
      {/* Image du produit */}
      <img
        className="w-20 h-20 object-cover"
        src={tailleur.image}
        alt={tailleur.name}
      />

      {/* Détails du produit */}
      <div className="p-4 flex flex-col justify-between">
        <div>
          {/* Nom du produit */}
          <h2 className="text-xl font-bold text-gray-800">{tailleur.name}</h2>

          {/* Description du produit */}
          <p className="text-gray-600 mt-2">{tailleur.description}</p>
        </div>

        {/* Évaluation par étoiles */}
        <div className="mt-4 flex">
          {[...Array(5)].map((_, index) => (
            <svg
              key={index}
              xmlns="http://www.w3.org/2000/svg"
              fill={index < tailleur.rank ? "currentColor" : "none"}
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className={`h-5 w-5 ${
                index < tailleur.rank ? "text-yellow-500" : "text-gray-300"
              }`}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 17.25l-6.172 3.246 1.178-6.872-4.993-4.87 6.897-1.002L12 2.75l3.09 6.002 6.897 1.002-4.993 4.87 1.178 6.872L12 17.25z"
              />
            </svg>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NoteComponent;
